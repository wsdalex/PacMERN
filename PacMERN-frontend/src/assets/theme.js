import { createTheme } from "@mui/material/styles";

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
      main: "#E60000", // Red 
    },
    background: {
      default: '#FFFFFF', // White
      paper: '#FFFFFF',  // White
    },
    text: {
      primary: "#000099", // Blue
      secondary: "#FFFFFF", // White
    },
  },
  typography: {
    fontFamily: "NintendoFont, Arial, sans-serif", // default font family
    retro: {
        fontFamily: "RetroFont", // custom retro font family
    },
},


  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'normal',
        fullWidth: true,
        required: true,
        InputLabelProps: {
          shrink: true,
          sx: {
            bgcolor: (theme) => theme.palette.background.default,
            border: '3px solid black',
            borderRadius: 0,
            color: (theme) => theme.palette.text.primary,
            paddingX: 1,
            '&.Mui-focused': {
              color: (theme) => theme.palette.text.primary,
            },
          },
        },
        InputProps: {
          sx: {
            bgcolor: (theme) => theme.palette.background.default,
            borderRadius: 0,
            border: '3px solid black',
            boxShadow: 3,
            color: (theme) => theme.palette.text.primary,
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },
        },
      },
    },
  },
});

export default theme;



