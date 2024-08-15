import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Box, TextField, Grid, Button } from "@mui/material";
import { login } from "../../services/authentication";
import "./LoginPage.css";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import theme  from "../../assets/theme";


export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const session = await login(email, password);
            const token = session.token;
            const user = session.user;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            console.log("logged in user's token -> " + token);
            navigate("/profile");
        } catch (err) {
            console.error(err);
            setErrors(err.message);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Container className='login-container'>
  <GlobalNavBar/>
  <Box
    component='form'
    onSubmit={handleSubmit}
    noValidate
    sx={{ 
      bgcolor: theme.palette.yellow.main, 
      border: '3px solid black',
      boxShadow: 3,
      height: 'auto',
      mt: 3,
      p: 8,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column', // Arrange items in a column
      alignItems: 'center', // Center items horizontally
      gap: 2, // Add gap between items
    }}
  >
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      onChange={handleEmailChange}
      InputLabelProps={{
        sx: {
          color: theme.palette.text.primary, // Apply color to the label
          '&.Mui-focused': {
            color: theme.palette.text.primary, // Ensure color remains blue when focused
          },
          '&.MuiFormLabel-root': {
            color: theme.palette.text.primary, // Ensure color is blue in normal state
          }
        },
        shrink: true,
      }}
    />
    {errors && <p className='error-message'>{errors.email}</p>}
    <TextField
      variant="outlined"
      margin='normal'
      required
      fullWidth
      name='password'
      label='Password'
      type='password'
      id='password'
      autoComplete='current-password'
      onChange={handlePasswordChange}
      InputLabelProps={{
        sx: {
          color: theme.palette.text.primary, // Apply color to the label
          '&.Mui-focused': {
            color: theme.palette.text.primary, // Ensure color remains blue when focused
          },
          '&.MuiFormLabel-root': {
            color: theme.palette.text.primary, // Ensure color is blue in normal state
          }
        },
        shrink: true,
      }}
    />
    {errors && <p className='error-message'>{errors.password}</p>}
    <Button
      type='submit'
      fullWidth
      variant='contained'
      sx={{ mt: 3, mb: 2 }}
    >
      Sign In
    </Button>
    <Grid container justifyContent="flex-end">
      <Grid item>
        <Link to='/signup' variant='body2'>
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </Grid>
  </Box>
  {errors && <p className='error-message'>{errors}</p>}
  <Footer/>
</Container>

    );
};
