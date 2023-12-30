import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { toast } from "react-toastify";
import { customToast } from "../../components/Toaster/CustomToast";
import customFetch from "../../utils/axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const [disable, setDisable] = useState(false);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    if (!email) {
      customToast('error', { msg: "Please provide Email" })
      setDisable(false);
      return;
    }

    try {
      const { data } = await customFetch.post(  "/auth/forgot-password", {
        email,
      });
      setDisable(false);
      toast.success(`Success: ${data?.msg}`);
    } catch (error) {
      toast.error(`Something went wrong, please try again. Error: ${error}`);
    }
  };

  const paperStyle = { padding: "30px 20px", width: 550, margin: "40px auto" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const TextFieldStyle = { margin: 7 };
  return (
    <Grid>
      <Paper elevation={3} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className="heading">Forgot Password</h2>
          <Typography variant="caption" gutterBottom>
            Please Enter the Email to get New Password
          </Typography>
        </Grid>
        {/* *******  Form in SignUp Form **********/}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="College Email Id"
            style={TextFieldStyle}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box textAlign="center" padding={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={disable}
              >
                Submit
              </Button>
              <Typography padding={1}>
                <Link to="/login">Already registered? Login</Link>
              </Typography>
            </Box>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
}

export default ForgotPassword;
