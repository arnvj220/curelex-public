const Doctor = require("../models/Doctor");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

// ================= REGISTER DOCTOR =================

async function destroyFile(publicId, resourceType = "image") {
  if (!publicId) return;
  await cloudinary.uploader
    .destroy(publicId, { resource_type: resourceType })
    .catch(() => {});
}

// exports.registerDoctor = async (req, res, next) => {
//   try {
//     // 1. Validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email,password, specialization, experience, age, gender, patientsHandeled, regNum, regState } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const certificate = req.file ? req.file.path : null;

//     // 2. Check existing doctor
//     const existingDoctor = await Doctor.findOne({
//       where: { email }
//     });

//     if (existingDoctor) {
//       return res.status(400).json({
//         message: "Doctor with this email already exists"
//       });
//     }

//     // 3. Create doctor
//     const doctor = await Doctor.create({
//       name,
//       email,
//       password: hashedPassword,
//       specialization,
//       experience,
//       certificateUrl: certificate,
//       verificationStatus: "pending",
//       age, 
//       gender, 
//       patientsHandeled, 
//       regNum, 
//       regState
//     });

//     // 4. Response
//     res.status(201).json({
//       message: "Doctor registered successfully",
//       doctor
//     });

//   } catch (error) {
//     // Handle unique constraint (extra safety)
//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res.status(400).json({
//         message: "Doctor with this email already exists"
//       });
//     }

//     next(error);
//   }
// };


// exports.loginDoctor = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // 1️⃣ Find doctor by email
//     const doctor = await Doctor.findOne({ where: { email } });
//     if (!doctor) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 2️⃣ Check verification status
//     if (doctor.verificationStatus !== "approved") {
//       return res.status(403).json({
//         message: "Your account is not approved yet. Please wait for admin verification."
//       });
//     }

//     // 3️⃣ Compare password
//     const isMatch = await bcrypt.compare(password, doctor.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const payload = { id: doctor.id, name: doctor.name, email: doctor.email, role: "doctor" };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.json({
//       success: true,
//       token,
//       doctor: {
//         id: doctor.id,
//         name: doctor.name,
//         email: doctor.email,
//         specialization: doctor.specialization
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// // ================= GET DOCTOR BY ID =================
// exports.getDoctorById = async (req, res, next) => {
//   try {
//     const doctor = await Doctor.findByPk(req.params.id);

//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     res.json({
//       success: true,
//       doctor
//     });

//   } catch (error) {
//     next(error);
//   }
// };


// // ================= GET APPROVED DOCTORS =================
// exports.getApprovedDoctors = async (req, res, next) => {
//   try {
//     const doctors = await Doctor.findAll({
//       where: { verificationStatus: "approved" }
//     });

//     res.json({
//       success: true,
//       count: doctors.length,
//       doctors
//     });

//   } catch (error) {
//     next(error);
//   }
// };

exports.registerDoctor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // .fields() → files live in req.files["fieldname"][0]
    const certFile  = req.files?.["certificate"]?.[0];
    const photoFile = req.files?.["photo"]?.[0];

    if (!certFile)
      return res.status(400).json({ message: "Registration certificate is required" });

    const {
      name, email, password, specialization,
      experience, age, gender, patientsHandeled, regNum, regState
    } = req.body;

    const existing = await Doctor.findOne({ where: { email } });
    if (existing) {
      // Email taken — delete the files we already uploaded
      await destroyFile(certFile.filename, "raw");
      await destroyFile(photoFile?.filename, "image");
      return res.status(400).json({ message: "Doctor with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      name, email,
      password:            hashedPassword,
      specialization,      experience,
      age,                 gender,
      patientsHandeled,    regNum,        regState,
      verificationStatus:  "pending",
      certificateUrl:      certFile.secure_url || certFile.path,
      certificatePublicId: certFile.filename,
      photoUrl:            photoFile ? (photoFile.secure_url || photoFile.path) : null,
      photoPublicId:       photoFile?.filename || null
    });

    res.status(201).json({ message: "Doctor registered successfully", doctor });

  } catch (error) {
    // DB failed after upload — clean up orphans
    await destroyFile(req.files?.["certificate"]?.[0]?.filename, "raw");
    await destroyFile(req.files?.["photo"]?.[0]?.filename, "image");
    if (error.name === "SequelizeUniqueConstraintError")
      return res.status(400).json({ message: "Doctor with this email already exists" });
    next(error);
  }
};

// ── Login ─────────────────────────────────────────────────────────
exports.loginDoctor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor)
      return res.status(400).json({ message: "Invalid credentials" });
    if (doctor.verificationStatus !== "approved")
      return res.status(403).json({ message: "Account not approved yet" });
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: doctor.id, name: doctor.name, email: doctor.email, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ success: true, token, doctor: {
      id: doctor.id, name: doctor.name,
      email: doctor.email, specialization: doctor.specialization,
      photoUrl: doctor.photoUrl
    }});
  } catch (error) { next(error); }
};

// ── Get by ID ─────────────────────────────────────────────────────
exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ success: true, doctor });
  } catch (error) { next(error); }
};

// ── Get all doctors (for telemedicine dropdown) ───────────────────
exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll();
    res.json({ success: true, doctors });
  } catch (error) { next(error); }
};

// ── Get approved doctors ──────────────────────────────────────────
exports.getApprovedDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll({ where: { verificationStatus: "approved" } });
    res.json({ success: true, count: doctors.length, doctors });
  } catch (error) { next(error); }
};

// ── Update profile photo ──────────────────────────────────────────
exports.updateProfilePhoto = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No photo uploaded" });
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    await destroyFile(doctor.photoPublicId, "image");  // delete old photo
    doctor.photoUrl      = req.file.path;
    doctor.photoPublicId = req.file.filename;
    await doctor.save();
    res.json({ success: true, photoUrl: doctor.photoUrl });
  } catch (error) {
    await destroyFile(req.file?.filename, "image");
    next(error);
  }
};