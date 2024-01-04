import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useReducer, useState } from "react";
import { AuthData } from '../auth/AuthWrapper';
import BackgroundImage from '../images/BackgroundImage ';





const defaultTheme = createTheme();

export default function SignIn() {

  const { login } = AuthData();
  // const [formData, setFormData] = useReducer(
  //   (formData, newItem) => {
  //     return { ...formData, ...newItem };
  //   },
  //   { userName: "", password: "" }
  // );
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const doLogin = async () => {
    try {
      await login(formData.userName, formData.password);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
       <BackgroundImage/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              height: "100vh",
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: "center"
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="İstifadəçi adı"
                name="userName"
                autoComplete="userName"
                value={formData.userName}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Şifrə"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={doLogin}
              >
                Daxil ol
              </Button>
              {errorMessage ? <div className="error">{errorMessage}</div> : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}