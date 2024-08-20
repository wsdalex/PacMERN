import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Box, TextField, Grid, Button } from "@mui/material";
import { login } from "../../services/authentication";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import theme  from "../../assets/theme";
import { Typography } from '@mui/material';

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
            navigate("/games");
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
      <>
        <Typography
      variant="h4"
      sx={{ 
        fontFamily: theme.typography.fontFamily, 
        textAlign: 'center', 
        mb: 3, 
        color: theme.palette.text.primary,
      }}
    >
      LOG IN
    </Typography>
        <Box 
          sx={{ 
            width: '100vw', 
            height: 'auto',
            bgcolor: theme.palette.primary.main, 
            marginX: 'calc(50% - 50vw)', 
            paddingY: '5vw', 
            borderTop: '3px solid black',
            borderBottom: '3px solid black',
          }}
        >
          <Container className='login-container' sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ 
                bgcolor: theme.palette.green.main, 
                border: '3px solid black',
                boxShadow: 3,
                height: 'auto',
                p: 8,
                borderRadius: 0,
                display: 'flex',
                flexDirection: 'column', // Arrange items in a column
                alignItems: 'center', // Center items horizontally
                gap: 2, // Add gap between items
              }}
            >
              <GlobalNavBar/>
              <TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="email"
  label="Email"
  name="email"
  autoComplete="email"
  autoFocus
  onChange={handleEmailChange}
/>
{errors && <p className='error-message'>{errors.password}</p>}

<TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  name="password"
  label="Password"
  type="password"
  id="password"
  autoComplete="current-password"
  onChange={handlePasswordChange}
/>
{errors && <p className='error-message'>{errors.password}</p>}

<Button
  type='submit'
  fullWidth
  variant='outlined'
  sx={{ 
    mt: 3, 
    mb: 2,
    border: '3px solid black',
    borderRadius: 0,
    bgcolor: theme.palette.background.default, 
    boxShadow: 3,
    color: theme.palette.text.primary, 
  }}
>
  Sign In
</Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <Link 
                      to='/signup' 
                      style={{
                        color: theme.palette.text.primary,
                        textDecoration: 'underline',
                        fontWeight: 'bold',
                      }}
                    >
                      {"Don't have an account? Sign up"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {errors && <p className='error-message'>{errors}</p>}
          </Container>
        </Box>
        <Footer/>
      </>
    );
};
