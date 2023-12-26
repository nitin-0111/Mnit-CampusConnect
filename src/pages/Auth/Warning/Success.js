import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
        }}
      >
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert>
        <Link to="/login" className="btn" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Please login
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Success;
