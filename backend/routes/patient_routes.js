const express = require("express");
const router = express.Router();

const {
    createPatient,
    getPatients,
    getPatient,
    FindPatient,
} = require("../controls/patient_controls");

router.post("/create/:id", createPatient);
router.get("/get/:id", getPatients);
router.get("/get/:id/:patient", getPatient);
router.post("/find/:id", FindPatient);

module.exports = router;
