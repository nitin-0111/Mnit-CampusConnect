import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import NavbarImage from "../../assets/img/CampusConnect-logos/CampusConnect-logos_white.png";
import NavbarAvatar from "../Navbar/NavbarAvatar";
import "../Navbar/Navbar.css";

import { BASE_URL } from "../../env";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { logoutUser } from "../../features/user/userSlice";

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.auth);
  // ************************** Data fetching for NavbarLogo Icons **************************
 
  const userId = user.userId
  const [userData, setUserData] = useState({
    Name: "",
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + `/auth/myInfo/${userId}`);
        setUserData(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [userId]);
  // *******************************************************************************************

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{paddingTop:0, paddingBottom:0, border:0}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, alignItems:"center" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <img
              src={NavbarImage}
              alt="Navbar Logo"
              onClick={() =>{navigate("/home")}}
            />
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/home");
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/addProduct");
                }}
              >
                <Typography textAlign="center">Add Product</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/products");
                }}
              >
                <Typography textAlign="center">Products</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, alignItems:"center" }}>
            <img
              src={NavbarImage}
              alt="Navbar Logo"
              onClick={() =>{navigate("/home")}}
              style={{
                height: "48px",
                width: "340px"
              }}
            />
            {/* <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/home");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button> */}
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/addProduct");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Add Product
            </Button>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Products
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div className="profileimage">
                  <NavbarAvatar fullName={userData.Name} />
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/dashboard");
                }}
              >
                <Typography textAlign="center">DashBoard</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
