import React from "react";
import "./try.css";

export default function Result() {
    var wt = JSON.parse(localStorage.getItem("wt"));
    var ht = JSON.parse(localStorage.getItem("ht"));
    var fname = JSON.parse(localStorage.getItem("fname"));
    var lname = JSON.parse(localStorage.getItem("lname"));
    var status = JSON.parse(localStorage.getItem("status"));

    return (
        <div
            className="container p-4 bg-light"
            style={{
                borderRadius: "10px",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
                width: "60%",
                marginTop: "10%",
            }}
        >
            <h1 className="text-center">Result</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <span
                        className="font-weight-bold"
                        style={{ fontSize: "20px" }}
                    >
                        First Name: {fname}{" "}
                    </span>
                </li>
                <li className="list-group-item">
                    <span
                        className="font-weight-bold"
                        style={{ fontSize: "20px" }}
                    >
                        Last Name: {lname}{" "}
                    </span>
                </li>
                <li className="list-group-item">
                    <span
                        className="font-weight-bold"
                        style={{ fontSize: "20px" }}
                    >
                        Height: {ht} cm
                    </span>
                </li>
                <li className="list-group-item">
                    <span
                        className="font-weight-bold"
                        style={{ fontSize: "20px" }}
                    >
                        Weight: {wt} Kg{" "}
                    </span>
                </li>
                <li className="list-group-item">
                    <span
                        className="font-weight-bold"
                        style={{ fontSize: "20px" }}
                    >
                        Malnutrition Status: {status}{" "}
                    </span>
                </li>
            </ul>
        </div>
    );
}
