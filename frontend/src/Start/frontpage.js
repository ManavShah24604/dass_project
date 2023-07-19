import React from "react";
import { useNavigate } from "react-router-dom";
import "./front.css";

export default function Mainpage() {
    const navigate = useNavigate();

    return (
        <center>
            <div className="card" style={{ width: "90%", marginTop: "10%" }}>
                <h1 className="card-header">Malnutrition Detection</h1>
                <div className="card-body">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/calibrate")}
                    >
                        Calibrate
                    </button>
                    <br />
                    <br />
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/register")}
                    >
                        Register Patient
                    </button>
                    <br />
                    <br />
                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/test")}
                    >
                        Upload Data
                    </button>
                    <br />
                    <br />
                    <button
                        className="btn btn-warning"
                        onClick={() => navigate("/searchpatient")}
                    >
                        View Results
                    </button>
                    <br />
                    <br />
                    {localStorage.is_admin === "admin" && (
                        <button
                            className="btn btn-danger"
                            onClick={() => navigate("/allpatients")}
                        >
                            View All
                        </button>
                    )}
                </div>
            </div>
        </center>
    );
}
