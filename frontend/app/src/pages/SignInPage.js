import { useState, useContext } from "react"
import { signIn } from "../services/authService";
import Cookies from "js-cookie";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Container, Box , CssBaseline, Typography, Button, Alert } from "@mui/material";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const {setIsSignedIn, setCurrentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password
    }
    return signUpParams;
  }

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    try{
      const res = await signIn(params);
      console.log(res);

      if(res.status === 200){
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");

      }
    }catch (e){
      setAlertMessageOpen(true);
    }
  }

  return(
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {alertMessageOpen && <Alert severity="error">Invalid emai or password</Alert>}
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignInSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>    
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}