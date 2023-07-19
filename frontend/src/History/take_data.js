import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function App() {
    const navigate = useNavigate();

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");

    const [patient, setPatient] = useState("");
    const [data, setData] = useState("");
    const [open, setOpen] = useState(false);

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
                    navigate("/");
                });
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        let firstname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let contact = document.getElementById("contact").value;

        if (firstname === "" || lastname === "" || contact === "") {
            alert("Please enter all the details");
            return;
        }

        let url = `http://localhost:3001/api/patient/find/${localStorage.id}`;
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };
        let pass_data = {
            firstname: firstname,
            lastname: lastname,
            contact: contact,
        };

        axios
            .post(url, pass_data, headers)
            .then((res) => {
                setPatient(res.data);
            })
            .catch((err) => {
                alert("Patient not found");
            });
    };

    useEffect(() => {
        if (patient === "") return;

        let url = `http://localhost:3001/api/data/get/${localStorage.id}/${patient._id}`;
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .get(url, headers)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [patient]);

    const handleOpen = () => setOpen(true);

    useEffect(() => {
        if (data === "") return;

        handleOpen();
        console.log(open);
    }, [data]);

    const handleClose = () => setOpen(false);

    return (
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
                    <div style={{ fontSize: "2vw" }}>Enter Patient Details</div>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
                {data ? (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Patient's history
                            </Typography>
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                {data.map((item) => {
                                    return (
                                        <div
                                            className="container p-2 my-3 bg-dark"
                                            style={{
                                                width: "100%",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <h6
                                                className="text-center"
                                                style={{ color: "white" }}
                                            >
                                                Date: {item.createdAt}
                                            </h6>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <span
                                                        className="font-weight-bold"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Height: {item.height}
                                                    </span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span
                                                        className="font-weight-bold"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Weight: {item.weight}
                                                    </span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span
                                                        className="font-weight-bold"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Status:{" "}
                                                        {
                                                            item.malnutrition_status
                                                        }
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    );
                                })}
                            </Typography>
                        </Box>
                    </Modal>
                ) : (
                    <div></div>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default App;
