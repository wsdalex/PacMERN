import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import theme from '../assets/theme';
import { Typography } from '@mui/material';

export default function YellowBox({ children }) {
    return (
        <>
        <Box 
       sx={{ 
        width: '25vw', 
        height: '15vw',
        bgcolor: theme.palette.yellow.main,  
        textAlign: "center",
        display: "flex",
        border: '3px solid black',
        boxSizing: 'border-box',
     }}> 
            <Container maxWidth="lg" 
            sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '15rem', 
            boxShadow: '-10px 8px 12px rgba(0, 0, 0, 0.2)' }}>
                {children}
            </Container>
        </Box>
        </>
);
}