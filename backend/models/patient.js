const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
    {
        name: {
            firstname: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                notNull: true,
            },
            lastname: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                notNull: true,
            },
        },
        dob: {
            type: Date,
            required: true,
            trim: true,
            notNull: true,
        },
        gender: {
            type: String,
            required: true,
            trim: true,
            notNull: true,
            default: "male",
            enum: ["male", "female"],
        },
        conditions: {
            type: String,
            trim: true,
            minlength: 3,
            default: "none",
        },
        contact: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
        },
        location: {
            type: String,
            trim: true,
            minlength: 3,
            default: "none",
        },
        userid: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
