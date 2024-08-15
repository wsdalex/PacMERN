// src/components/Footer.js

import { Box, Typography } from '@mui/material';
import theme from '../assets/theme';
import Pacman from '../assets/images/pacman.png'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        padding: '1rem',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        color: 'text.primary',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2" sx={{ mt: 1, color: theme.palette.red.main, marginBottom: "0px"}}>
      <img src={Pacman} alt="pacman icon"  style={{ marginBottom: "0px", width: '15px', height: '15px', marginLeft: '8px' }}/>
      <img src={Pacman} alt="pacman icon"  style={{ marginBottom: "0px", width: '15px', height: '15px', marginLeft: '30px' }}/>
      <img src={Pacman} alt="pacman icon"  style={{ marginBottom: "0px", width: '15px', height: '15px', marginLeft: '30px', marginRight: "40px" }}/>
        PACMERN PRODUCTIONS
        <img src={Pacman} alt="pacman icon"  style={{ marginBottom: "0px", width: '15px', height: '15px', marginLeft: '40px' }}/>
        <img src={Pacman} alt="pacman icon"  style={{ marginBottom: "0px", width: '15px', height: '15px', marginLeft: '30px' }}/>
        <img src={Pacman} alt="pacman icon"  style={{ marginBottom: "0px", width: '15px', height: '15px', marginLeft: '30px' }}/>
      </Typography>
    </Box>
  );
};

export default Footer;

