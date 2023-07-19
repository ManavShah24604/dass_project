const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        access_perm: {
            type: String,
            required: true,
            trim: true,
            default: "ground-worker",
            enum: ["ground-worker", "admin"],
        },
        contact: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
        },
        calib: {
            calib_image: {
                type: String,
                required: false,
                trim: true,
                default: "null",
            },
            calib_length: {
                type: String,
                required: false,
                trim: true,
                default: "null",
            },
            diag_length: {
                type: String,
                required: false,
                trim: true,
                default: "null",
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
