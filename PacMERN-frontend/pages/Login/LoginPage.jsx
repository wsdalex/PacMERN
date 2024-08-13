import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Box, TextField, Grid, Button } from "@mui/material";
import { login } from "../../src/services/authentication";
import "./LoginPage.css";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Validation that checks if the email and password are valid
    const validateInputs = () => {
        const inputErrors = {
            email: validateEmail(email),
            password: validatePassword(password)
        };
        setErrorMessage(inputErrors);

        // Check if there are any errors
        for (let field in inputErrors) {
            if (inputErrors[field] !== "") {
                return false; // Found an error, inputs are not valid
            }
        }
        return true; // No errors found, all inputs are valid
    };
    
    const validateEmail = (email) => {
        if (!email) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(email)) return "Email is not valid";
        return "";
    };
    
    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters"; // however many characters
        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validation function used here
        if (validateInputs()) {
            try {
                const session = await login(email, password);
                const { token, user } = session;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                console.log("logged in user's token -> " + token);
                navigate("/posts");
            } catch (err) {
                console.error(err);
                // Argument is passed to setErrorMessage. It is an object with a single property called submit. This error state is to handle any different types of errors that may occur during the login process.
                // err.message is the error message caught in the try catch block. It can also be one from the backend if the request fails.
                // Then using truthy or falsy values, we can display the error message to the user.
                setErrorMessage({ submit: err.message || "Login failed. Please try again."});
            }
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
            <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    onChange={handleEmailChange}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    onChange={handlePasswordChange}
                />
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
                        <Link href='#' variant='body2'>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Container>
    );
};
