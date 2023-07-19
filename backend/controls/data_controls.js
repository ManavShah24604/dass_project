const Data = require("../models/data.js");
const Patient = require("../models/patient.js");
const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const axios = require("axios");

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

const newData = asyncHandler(async (req, res) => {
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
        const patients = await Patient.find({
            name: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            },
            contact: req.body.contact,
        });
        const user = await User.findById(req.params.id);

        if (patients && user) {
            try {
                if (
                    !user.calib.calib_image ||
                    !user.calib.calib_length ||
                    !user.calib.diag_length
                ) {
                    res.status(400).json({
                        message: "Please calibrate your device first",
                    });
                    return;
                }

                let pass = {
                    image: req.body.image,
                    calib_image: user.calib.calib_image,
                    calib_length: user.calib.calib_length,
                    diag_length: user.calib.diag_length,
                    gender: patients[0].gender,
                    age: calculateAge(patients[0].dob),
                };
                console.log(pass.age)
                const response = await axios.post(
                    "http://127.0.0.1:8080",
                    pass
                );
                console.log(response.data);
                let data = new Data({
                    userid: user._id,
                    patientid: patients[0]._id,
                    weight: response.data.weight,
                    height: response.data.height,
                    bmi: response.data.bmi,
                    malnutrition_status: response.data.malnutrition_status,
                    image: req.body.image,
                });

                await data.save();
                let res_data = {
                    userid: user._id,
                    patientid: patients[0]._id,
                    weight: response.data.weight,
                    height: response.data.height,
                    bmi: response.data.bmi,
                    malnutrition_status: response.data.malnutrition_status,
                };
                console.log(res_data);
                res.status(200).json(res_data);
            } catch (err) {
                res.status(500).json({ message: "Flask server error" });
            }
        } else {
            res.status(404).json({ message: "Patient or user not found" });
        }
    } else {
        res.status(400).json({ message: "No data provided" });
    }
});

const getPatientDataset = asyncHandler(async (req, res) => {
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
    if (user.access_perm === "admin") {
        const dataset = await Data.find({ patientid: req.params.patient });
        res.status(200).json(dataset);
    } else {
        res.status(401).json({
            message: "Unauthorized for all data. Only for admin.",
        });
        return;
    }
});

module.exports = {
    newData,
    getPatientDataset,
};
