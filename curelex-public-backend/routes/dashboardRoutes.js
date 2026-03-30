const express = require("express");
const router = express.Router();

const {
  getPatientDashboard,
  getDoctorDashboard
} = require("../controllers/dashboardController");
const auth = require("../middleware/auth");
const { doctorAuth, patientAuth } = require("../middleware/role.middleware");

// Patient dashboard
router.get("/patient/:id", auth, patientAuth, getPatientDashboard);

// Doctor dashboard
router.get("/doctor/:id", auth, doctorAuth, getDoctorDashboard);

module.exports = router;