import { Box, Typography } from '@mui/material';
import Footer from '../../components/footer';
import theme from '../../assets/theme';
import GlobalNavBar from '../../components/GlobalNavBar';

const SnakeGame = () => {
    return (
      <>
        <GlobalNavBar />
        <Typography
            variant="h5"
            sx={{ 
              fontFamily: theme.typography.retro, 
              textAlign: 'center', 
              mb: 3, 
              color: theme.palette.text.primary,
            }}
          >
            SNAKE
          </Typography>
      
            <Box 
          sx={{ 
            width: '100vw', 
            height: 'auto',
            bgcolor: theme.palette.primary.main, 
            display:'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginX: 'calc(50% - 50vw)', 
            paddingY: '5vw', 
            borderTop: '3px solid black',
            borderBottom: '3px solid black',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '600px',
              width: '600px',
              bgcolor: theme.palette.background.default, 
            }}
          >
            <iframe
              src="/Snake.html" 
              style={{
                width: '95%',
                height: '95%',
                border: '0px',
                borderRadius: '0px',
              }}
              title="Snake Game"
            />
          </Box>
          <Footer />
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontFamily: theme.typography.retro,
            color: theme.palette.text.primary,
            textAlign: "centre",
            marginBottom: 4,
          }}
        >
          Click inside of box and use arrow keys to play
        </Typography>
      </>
    );
  };
  
  export default SnakeGame;
