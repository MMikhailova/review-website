import { useNavigate } from "react-router-dom";
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
import { useAuthContext } from "../../hooks/useAuthContext.js";

const settings = ["Your reviews", "Favorites"];

function NavBar() {
  const { dispatch } = useAuthContext();
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      if (user.isGoogleAuth) {
        const res = await axios.post(
          `${import.meta.env.VITE_PROD_BASE_URL}/auth/logout`,
          null,
          {
            withCredentials: true,
          }
        );
        if (res.data === "done") {
          dispatch({ type: "LOGOUT" });
        }
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_PROD_BASE_URL}/logout`,
          null,
          {
            withCredentials: true,
          }
        );
        if (res.status !== 200) {
          throw new Error("Failed to log out");
        } else {
          dispatch({ type: "LOGOUT" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    const btnText = e.target.innerText;
    btnText === "Your reviews" && navigate("/user/reviews");
    btnText === "Favorites" && navigate("/user/favorites");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        backgroundColor: "#345457",
        boxShadow: "none",
        alignItems: "center",
        width: "100%",
        height: "15vh",
        p: { xs: 0.5, md: 2 },
      }}
    >
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 0,
            height: "100%",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${logo})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: { xs: "100px", md: "200px" },
              height: { xs: "100%", md: "100%" },
            }}
            onClick={() => navigate("/")}
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

          {user.id && (
            <Stack
              direction={"row"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="subtitle1">
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
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
