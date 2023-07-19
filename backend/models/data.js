const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
    {
        userid: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        patientid: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        weight: {
            type: Number,
            required: true,
            trim: true,
        },
        height: {
            type: Number,
            required: true,
            trim: true,
        },
        bmi: {
            type: Number,
            required: true,
            trim: true,
            default: 20,
        },
        malnutrition_status: {
            type: String,
            required: true,
            trim: true,
            default: "NA",
            enum: ["NA", "Severe Malnutrition", "Moderate Malnutrition", "Mild Malnutrition", "Proper Nutrition"],
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
