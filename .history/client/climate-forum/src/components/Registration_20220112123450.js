import { useNavigate, Link } from 'react-router-dom';
import {useState} from 'react';
import { gql, useMutation } from '@apollo/client';

import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



function Registration () {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);

    const REGISTER_USER = gql`
        mutation register(
            $name: String!
            $username: String!
            $email: String!
            $password: String!
        ) {
            register(
                registerInput: {
                name: $name
                username: $username
                email: $email
                password: $password

                }
            ) {
                id 
                username 
                email 
                token 
                createdAt
            }
        }
    `;
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(loading);
            console.log(proxy);
            // console.log(result);
        },
        variables: {
            // name: name,
            // username: username,
            // email: email,
            // password: password
            name, username, email, password
        }
    });

    function onSubmit(event) {
        event.preventDefault();
        addUser();
    }

    return (
        <Box>
            <Typography variant='h3' component='div' gutterBottom>Create Account</Typography>
            <form className="form-container"onSubmit={onSubmit}>
                <Box>
                    <label htmlFor="name">Name</label>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-name-input" label="Enter your name" 
                    variant="outlined" 
                    onChange={(event) => {setName(event.target.value)}} 
                    value = {name}
                    />

                </Box>
                <Box>
                    <label htmlFor="username">Username</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-username-input" label="Enter username" 
                    variant="outlined" 
                    onChange={(event) => {setUsername(event.target.value)}} 
                    value = {username}
                    />

                </Box>
                <Box>
                    <label htmlFor="email">Email</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-email-input2" label="Enter email" 
                    variant="outlined" 
                    // onChange={(event) => {setEmail(event.target.value)}} 
                    // value = {email}
                    />

                </Box>
                <Box>
                    <label htmlFor="password">Password</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-password-input2" label="password" type="password"
                    variant="outlined" 
                    onChange={(event) => {setPassword(event.target.value)}} 
                    value = {password}
                    />
                </Box>

                <Box>
                    <label htmlFor="admin">Admin</label>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-read-only-input2" label="Admin"
                    InputProps={{
                      readOnly: true,
                    }}
                    value = {admin}
                    />
                </Box>
                <br></br>
                <Button variant="contained" endIcon={<SendIcon />} type="submit">Submit</Button>
            </form>

            <p>-- or --</p>
            <p><Link to="/login">Login</Link></p>
        </Box>
    )
}


export default Registration;