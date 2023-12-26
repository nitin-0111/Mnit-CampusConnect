import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../env";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
// import './ResetPassword.css'
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ResetPassword = () => {
 
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const query = useQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credential.password || !credential.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (credential.password !== credential.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post(BASE_URL + "/auth/reset-password", {
        password: credential.password,
        token: query.get("token"),
        email: query.get("email"),
      });

      toast.success("Password changed successfully");
      
      setTimeout(() => {
        navigate("/login");
        setLoading(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to reset password. Please try again."); // More user-friendly error message
    }
  };

  const paperStyle = { padding: '30px 20px', width: 550, margin: '40px auto' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const textFieldStyle = { margin: 7 };
  const disable = loading || credential.password !== credential.confirmPassword;

  return (
    <Container className="page">
      <Grid>
        <Paper elevation={3} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 className="heading">Reset Password</h2>
            <Typography variant="caption" gutterBottom>
              Please Enter the New Password
            </Typography>
          </Grid>
          <form className={`form ${loading ? 'loading' : ''}`} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New Password"
              style={textFieldStyle}
              type="password"
              name="password"
              value={credential.password}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              style={textFieldStyle}
              type="password"
              name="confirmPassword"
              value={credential.confirmPassword}
              onChange={handleChange}
              variant="outlined"
            />
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box textAlign="center" padding={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={disable}
                >
                  {loading ? 'Please Wait...' : 'New Password'}
                </Button>
      
              </Box>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
};

export default ResetPassword;