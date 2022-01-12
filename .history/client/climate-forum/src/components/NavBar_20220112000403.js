import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from "react-router-dom";



export default function NavBar() {

    const navigate = useNavigate();

    function goHome () {
        navigate('/');
    }
    function goToLogin() {
        navigate('/login');
    }
    function goToRegistration() {
        navigate('/register');
    }
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Forum
            </Typography>
            <Button onClick={() => goHome()} color="inherit">Home</Button>
            <Button onClick={() => goToLogin()} color="inherit">Login</Button>
            <Button onClick={() => goToRegistration()} color="inherit">Create new Account</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }