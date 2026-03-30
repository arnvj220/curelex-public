const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { addMedicine, getMedicines } = require("../controllers/medicineController");
const auth = require("../middleware/auth");
const { doctorOrAdminAuth } = require("../middleware/role.middleware");

router.post(
  "/add",
  auth,
  doctorOrAdminAuth,
  [
    body("name").notEmpty().withMessage("Medicine name is required"),
    body("composition").notEmpty().withMessage("Composition is required"),
    body("dosageForm").notEmpty().withMessage("Dosage form is required"),
    body("manufacturer").notEmpty().withMessage("Manufacturer is required")
  ],
  addMedicine
);

router.get("/all", auth, doctorOrAdminAuth, getMedicines);

module.exports = router;