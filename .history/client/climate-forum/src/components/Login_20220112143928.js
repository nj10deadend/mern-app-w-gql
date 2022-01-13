import { useNavigate, Link } from 'react-router-dom';
import {useState} from 'react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/Auth';
import {useContext} from 'react';

import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Login () {
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const LOGIN = gql`
        mutation login(
            $email: String!
            $password: String!
        ) {
            login(
                email: $email
                password: $password
            ) {
                id 
                name
                username 
                email 
                token 
                createdAt
            }
        }
    `;
    const [loginUser, {loading}] = useMutation(LOGIN, {
        update(proxy, result) {
            console.log(loading);
            // console.log(proxy);
            console.log(result.data.login);
            context.login(result.data.login);
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: {email, password}
    });

    function onLogin(event) {
        event.preventDefault();
        loginUser();
        setEmail('');
        setPassword('');
        navigate('/');
    }


    
    return (
        <Box>
            <Typography variant='h3' component='div' gutterBottom>Login</Typography>
            <form onSubmit={onLogin}>
                <Box>
                    <label htmlFor="email">Email</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-email-input1" label="Enter email" 
                    variant="outlined" 
                    onChange={(event) => {setEmail(event.target.value)}} 
                    value = {email}
                    />

                </Box>
                <Box>
                    <label htmlFor="password">Password</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-password-input1" label="password" type="password"
                    variant="outlined" 
                    onChange={(event) => {setPassword(event.target.value)}} 
                    value = {password}
                    />
                </Box>
                <br></br>
                <Button variant="contained" endIcon={<SendIcon />} type="submit">Login</Button>
            </form>

            <p>-- or --</p>
            <p><Link to="/register">Create Account</Link></p>
            {/* Error Handling */}
            {Object.keys(errors).length > 0 && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                        <ul>
                            {/* {Object.values(errors).map(error => {
                                <li key={error}>{error}</li>
                            })} */}
                            <li>{Object.values(errors)}</li>
                        </ul>
                    </Alert>
                </Stack>
            )}
        </Box>
    )
}

export default Login;