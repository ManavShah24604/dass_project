import React from "react";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
    var isadmin = localStorage.getItem("is_admin");

    const [data, setData] = useState([]);

    useEffect(() => {
        let url = "http://localhost:3001/api/user/info";
        let headers = {
            headers: {
                Authorization: `token ${localStorage.getItem("token")}`,
            },
        };
        axios
            .get(url, headers)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <center>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                }}
            >
                <div className="row container d-flex justify-content-center">
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25">
                                            <img
                                                src="https://img.icons8.com/bubbles/100/000000/user.png"
                                                className="img-radius"
                                                alt="User-Profile-Image"
                                            />
                                        </div>
                                        <h5 className="f-w-600">
                                            {data.firstname +
                                                " " +
                                                data.lastname}
                                        </h5>
                                        {isadmin === "admin" ? (
                                            <h6>Administrator</h6>
                                        ) : (
                                            <h6>Ground-Personnel</h6>
                                        )}
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                                            Personal Information
                                        </h6>
                                        <div className="row">
                                            <p className="m-b-10 f-w-600">
                                                Email
                                            </p>
                                            <h6 className="text f-w-400">
                                                {data.email}
                                            </h6>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">
                                                    Phone
                                                </p>
                                                <h6 className="text f-w-400">
                                                    {data.contact}
                                                </h6>
                                            </div>
                                            <div className="col-sm-6">
                                                {isadmin === "admin" ? (
                                                    <>
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">
                                                                NGO
                                                            </p>
                                                            <h6 className="text f-w-400">
                                                                MMKH NGO
                                                            </h6>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <p></p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </center>
    );
}
