import { useContext } from "react"
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";
import { signOut } from "../../services/authService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginButton from "../Auth/Auth0LoginButton";

export const Header = () => {
  const { isSignedIn , setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOutSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await signOut();
      console.log(res);
      if(res.data.success === true){
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false);

        navigate("/signin");
      }
    }catch (e){
      console.log(e);
    }
  }

  const AuthButtons = () => {
    if (isSignedIn) {
      return(
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignOutSubmit}
        >
          Sign out
        </Button>
      )
    }else{
      return(
        <>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/signin"
        >
          Sign in
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="signup"
        >
          Sign up
        </Button>
        <LoginButton>
          Auth0
        </LoginButton>
        </>
      )
    }
  }

  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={Link} sx={{ flexGrow: 1 }} to="/">
            AuthTest
          </Typography>
          <AuthButtons/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}