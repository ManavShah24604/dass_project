const User = require("../models/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
    if (req.body) {
        if (req.body.password === req.body.confirmPassword) {
            data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                contact: req.body.contact,
            };
            if (req.body.access_perm) {
                data.access_perm = req.body.access_perm;
            }
            const user = new User(data);
            const createdUser = await user.save();
            let token = jwt.sign(
                {
                    id: createdUser._id,
                    email: createdUser.email,
                    access_perm: createdUser.access_perm,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );
            res.status(201).json({
                token: token,
                id: createdUser._id,
                is_admin: createdUser.access_perm,
            });
        }
    } else {
        res.status(400).json({ message: "No data provided" });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    if (req.body) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        access_perm: user.access_perm,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "24h",
                    }
                );
                res.status(200).json({
                    token: token,
                    id: user._id,
                    is_admin: user.access_perm,
                });
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } else {
        res.status(400).json({ message: "No data provided" });
    }
});

const verifyUser = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    if (token) {
        try {
            const authData = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(authData.id);
            res.status(200).json({
                _id: authData.id,
                verify: "valid",
                is_admin: authData.access_perm,
                firstname: user.firstname,
                lastname: user.lastname,
            });
        } catch (err) {
            res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(400).json({ message: "No token provided" });
    }
});

const getInfo = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    try {
        authData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }

    const user = await User.findById(authData.id);
    res.status(200).json({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        contact: user.contact,
        is_admin: user.access_perm,
    });
});

const calibUpdateUser = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    try {
        authData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }

    if (authData.id !== req.params.id) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }

    if (req.body && req.body.calib_image) {
        const user = await User.findById(authData.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.calib.calib_image = req.body.calib_image;
        user.calib.calib_length = req.body.calib_length;
        user.calib.diag_length = req.body.diag_length;
        await user.save();
        res.status(200).json({ message: "Calibration image updated" });
        return;
    } else {
        res.status(400).json({ message: "No data provided" });
        return;
    }
});

module.exports = {
    createUser,
    loginUser,
    verifyUser,
    getInfo,
    calibUpdateUser,
};
