import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom"; 
import {useAuth} from '../App';
const axios = require("axios");

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {


    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
    // console.log("auth", auth)
  //Store value input for email id:
  const [inputUsername, setInputUsername] = React.useState("");
  //Store value input for password:
  const [inputPassword, setInputPassword] = React.useState("");

// fetch db SignIn backend
async function fetchSignin() {
  try {

    if (inputUsername && inputPassword === "") {
      alert("Must enter username & password!");
      return;
    }

    // const response = await axios.get("http://localhost:8080/api/books/author/");

    const data = JSON.stringify({
      "username": inputUsername,
      "password": inputPassword,
    });
    console.log(data);
    var config = {
      method: "post",
      url: "http://localhost:8080/api/auth/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    auth.signin(response.data.user)
    console.log("After auth", auth)
    console.log("Login succesfull, response data: ", response.data);
    navigate ("/");

    // setVerifySignIn(response.data);
  } catch (error) {
    console.error(error);
    alert("Can't login");
  }
}


const submitSignIn = () => {
  // alert("Submit Find Book")
  if (inputUsername && inputPassword === "") {
    alert("No value input");
    return;
  }
  console.log(inputUsername);
  console.log(inputPassword);

  // make AIP call function fetchBook
  //  const result = fetchBook()
  fetchSignin();
};
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={(changeEvent) => {
                setInputUsername(changeEvent.target.value);
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(changeEvent) => {
                setInputPassword(changeEvent.target.value);
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={() => submitSignIn()}
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
