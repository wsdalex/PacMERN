import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import theme from '../assets/theme';
import { Typography } from '@mui/material';

export default function FixedContainer({ children }) {
    return (
        <>
        <Box 
       sx={{ 
        width: '100vw', 
        height: "10vw",
        bgcolor: theme.palette.primary.main, 
        marginX: 'calc(50% - 50vw)', 
        textAlign: "center",
        display: 'flex', 
        paddingY: '10vw', 
        justifyContent: 'space-evenly', //horizontally
        alignItems: 'center', //vertically
        borderTop: '3px solid black',
        borderBottom: '3px solid black'
     }}> 
        <Container maxWidth="lg" 
        sx={{ 
            display: 'flex', 
            justifyContent: 'space-evenly', 
            alignItems: 'center',
            flexDirection: {xs: "column", md: "row"}
         }}>
        {children}
        </Container>
        </Box>
        </>
);
}