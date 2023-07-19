const express = require("express");
const router = express.Router();

const {
    createUser,
    loginUser,
    verifyUser,
    getInfo,
    calibUpdateUser,
} = require("../controls/user_controls");

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/verify", verifyUser);
router.get("/info", getInfo);
router.post("/calibrate/:id", calibUpdateUser);

module.exports = router;
