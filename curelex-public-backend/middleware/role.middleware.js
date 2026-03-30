const User = require("../models/User");
const Doctor = require("../models/Doctor");

exports.adminAuth = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only."
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.doctorAuth = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.user.id);
    
    if (!doctor || req.user.role !== "doctor") {
      return res.status(403).json({ message: "Doctor access only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

exports.patientAuth = (req, res, next) => {
  if (req.user.role !== "patient") {
    return res.status(403).json({ message: "Patient access only" });
  }
  next();
};

exports.doctorOrAdminAuth = async (req, res, next) => {
  try {
    const role = req.user.role;

    if (role !== "doctor" && role !== "admin") {
      return res.status(403).json({ message: "Doctor or Admin access only" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};