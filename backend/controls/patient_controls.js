const Patient = require("../models/patient");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createPatient = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
    }

    if (authData) {
        if (req.params.id !== authData.id) {
            res.status(401).json({ message: "Use your own ID" });
            return;
        }
    }

    if (req.body) {
        const duplicate_check = await Patient.findOne({
            name: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            },
            contact: req.body.contact,
        });
        if (duplicate_check) {
            res.status(400).json({ message: "Patient already exists" });
            return;
        }

        const patient = new Patient({
            name: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            },
            dob: req.body.dob,
            gender: req.body.gender,
            contact: req.body.contact,
            location: req.body.location,
            userid: req.params.id,
        });

        const createdPatient = await patient.save();
        res.status(201).json(createdPatient);
    } else {
        res.status(400).json({ message: "No data provided" });
    }
});

const getPatients = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
    }

    if (authData) {
        if (req.params.id !== authData.id) {
            res.status(401).json({ message: "Use your own ID" });
            return;
        }
    }

    const user = await User.findById(req.params.id);
    if (user.access_perm === "ground-worker") {
        res.status(401).json({
            message: "Unauthorized for all data. Only for admin.",
        });
        return;
    }

    const patients = await Patient.find();
    res.status(200).json(patients);
});

const getPatient = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
    }

    if (authData) {
        if (req.params.id !== authData.id) {
            res.status(401).json({ message: "Use your own ID" });
            return;
        }
    }

    const patient = await Patient.findById(req.params.patient);
    if (patient) {
        res.status(200).json(patient);
    } else {
        res.status(404).json({ message: "Patient not found" });
    }
});

const FindPatient = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
    }

    if (authData) {
        if (req.params.id !== authData.id) {
            res.status(401).json({ message: "Use your own ID" });
            return;
        }
    }

    const patient = await Patient.findOne({
        name: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        },
        contact: req.body.contact,
    });

    if (patient) {
        res.status(200).json(patient);
    } else {
        res.status(404).json({ message: "Patient not found" });
    }
});

module.exports = {
    createPatient,
    getPatients,
    getPatient,
    FindPatient,
};
