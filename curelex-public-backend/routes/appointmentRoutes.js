const express  = require("express");
const router   = express.Router();
const { body } = require("express-validator");




const {
  bookAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  updateAppointmentStatus,
  getPendingAppointments,
  getApprovedPatients,
  approveAppointment
} = require("../controllers/appointmentController");


const auth = require("../middleware/auth");
const { patientAuth, doctorOrAdminAuth, doctorAuth } = require("../middleware/role.middleware");


// ── Book appointment ──────────────────────────────────────────────────────────
router.post(
  "/book",
  auth,
  [
    body("patientId").notEmpty().withMessage("Patient ID is required"),
    body("doctorId").notEmpty().withMessage("Doctor ID is required"),
    body("appointmentTime")
      .notEmpty().withMessage("Appointment time is required")
      .isISO8601().withMessage("Invalid date format"),
    body("symptoms").optional().isString()
  ],
  bookAppointment
);

// ── Get by patient ────────────────────────────────────────────────────────────
router.get("/patient/:id", auth, patientAuth, getAppointmentsByPatient);

// ── Get by doctor ─────────────────────────────────────────────────────────────
router.get("/doctor/:id", auth, doctorAuth, getAppointmentsByDoctor);

// ── Update status ─────────────────────────────────────────────────────────────
router.put("/status/:id", auth, doctorOrAdminAuth, updateAppointmentStatus);


router.get("/doctor/:doctorId/pending", auth, getPendingAppointments);

// ── Doctor stats: approved count + unique patients handled ───────────────────
router.get("/doctor/:doctorId/stats", auth, getApprovedPatients);

// ── Approve a single appointment ──────────────────────────────────────────────
router.patch("/:id/approve", auth, doctorAuth, approveAppointment);

module.exports = router;
