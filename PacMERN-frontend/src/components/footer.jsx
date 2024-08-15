// src/components/Footer.js

import { Box, Typography } from '@mui/material';
import PacmanRow from './Pacman'; // Ensure this is the correct import

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
        backgroundColor: 'primary.main',
        color: 'text.primary',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2" sx={{ mt: 1 }}>
        PACMERN PRODUCTIONS
      </Typography>
    </Box>
  );
};

export default Footer;

