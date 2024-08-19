import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { signup } from '../../services/authentication';
import theme  from "../../assets/theme";
import Footer from "../../components/footer";
import GlobalNavBar from '../../components/GlobalNavBar';

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
                SIGN UP
            </Typography>
            <Box 
                sx={{ 
                    width: '100vw', 
                    height: 'auto',
                    bgcolor: theme.palette.grey[200], 
                    marginX: 'calc(50% - 50vw)', 
                    paddingY: '1vw', 
                    borderTop: '3px solid black',
                    borderBottom: '3px solid black',
                }}
            >
                <Container className='signup-container' sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ 
                            width: '30vw',
                            bgcolor: theme.palette.yellow.main, 
                            border: '3px solid black',
                            boxShadow: 3,
                            height: 'auto',
                            p: 4,
                            borderRadius: 0,
                            display: 'flex',
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            gap: 2, 
                        }}
                    >
                        <GlobalNavBar />
    
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
                            Sign Up
                        </Button>
                    </Box>
                </Container>
            </Box>
    
            <Footer />
        </>
    );
};