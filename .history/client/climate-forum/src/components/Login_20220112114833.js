import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Login () {
    return (
        <Box>
            <Typography variant='h3' component='div' gutterBottom>Login</Typography>
            <form>
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
                    // onChange={(event) => {setPassword(event.target.value)}} 
                    // value = {password}
                    />
                </Box>
                <br></br>
                <Button variant="contained" endIcon={<SendIcon />} type="submit">Submit</Button>
            </form>

            <p>-- or --</p>
            <p><Link to="/register">Create Account</Link></p>
        </Box>
    )
}

export default Login;