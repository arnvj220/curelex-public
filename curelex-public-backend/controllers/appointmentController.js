const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { generateMeetingLink } = require("../utis/meetingLink");

// ================= BOOK APPOINTMENT =================
exports.bookAppointment = async (req, res, next) => {
  try {
    // 1. Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patientId, doctorId, symptoms, appointmentTime } = req.body;

    // 2. Check patient
    const patient = await User.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // 3. Check doctor
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // 4. Check doctor verification
    if (doctor.verificationStatus !== "approved") {
      return res.status(400).json({ message: "Doctor is not verified yet" });
    }

    // 5. Check slot availability
    const existingAppointment = await Appointment.findOne({
      where: { doctorId, appointmentTime }
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked"
      });
    }

    // 7. Create appointment
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      symptoms,
      appointmentTime,
      status: "scheduled"
    });

    // 8. Response
    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    next(error);
  }
};


// ================= GET PATIENT APPOINTMENTS =================
exports.getAppointmentsByPatient = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patientId: req.params.id }
    });

    res.json({
      success: true,
      count: appointments.length,
      appointments
    });

  } catch (error) {
    next(error);
  }
};


// ================= GET DOCTOR APPOINTMENTS =================
exports.getAppointmentsByDoctor = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      where: { doctorId: req.params.id }
    });

    res.json({
      success: true,
      count: appointments.length,
      appointments
    });

  } catch (error) {
    next(error);
  }
};


// ================= UPDATE APPOINTMENT STATUS =================
exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    
    const validStatuses = ["scheduled", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    appointment.status = status;
    await appointment.save();

    res.json({
      message: "Status updated successfully",
      appointment
    });

  } catch (error) {
    next(error);
  }
};

exports.getPendingAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        doctorId: req.params.doctorId,
        doctorApproved: false,
        status: "scheduled"
      },
      order: [["appointmentTime", "ASC"]]
    });
    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

exports.getApprovedPatients = async (req, res) => {
  try {
    const approved = await Appointment.findAll({
      where: { doctorId: req.params.doctorId, doctorApproved: true },
      attributes: ["patientId"]
    });

    const uniquePatients = [...new Set(approved.map(a => a.patientId))];

    res.json({
      success: true,
      totalApproved: approved.length,
      patientsHandled: uniquePatients.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

exports.approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Not found" });

    
    const meetingLink = generateMeetingLink(
      appointment.id,
      appointment.doctorId,
      appointment.patientId
    );

    appointment.doctorApproved = true;
    appointment.meetingLink    = meetingLink;
    await appointment.save();

    res.json({
      success: true,
      message: "Appointment approved",
      appointment,
      meetingLink  
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}