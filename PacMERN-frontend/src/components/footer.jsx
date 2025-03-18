// src/components/Footer.js
import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Pacman from '../assets/images/pacman.png';
import theme from '../assets/theme';

const Footer = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const names = ['POLLY', 'ABDALLAH', 'KARINA', 'WILL', 'ROBERT', 'JOSH'];

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        padding: '0.5rem',
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
          mt: 0.5, 
          color: theme.palette.red.main, 
          fontSize: { xs: '0.8rem', sm: '1rem' }
        }}
      >
        PACMERN PRODUCTIONS 
      </Typography>
      <Box 
        sx={{ 
          mt: 0.5, 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: '0.5rem', sm: '1rem' }
        }}
      >
        {names.map((name, index) => (
          <Typography 
            key={name}
            variant="body2" 
            sx={{ 
              color: 'black', 
              fontSize: { xs: '8px', sm: '10px' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img 
              src={Pacman} 
              alt="pacman icon" 
              style={{ 
                width: isMobile ? '10px' : '15px', 
                height: isMobile ? '10px' : '15px', 
                marginRight: '3px' 
              }}
            />
            {name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
