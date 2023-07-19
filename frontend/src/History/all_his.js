import React, { useEffect, useState } from "react";
import View from "./display_his";
import axios from "axios";

export default function Allhis() {
    const [data, Setdata] = useState([]);

    useEffect(() => {
        var url = `http://localhost:3001/api/patient/get/${localStorage.id}`;
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };
        axios.get(url, headers).then((res) => {
            console.log(res);
            Setdata(res.data);
        });
    }, []);

    return (
        <center>
            <div style={{ color: "white" }}>
                <h2>
                    <u>
                        <i>HISTORY</i>
                    </u>
                </h2>
            </div>

            {data.map((info) => {
                return (
                    <div
                        className="container p-2 my-3 bg-light"
                        style={styles.box}
                    >
                        <ul className="list-group">
                            <li
                                className="list-group-item"
                                style={{ fontWeight: "bold" }}
                            >
                                <span className="font-weight-bold">Name: </span>
                                {info.name.firstname}
                            </li>
                            <li
                                className="list-group-item"
                                style={{ fontWeight: "bold" }}
                            >
                                <span className="font-weight-bold">
                                    Contact:{" "}
                                </span>
                                {info.contact}
                            </li>
                        </ul>
                        <View p_id={info._id} />
                    </div>
                );
            })}
        </center>
    );
}

const styles = {
    box: {
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
        width: "60%",
    },
};
