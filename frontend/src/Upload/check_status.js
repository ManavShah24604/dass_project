import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loader from "./Loader";
import "./loader.css";
const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const [isLoading, setLoading] = useState(false);
    const [base64string, setBase64string] = useState();
    const [file, setFile] = useState();

    const navigate = useNavigate();

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");

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
    useEffect(() => {
        console.log("loader is changed");
    }, [isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const element = document.getElementById("upper");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        console.log("here");
        let url = `http://localhost:3001/api/data/create/${localStorage.id}`;
        let segments = base64string.split(",");
        let pass_data = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            contact: document.getElementById("contact").value,
            image: segments[1],
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };
        console.log(pass_data);
        console.log("loading ", isLoading);
        axios
            .post(url, pass_data, headers)
            .then((res) => {
                console.log(res);
                localStorage.setItem("wt", JSON.stringify(res.data.weight));
                localStorage.setItem("ht", JSON.stringify(res.data.height));
                localStorage.setItem(
                    "fname",
                    JSON.stringify(document.getElementById("firstname").value)
                );
                localStorage.setItem(
                    "lname",
                    JSON.stringify(document.getElementById("lastname").value)
                );
                localStorage.setItem(
                    "status",
                    JSON.stringify(res.data.malnutrition_status)
                );
                setLoading(false);
                console.log("hi");
                navigate("/result");
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) {
                    alert("Please calibrate device before uploading data !!");
                } else {
                    alert("Something went wrong !!");
                }
                console.log(err);
                setLoading(false);
            });
    };
    return (
        <div>
            <div id="upper">{isLoading && <Loader />}</div>
            {
                <div>
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
                                <div style={{ fontSize: "3vw" }}>
                                    Upload Data
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
                                                id="firstname"
                                                label="First Name"
                                                name="firstname"
                                                placeholder="First Name"
                                                autoFocus
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
                                                id="lastname"
                                                label="Last Name"
                                                name="lastname"
                                                placeholder="Last Name"
                                            />
                                        </Grid>
                                    </Grid>
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
                                                name="contact"
                                                placeholder="Contact"
                                                label="Contact"
                                                type="contact"
                                                id="contact"
                                            />
                                        </Grid>
                                    </Grid>
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
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            }
        </div>
    );
}

export default App;
