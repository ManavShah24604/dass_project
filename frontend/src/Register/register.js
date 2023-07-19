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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function RegisterPatient() {
    const navigate = useNavigate();

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [gender, setGender] = useState("");

    const [value, setValue] = React.useState(dayjs("2022-04-07"));

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

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = `http://localhost:3001/api/patient/create/${localStorage.getItem(
            "id"
        )}`;
        let headers = {
            headers: {
                Authorization: `token ${localStorage.getItem("token")}`,
            },
        };
        const data = new FormData(e.currentTarget);
        let pass_data = {
            firstname: data.get("firstname"),
            lastname: data.get("lastname"),
            dob: value,
            contact: data.get("contact"),
            location: data.get("location"),
        };

        if (gender === 10) {
            pass_data = {
                ...pass_data,
                gender: "male",
            };
        } else {
            pass_data = {
                ...pass_data,
                gender: "female",
            };
        }

        axios
            .post(url, pass_data, headers)
            .then((res) => {
                console.log(res);
                navigate("/", { replace: true });
            })
            .catch((err) => {
                console.log(err);
                alert("Patient already registered!");
            });
    };

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
                    <div style={{ fontSize: "3vw" }}>Register Patient</div>
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
                                <FormControl
                                    sx={{
                                        minWidth: 120,
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <InputLabel
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        Gender
                                    </InputLabel>
                                    <Select
                                        id="gender"
                                        name="gender"
                                        value={gender}
                                        label="Gender"
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                        }}
                                    >
                                        <MenuItem value={10}>Male</MenuItem>
                                        <MenuItem value={20}>Female</MenuItem>
                                    </Select>
                                </FormControl>
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
                                    id="location"
                                    label="Location"
                                    name="location"
                                    placeholder="Location"
                                    align="center"
                                />
                            </Grid>
                        </Grid>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disableFuture
                                    openTo="year"
                                    views={["year", "month", "day"]}
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
