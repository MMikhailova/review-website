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
import { Link, useNavigate } from "react-router-dom";

const InitState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState(InitState);
  const [err, setErr] = useState(null);
  const { signup, error } = useSignUp();
const navigate = useNavigate()
  const handleChange = (e) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(signUpForm.email);
    const isPasswordValid = validatePassword(signUpForm.password);
    const isPasswordMatch = matchPasswords(
      signUpForm.password,
      signUpForm.confirmPassword
    );
    if ((isEmailValid, isPasswordValid, isPasswordMatch)) {
      try {
        await signup(signUpForm);

        setSignUpForm(InitState);
      } catch (error) {
        setErr(error);
      }
    } else {
      setErr("Some data is not valid. Check email or password");
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={signUpForm.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={signUpForm.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={signUpForm.email}
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
                value={signUpForm.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={signUpForm.confirmPassword}
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
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography>
                Already have account? <Button onClick={()=>navigate('/login')}>Log In</Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;



