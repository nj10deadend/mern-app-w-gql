import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/Auth';
import {useContext} from 'react';
import {FETCH_CLIMATE_POSTS} from '../util/graphql';


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

    const CREATE_COMMENT = gql`
        mutation createComment(
            $issueId: String!
            $body: String!
        ) {
            createComment(
                issueId: $issueId
                body: $body
            ) {
                id 
                username 
                image
                details
                comments {
                    username
                    body
                    createdAt
                } 
                createdAt
            }
        }
    `;
    const [createComment, {error}] = useMutation(CREATE_COMMENT, {
        update(proxy, result) {
            console.log(result.data.createComment);
            const data = proxy.readQuery({
                query: FETCH_CLIMATE_POSTS
            })
            let newData = [...data.getIssues]
            console.log(newData);
            newData = [result.data.createComment, ...newData];
            proxy.writeQuery({
                query: FETCH_CLIMATE_POSTS,
                data: {
                  ...data,
                  getIssues: {
                    newData,
                  },
                },
              });
        }, variables: {issueId, body}
    })

    function createNewComment(event) {
        event.preventDefault();
        createComment();
        setIssueId('');
        setBody('');
    }
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
                        <form onSubmit={createNewComment}>
                            <Box>
                                <label htmlFor="body">Issue ID</label>
                                <br></br>
                                <br></br>
                                <TextField required id="outlined-body-input1" label="Enter ID of Issue" 
                                variant="outlined" 
                                onChange={(event) => {setIssueId(event.target.value)}} 
                                value = {issueId}
                                />

                            </Box>
                            <Box>
                                <label htmlFor="comment">Enter Comment</label>
                                <br></br>
                                <br></br>
                                <TextField required id="outlined-body-input1" label="Enter comment"
                                variant="outlined" 
                                onChange={(event) => {setBody(event.target.value)}} 
                                value = {body}
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
