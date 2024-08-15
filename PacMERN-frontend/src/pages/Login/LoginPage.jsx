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
                sx={{ bgcolor: theme.palette.yellow.main, 
                    height: '60vh',
                    mt: 1,
                    p: 3,
                    borderRadius: 2 }}
            >
                <TextField
                    variant="outlined" // This ensures the field has an outline
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
                        position: 'relative', // Position the label relative to its normal flow
                        top: '8px', // Adjust the label's position to sit above the input box
                        fontSize: '2rem', // Increase font size if needed for visibility
                        paddingBottom: '-3px', // Optional: Add padding to space it from the input box
                    },
                    shrink: true, // Keep this to ensure the label doesn't move when there's content in the input
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
                            position: 'relative', // Position the label relative to its normal flow
                            top: '8px', // Adjust the label's position to sit above the input box
                            fontSize: '2rem', // Increase font size if needed for visibility
                            paddingBottom: '-3px', // Optional: Add padding to space it from the input box
                        },
                        shrink: true, // Keep this to ensure the label doesn't move when there's content in the input
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
                <Grid container>
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
