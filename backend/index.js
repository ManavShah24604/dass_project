const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cors());

mongoose
    .connect(
        "mongodb+srv://MD-DASS-Team-9:gMd7TON4sIH4k2vO@cluster0.hnj5qxz.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

const userRouter = require("./routes/user_routes");
const patientRouter = require("./routes/patient_routes");
const dataRouter = require("./routes/data_routes");

app.use("/api/user", userRouter);
app.use("/api/patient", patientRouter);
app.use("/api/data", dataRouter);

app.listen(3001, () => console.log("Server is running on port 3001"));

// gMd7TON4sIH4k2vO
