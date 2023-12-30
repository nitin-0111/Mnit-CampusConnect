import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./SignUp.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import Error from "./Warning/Error";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { showErrorToast, showSuccessToast } from "./Warning/ErrorToast";  // Import the showErrorToast function
import { loginUser } from "../../features/user/userSlice";

const LogIn = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setViewPassword((prevState) => !prevState);
  };
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const {user:userInfo,isLoading}=useSelector((store)=>store.auth);

 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  //   ******     Validation of Whole Form *******   ******  ******  ******       //
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    const emailRegex = /^[A-Za-z0-9._%+-]+@mnit\.ac\.in$/;
    if (!emailRegex.test(user.email)) {
      newErrors.email = "Only Accept College Email that end with @mnit.ac.in";
      isValid = false;
    }

    if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(
        user.password
      )
    ) {
      newErrors.password =
        "Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  // *********  **********  *********** *********** *************** *****************  //

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = user;

      try {
       
        dispatch(loginUser(userData));
        showSuccessToast("Wait!! Server is Processing");
        setTimeout(() => {
          navigate("/products");
        }, 3000);
      } catch (error) {
        showErrorToast("Oops! It seems the password entered is incorrect. Please double-check and try again.");
        showErrorToast("Or,may be our server is currently busy. Please try again later.")
      }
    }
    else {
      console.log("Incorrct")
      showErrorToast('Login failed. Please check your credentials and try again.');
    }
  };

 

  //    Ye styling ke liye hi use kiya hai //
  const paperStyle = { padding: "30px 20px", width: 450, margin: "40px auto" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const TextFieldStyle = { margin: 7 };
  const linkStyle = {
    background: "transparent",
    border: "none",
    color: "Blue", // Replace 'blue' with your desired color
    cursor: "pointer",
    letterSpacing: "0.1em", // Adjust the letter spacing as needed
    textDecoration: "none",
    marginRight: "8px", // Adjust the margin as needed
  };
  // ************************************************//

  return (

    <Grid>

      <Paper elevation={3} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className="heading">LogIn</h2>
          <Typography variant="caption" gutterBottom>
            Please LogIn to CampusConnect
          </Typography>
        </Grid>
        {/* *******  Form in SignUp Form **********/}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="College Email Id"
            type="email"
            style={TextFieldStyle}
            name="email"
            value={user.email}
            onChange={handleInputs}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type={viewPassword ? "text" : "password"}
            style={TextFieldStyle}
            name="password"
            value={user.password}
            onChange={handleInputs}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {!viewPassword ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            fullWidth
            label="I want to recieve latest updates"
            className="notify"
          />
          <br />
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box textAlign="center" padding={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                LogIn
              </Button>
              <Typography padding={1}>
                Not registered?
                <Link to="/signup" style={linkStyle}>
                  Register
                </Link>
                <tr />
                <Link to="/user/forget-password" style={linkStyle}>
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};
export default LogIn;
