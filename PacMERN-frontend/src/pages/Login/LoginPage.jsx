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
        component="h1" // Ensures the semantic element is a heading (h1)
        role="heading" // Explicitly declares the element as a heading for screen readers
        aria-level="1" // Specifies the heading level (level 1 for the main page heading)
        sx={{
          fontFamily: theme.typography.fontFamily,
          textAlign: 'center',
          mb: 3,
          color: theme.palette.text.primary,
        }}
        id="login-heading"
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
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <GlobalNavBar />

            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              aria-required="true"
              aria-describedby="email-help-text email-error"
              aria-labelledby="email-label"
              aria-invalid={errors ? 'true' : 'false'}
            />
            <div id="email-help-text" style={{ display: 'none' }}>
              Enter your email address.
            </div>
            {errors && (
              <div
                id="email-error"
                style={{ color: 'red' }}
                role="alert"
                aria-live="assertive"
              >
                {errors}
              </div>
            )}

            {/* Password Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              aria-required="true"
              aria-describedby="password-help-text password-error"
              aria-labelledby="password-label"
              aria-invalid={errors ? 'true' : 'false'}
            />
            <div id="password-help-text" style={{ display: 'none' }}>
              Password entered incorrectly.
            </div>
            {errors && (
              <div
                id="password-error"
                style={{ color: 'red' }}
                role="alert"
                aria-live="assertive"
              >
                {errors}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                border: '3px solid black',
                borderRadius: 0,
                fontSize: 20,
                bgcolor: theme.palette.background.default,
                boxShadow: '-10px 8px 12px rgba(0, 0, 0, 0.2)',
                '&:focus': {
                  outline: '3px solid blue',  // Adding clear focus outline for keyboard users
                },
                '&:hover': {
                  backgroundColor: '#D3D3D3',
                  border: '3px solid black',
                  color: '#000099',
                },
                color: theme.palette.text.primary,
              }}
              aria-label="Sign In"
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
                    {"DON'T HAVE AN ACCOUNT? SIGN UP!"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
        {errors && (
          <p
            className='error-message'
            style={{ color: 'red', fontFamily: theme.typography.fontFamily }}
            role="alert"
            aria-live="assertive"
          >
            {errors}
          </p>
        )}
      </Box>
      <Footer />
    </>
  );
};


