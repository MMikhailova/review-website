import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../../assets/logo.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext, useState } from "react";
import { Stack } from "@mui/material";
// import { useLogout } from "../../hooks/useLogOut.js"
import { useAuthContext } from "../../hooks/useAuthContext.js";

const settings = ["Your reviews", "Favorites"];

function NavBar() {
  const { dispatch } = useAuthContext();
  const user = useContext(AuthContext);
  const navigate=useNavigate()
  const handleLogout = async () => {
    try {
      if (user.isGoogleAuth) {
        const res = await axios.post(
          `${import.meta.env.VITE_PROD_BASE_URL}/auth/logout`,
          {
            withCredentials: true,
          }
        );
        if (res.data === "done") {
          window.location.href = "/";
        }
      } else {
        const res = await axios.post(`${import.meta.env.VITE_PROD_BASE_URL}/logout`, {
          withCredentials: true,
        });
        if (res.status !== 200) {
          throw new Error("Failed to log out");
        } else {
          await dispatch({ type: "LOGOUT" });
        }
      }
      } catch (err) {
        console.log(err);
  
    }
  };
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] =useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu =() => {
    setAnchorElNav(null);

  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    const btnText = e.target.innerText
    btnText === "Your reviews" && navigate('/user/reviews')
     btnText === "Favorites" && navigate("/user/favorites");
  };
  

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#345457", boxShadow: "none", pb: 4 }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              backgroundImage: `url(${logo})`,
              backgroundSize: "120%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "200px",
              height: "150px",
            }}
            onClick={()=>navigate("/")}
          ></Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {user.id && <Stack
            direction={"row"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography>
              {user.firstName && user.firstName}{" "}
              {user.lastName && user.lastName}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>

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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={(e) => handleCloseUserMenu(e)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Stack>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
