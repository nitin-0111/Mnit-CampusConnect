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
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import "./SignUp.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Error from "./Warning/Error";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { showErrorToast, showSuccessToast } from "./Warning/ErrorToast";
import { registerUser } from "../../features/user/userSlice";
import customFetch from "../../utils/axios";
import { debounce } from 'lodash';
const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    userName: "",
    branch: null,
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });
  const { user: userInfo, isLoading } = useSelector((store) => store.auth);
  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [userInfo]);

  const [errors, setErrors] = useState({
    name: "",
    userName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setViewPassword((prevState) => !prevState);
  };
  
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const [userNameAvailable, setUserNameAvailable] = useState(false);

  const checkUsernameAvailability = async (value) => {
    try {
      const response = await customFetch.get(`/auth/checkUsername/${value}`);
      setUserNameAvailable(response.data.available);
    } catch (error) {
      console.error('Error checking username availability', error);
    }
  };
  const debouncedCheckUsernameAvailability = debounce(checkUsernameAvailability, 500);

  


  const handleInputs = async (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
    if (name === 'userName' && value && user.name) {
      debouncedCheckUsernameAvailability(value);
    }

  };

  useEffect(() => {
    // Check username availability when the component mounts or when the userName changes
    if (user.userName && user.name) {
      checkUsernameAvailability(user.userName);
    } else {
      // Reset userNameAvailable to null when userName is empty
      setUserNameAvailable(null);
    }
  }, [user.userName, user.name]);

  //   ******     Validation of Whole Form *******        //
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};


    if (!/^[A-Za-z0-9 ]{3,25}$/.test(user.name)) {
      newErrors.name =
        "Full Name should be 3-25 characters and shouldn't include any special character!";
      isValid = false;
    }

    if (!user.userName) {
      newErrors.userName = "Username is required!";
      isValid = false;
    }

    if (!/^\d{10}$/.test(user.mobile)) {
      newErrors.mobile = "Mobile number should be exactly 10 digits!";
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

    if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match!";
      isValid = false;
    }


    const emailRegex = /^[A-Za-z0-9._%+-]+@mnit\.ac\.in$/;
    if (!emailRegex.test(user.email)) {
      newErrors.email = "Only Accept College Email that end with @mnit.ac.in";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  // *********  **********  *********** *********** *************** *****************  //

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Give Data to Backend
      const userData = user;

      try {
        // Dispatch action to register user
        dispatch(registerUser(userData));

        // Display success toast while server is processing
        showSuccessToast("Wait!! Server is Processing");

        // Delay navigation and display another toast
        setTimeout(() => {
          navigate("/emailverifymessage");
          showSuccessToast("Check Your Email for Registration Link");
        }, 2000);
      } catch (error) {
        // Display error toast if registration fails
        showErrorToast("Registration failed. Please check your credentials and try again.");
      }
    } else {
      // Display error toast for form validation failure
      showErrorToast("Please fill in all required fields.");
    }
  };



  //    Ye styling ke liye hi use kiya hai //
  const paperStyle = { padding: "30px 20px", width: 450, margin: "40px auto" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const TextFieldStyle = { margin: 7 };
  const Branches = [
    { label: "Computer Science and Engineering" },
    { label: "Electronics and Communication Engineering" },
    { label: "Electrical Engineering" },
    { label: "Mechanical Engineering" },
    { label: "Civil Engineering" },
    { label: "Chemical Engineering" },
    { label: "Metallurgical and Materials Engineering" },
    { label: "Architecture" },
  ];

  // ************************************************//

  return (
    <Grid>
      <Paper elevation={3} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className="heading">Register</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this Form to Create Account
          </Typography>
        </Grid>
        {/* *******  Form in SignUp Form **********/}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter Your Full Name"
            style={TextFieldStyle}
            name="name"
            value={user.name}
            onChange={handleInputs}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="UserName"
            name="userName"
            value={user.userName}
            onChange={handleInputs}
            error={userNameAvailable === false}
            helperText={userNameAvailable === false ? 'This UserName is Not available' : ''}
            InputProps={{
              endAdornment: (
                <>
                  {(userNameAvailable === true &&user.userName.length>0) && <TaskAltIcon style={{ color: 'green' }} />}
                  {(userNameAvailable === false &&user.userName.length>0) && <CancelIcon style={{ color: 'red' }} />}
                </>
              ),
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Branches}
            getOptionLabel={(option) => option.label || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Branch"
                placeholder="Choose Your Branch"
                style={TextFieldStyle}
              />
            )}
            name="branch"
            value={Branches.find(option => option.label === user.branch) || null}
            onChange={(event, newValue) => {
              handleInputs({
                target: {
                  name: "branch",
                  value: newValue ? newValue.label : null,
                },
              });
            }}
          />

          <TextField
            fullWidth
            label="College Email Id"
            style={TextFieldStyle}
            name="email"
            value={user.email}
            onChange={handleInputs}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Mobile Number"
            style={TextFieldStyle}
            name="mobile"
            value={user.mobile}
            onChange={handleInputs}
            error={!!errors.mobile}
            helperText={errors.mobile}
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
                    {!viewPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            style={TextFieldStyle}
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputs}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            fullWidth
            label="I want to recieve latest updates"
            className="notify"
          />
          <br />
          <Box display="flex" flexDirection="column" alignItems="center"  >
            <Box textAlign="center" padding={1} >
              <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                Register
              </Button>
              <Typography padding={1}>
                <Link to="/login">
                  Already registered? Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </form>

      </Paper>
    </Grid>
  );
};
export default SignUp;