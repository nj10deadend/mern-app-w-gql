import React from 'react'
import {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CreateComment() {
    const [open, setOpen] = useState(false);
    const [issueId, setIssueId] = useState('');
    const [body, setBody] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={handleOpen} variant="contained" endIcon={<AddIcon />}>Add Comment</Button>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
                <Fade in={open}>
                <Box sx={style}>
                    <Box>
                        <Typography variant='h3' component='div' gutterBottom>Add Comment</Typography>
                        <form>
                            <Box>
                                <label htmlFor="body">Issue ID</label>
                                <br></br>
                                <br></br>
                                <TextField required id="outlined-body-input1" label="Enter ID of Issue" 
                                variant="outlined" 
                                // onChange={(event) => {setEmail(event.target.value)}} 
                                // value = {email}
                                />

                            </Box>
                            <Box>
                                <label htmlFor="password">Password</label>
                                <br></br>
                                <br></br>
                                <TextField required id="outlined-password-input1" label="password" type="password"
                                variant="outlined" 
                                // onChange={(event) => {setPassword(event.target.value)}} 
                                // value = {password}
                                />
                            </Box>
                            <br></br>
                            <Button variant="contained" endIcon={<SendIcon />} type="submit">Add Comment</Button>
                        </form>
                    </Box>
                </Box>
                </Fade>
            </Modal>
            
        </div>
    )
}
export default CreateComment;
