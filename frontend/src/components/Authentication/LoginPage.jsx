import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import validateEmail from "../../utils/validateEmail.js";
import validatePassword from "../../utils/validatePassword.js";
import matchPasswords from "../../utils/checkMatch.js";
import { useSignUp } from "../../hooks/useSignUp.js";
import { useNavigate } from "react-router-dom";

const InitState = {
  email: "",
  password: ""
};

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(InitState);
  const [err,setErr] =useState(null)
  const {login,error} = useSignUp();
const navigate =useNavigate()
  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignUp = async (event) => {
     event.preventDefault();
   const isEmailValid = validateEmail(loginForm.email);
        const isPasswordValid = validatePassword(loginForm.password);
       
        if ((isEmailValid, isPasswordValid)) {
            try {
                await  login(loginForm)

                setLoginForm(InitState);
            } catch (error) {
              setErr(error)
            }
        } else {
            setErr(
                'Some data is not valid. Check email or password'
            );
        }
    };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={loginForm.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={loginForm.password}
                onChange={handleChange}
              />
            </Grid>
            {err && <div>{err}</div>}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography>
                Don't have account? <Button onClick={()=>navigate('/signup')}>Sign Up</Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage
