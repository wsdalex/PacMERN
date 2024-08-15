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
       <Typography 
        variant="body2" 
        sx={{ 
          mt: 1, 
          color: theme.palette.red.main, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '1rem'
        }}
      >
        PACMERN PRODUCTIONS 
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 1, 
          color: theme.palette.red.main, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '10px'
        }}
      >
        <img src={Pacman} alt="pacman icon" style={{ width: '15px', height: '15px', marginRight: '5px' }}/>
        <span style={{ color: 'black' }}>POLLY</span><img src={Pacman} alt="pacman icon" style={{ width: '15px', height: '15px', marginRight: '5px', marginLeft: '50px' }}/>
        <span style={{ color: 'black' }}>ABDALLAH</span><img src={Pacman} alt="pacman icon" style={{ width: '15px', height: '15px', marginRight: '5px', marginLeft: '50px' }}/>
        <span style={{ color: 'black' }}>KARINA</span><img src={Pacman} alt="pacman icon" style={{ width: '15px', height: '15px', marginRight: '5px', marginLeft: '50px' }}/>
        <span style={{ color: 'black' }}>WILL</span><img src={Pacman} alt="pacman icon" style={{ width: '15px', height: '15px', marginRight: '5px', marginLeft: '50px' }}/>
        <span style={{ color: 'black' }}>ROBERT</span><img src={Pacman} alt="pacman icon" style={{ width: '15px', height: '15px', marginRight: '5px', marginLeft: '50px' }}/>
        <span style={{ color: 'black' }}>JOSH</span>
      </Typography>
    </Box>
  );
};

export default Footer;

