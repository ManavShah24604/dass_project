import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";

export default function CollapsibleExample(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.token && localStorage.id && localStorage.is_admin) {
            let url = "http://localhost:3001/api/user/verify";
            let headers = {
                headers: {
                    Authorization: `token ${localStorage.token}`,
                },
            };
            axios
                .get(url, headers)
                .then((res) => {
                    if (
                        res.data._id !== localStorage.id ||
                        res.data.is_admin !== localStorage.is_admin
                    ) {
                        localStorage.clear();
                        navigate("/", { replace: true });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            localStorage.clear();
            navigate("/", { replace: true });
        }
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goback = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
            style={{ padding: 10 }}
        >
            <Container>
                <Navbar.Brand onClick={goback} style={{ cursor: "pointer" }}>
                    {<HomeIcon fontSize="large" />}
                </Navbar.Brand>
                <Grid item direction="row" justifyContent="space-around">
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <Avatar
                                alt="Display Picture"
                                sx={{ width: 30, height: 30 }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                    >
                        <MenuItem onClick={() => navigate("/profile")}>
                            <Avatar /> My Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                localStorage.clear();
                                navigate("/", { replace: true });
                            }}
                        >
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Grid>
            </Container>
        </Navbar>
    );
}
