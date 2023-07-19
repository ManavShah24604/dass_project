import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Loader from "./Loader";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function Calibrate() {
    const navigate = useNavigate();

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");

    const [loading, setLoading] = useState(false);
    const [base64string, setBase64string] = useState();
    const [file, setFile] = useState();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/signin", { replace: true });
        } else {
            let url = "http://localhost:3001/api/user/info";
            let headers = {
                headers: {
                    Authorization: `token ${localStorage.getItem("token")}`,
                },
            };

            axios
                .get(url, headers)
                .then((res) => {
                    setUserFirstName(res.data.firstname);
                    setUserLastName(res.data.lastname);
                })
                .catch((err) => {
                    console.log(err);
                    localStorage.clear();
                    navigate("/", { replace: true });
                });
        }
    }, []);

    useEffect(() => {
        // console.log("loader is changed");
    }, [loading]);

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        let file_ = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file_);
        reader.onload = function () {
            setBase64string(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let url = `http://localhost:3001/api/user/calibrate/${localStorage.id}`;
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };
        let data = {
            calib_image: base64string.split(",")[1],
            calib_length: e.target.calib_height.value,
            diag_length: e.target.diag_length.value,
        };
        axios
            .post(url, data, headers)
            .then((res) => {
                setLoading(false);
                alert("Calibration Successful");
                navigate("/dashboard", { replace: true });
            })
            .catch((err) => {
                setLoading(false);
                alert("Calibration Failed");
                console.log(err);
            });
    };

    return (
        <div>
            <div id="upper">{loading && <Loader />}</div>
            {
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{ fontSize: "3vw", textAlign: "center" }}
                            >
                                Change Calibration Image
                            </div>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 3 }}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            name="first"
                                            label="User First Name"
                                            id="first"
                                            disabled
                                            value={userFirstName}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            name="last"
                                            label="User Last Name"
                                            id="last"
                                            disabled
                                            value={userLastName}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            name="calib_height"
                                            label="Calibration Height"
                                            id="calib_height"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            name="diag_length"
                                            label="Diagonal Length"
                                            id="diag_length"
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid
                                    container
                                    spacing={2}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            component="label"
                                            onChange={handleChange}
                                        >
                                            Upload File
                                            <input type="file" hidden />
                                        </Button>
                                    </Grid>
                                    <img
                                        src={file}
                                        style={{
                                            width: "100%",
                                            marginTop: "5%",
                                        }}
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={base64string === undefined}
                                >
                                    Calibrate
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            }
        </div>
    );
}
