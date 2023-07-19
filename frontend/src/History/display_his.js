import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height:'80%',
    overflow:'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function View(props) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const handleOpen = () => {
        setOpen(true);

        var url = `http://localhost:3001/api/data/get/${localStorage.id}/${props.p_id}`
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };
        axios.get(url, headers)
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleClose = () => setOpen(false);


    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
            >
                View
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Patient's history
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                        {data.map(item => {
                            return (
                                <div className="container p-2 my-3 bg-dark" style={{ width: '100%', borderRadius: '10px' }}>
                                    <h6 className="text-center" style={{ color: 'white' }}>Date: {item.createdAt}</h6>
                                    <ul className="list-group">
                                        <li className="list-group-item" >
                                            <span className="font-weight-bold" style={{ fontWeight: 'bold' }}>Height: {item.height}</span>
                                        </li>
                                        <li className="list-group-item" >
                                            <span className="font-weight-bold" style={{ fontWeight: 'bold' }}>Weight: {item.weight}</span>
                                        </li>
                                        <li className="list-group-item" >
                                            <span className="font-weight-bold" style={{ fontWeight: 'bold' }}>Status: {item.malnutrition_status}</span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}