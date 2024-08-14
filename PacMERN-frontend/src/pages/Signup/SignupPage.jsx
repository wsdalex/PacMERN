import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import { signup } from '../../services/authentication';

export const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
    
        if (!isValidEmail(email)) {
            setErrorMessage('Invalid email address format');
            return;
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
        } else if (!name) {
            setErrorMessage('Name is required');
        } else {
            try {
                await signup(name, email, password, profileImage);
                navigate('/login');
            } catch (err) {
                console.error(err);
                setErrorMessage(err.message);
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form onSubmit={handleSubmit} noValidate> 
                {/* noValidate is a boolean attribute that indicates that the form data should not be validated on submission. Helped with testing */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Profile Image URL (optional)"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
            {errorMessage && (
                <Typography color="error" role="alert" data-testid="error-message">
                    {errorMessage}
                </Typography>
            )}
        </Container>
    );
};