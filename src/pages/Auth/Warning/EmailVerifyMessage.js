import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const EmailVerifyMessage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Alert severity="success" sx={{ width: '100%', maxWidth: 400 }}>
        <AlertTitle>Success</AlertTitle>
        To register your account, please click on the link sent to your college email ID.
        <br />
        <h3 style={{ color: 'red' }}>Please also check your spam folder.</h3>
      </Alert>
      <Link to="/login">
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Login
        </Button>
      </Link>
    </Box>
  );
};

export default EmailVerifyMessage;
