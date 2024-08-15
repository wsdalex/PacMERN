
import { createTheme } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: "#D3D3D3", // Grey
    },
    yellow: {
      main: "#FFC001", // Yellow
    },
    green: {
      main: "#069330", // Green
    },
    red: {
      main: "#ff2d1e", // Red
    },
    background: {

      default: '#F5F5F5', // Gray
      paper: '#FFFFFF',  // White (corrected typo)
    },
    text: {
      primary: "#000099", // Blue
      secondary: '#FFFFFF', // White


      default: '#FFFFFF', // WHITE
      paper: "'#FFFFFF'",  // White

    },
    text: {
      primary: "#000099", // Blue
      secondary: "#FFFFFF", // White

    },


  typography: {
    fontFamily: "NintendoFont",
    retro: "RetroFont",
  },
  }
});

export default theme;
