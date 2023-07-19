const express = require("express");
const router = express.Router();

const { newData, getPatientDataset } = require("../controls/data_controls");

router.post("/create/:id", newData);
router.get("/get/:id/:patient", getPatientDataset);

module.exports = router;
