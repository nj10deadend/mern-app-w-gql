import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



function Registration () {

    return (
        <Box>
            <Typography variant='h3' component='div' gutterBottom>Create Account</Typography>
            <form>
                <Box>
                    <label htmlFor="name">Name</label>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-name-input" label="Enter your name" 
                    variant="outlined" 
                    // onChange={(event) => {setName(event.target.value)}} 
                    // value = {name}
                    />

                </Box>
                <Box>
                    <label htmlFor="username">Username</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-name-input" label="Enter username" 
                    variant="outlined" 
                    // onChange={(event) => {setName(event.target.value)}} 
                    // value = {name}
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
                    // onChange={(event) => {setPassword(event.target.value)}} 
                    // value = {password}
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
                    // value = {admin}
                    />
                </Box>
                <br></br>
                <Button variant="contained" endIcon={<SendIcon />} type="submit">Login</Button>
            </form>

            <p>-- or --</p>
            <p><Link to="/login">Login</Link></p>
        </Box>
    )
}


export default Registration;