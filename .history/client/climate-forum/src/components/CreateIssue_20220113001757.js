import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {useState} from 'react';
import { gql, useMutation } from '@apollo/client';
import {FETCH_CLIMATE_POSTS} from '../util/graphql';

import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function CreateIssue() {
    const [image, setImage] = useState('');
    const [details, setDetails] = useState('');
    const [clicked, setClicked] = useState(false);

    const bttnTxt = clicked ? "Hide Form" : "Click to add a new Entry!"

    /// GQL Mutation
    
    const CREATE_ISSUE = gql`
        mutation createIssue(
            $image: String
            $details: String!
        ) {
            createIssue(
                image: $image
                details: $details
            ) {
                id 
                username 
                image
                details
                comments{
                    id
                    body
                    username
                    createdAt
                }
                createdAt
            }
        }
    `;

    const [createPost, {error}] = useMutation(CREATE_ISSUE, {
        update(proxy, result) {
            console.log(result);
            const data = proxy.readQuery({
                query: FETCH_CLIMATE_POSTS
            })
            data.getIssues = [result.data.createIssue, ...data.getIssues];
            proxy.writeQuery({query: FETCH_CLIMATE_POSTS, data});
        },
        // onError(err){
        //     console.log(err);
        // },
        variables: {image, details}
    });

    function createNewPost (event) {
        event.preventDefault();
        console.log(image);
        console.log(details);
        setImage('');
        setDetails('');
        createPost();
        
    }
    return (

        <Box>
            <Button onClick={() => setClicked(!clicked)}variant="contained" color="primary">{bttnTxt}</Button>
            {clicked && (
                <Box>
                    <Typography variant='h3' component='div' gutterBottom>Create a new Post</Typography>
                    <form onSubmit={createNewPost}>
                        <Box>
                            <label htmlFor="image">Image</label>
                            <br></br>
                            <br></br>
                            <TextField id="outlined-image-input" label="Enter image url" 
                            variant="outlined" 
                            onChange={(event) => {setImage(event.target.value)}} 
                            value = {image}
                            />
    
                        </Box>
                        <Box>
                            <label htmlFor="Details">Details</label>
                            <br></br>
                            <br></br>
                            <TextField required id="outlined-details-input1" label="Enter issue content" type="text"
                            variant="outlined" 
                            onChange={(event) => {setDetails(event.target.value)}} 
                            value = {details}
                            />
                        </Box>
                        <br></br>
                        <Button variant="contained" endIcon={<SendIcon />} type="submit">Create Issue</Button>
                    </form>
    
                    {/* Error Handling */}
                    {/* {Object.keys(error).length > 0 && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">
                                <ul>
                                    <li>{Object.values(error)}</li>
                                </ul>
                            </Alert>
                        </Stack>
                    )} */}
                </Box>
                
            )}
        </Box>
    )
}
