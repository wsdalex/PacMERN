import { Box, Container, Paper, Typography } from "@mui/material";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import theme from "../../assets/theme";


const gameData = [
    {
        name: "DVD Arcade",
        img: "https://m.media-amazon.com/images/I/41fO8fe8WdL.png",
        
    }
]

export const GamePage = () => {
    return (
        <>
            <GlobalNavBar />
            <Container 
                maxWidth={false} 
                disableGutters 
                sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    width: '100%', // Ensures the container fills the screen width
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: 4, // Adds padding at the top and bottom
                }}
            >
                <Box 
                    sx={{
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "space-between", 
                        gap: 4,
                        width: '80%', // Adjust this value to occupy more or less width
                        padding: 4, // Optional: add padding for better spacing
                    }}
                >
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            backgroundColor: `${theme.palette.yellow.main}`,
                            flexGrow: 1,
                            textAlign: 'center',
                            padding: 2,
                        }}
                    >
                        <Typography variant="h4">DVD Game</Typography>
                        <img 
                            src="https://imageio.forbes.com/specials-images/imageserve/618ed11bde61f1b9de93c0c6/The-space-themed-multidirectional-shooter-arcade-game--Asteroids--/960x0.jpg?format=jpg&width=960" 
                            alt="DVD Game" 
                            style={{ 
                                maxWidth: '100%', // Ensures the image fits within the container width
                                height: 'auto', // Maintains aspect ratio
                                maxHeight: '200px', // Optional: Limit the height to prevent it from being too tall
                            }}
                        />
                        <Typography>
                            Yep you got that right. Skyrim running in the browser written in JS. Trust us, it works.
                        </Typography>
                    </Paper>
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            backgroundColor: `${theme.palette.green.main}`,
                            flexGrow: 1,
                            textAlign: 'center',
                            padding: 2,
                        }}
                    >
                        <Typography variant="h4">Mario Game</Typography>
                        <img 
                            src="https://imageio.forbes.com/specials-images/imageserve/618ed11bde61f1b9de93c0c6/The-space-themed-multidirectional-shooter-arcade-game--Asteroids--/960x0.jpg?format=jpg&width=960" 
                            alt="Mario Game" 
                            style={{ 
                                maxWidth: '100%', // Ensures the image fits within the container width
                                height: 'auto', // Maintains aspect ratio
                                maxHeight: '200px', // Optional: Limit the height to prevent it from being too tall
                            }}
                        />
                        <Typography>
                            Yep you got that right. Skyrim running in the browser written in JS. Trust us, it works.
                        </Typography>
                    </Paper>
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            backgroundColor: 'red.main',
                            flexGrow: 1,
                            textAlign: 'center',
                            padding: 2,
                        }}
                    >
                        <Typography variant="h4">Skyrim</Typography>
                        <img 
                            src="https://imageio.forbes.com/specials-images/imageserve/618ed11bde61f1b9de93c0c6/The-space-themed-multidirectional-shooter-arcade-game--Asteroids--/960x0.jpg?format=jpg&width=960" 
                            alt="Skyrim" 
                            style={{ 
                                maxWidth: '100%', // Ensures the image fits within the container width
                                height: 'auto', // Maintains aspect ratio
                                maxHeight: '200px', // Optional: Limit the height to prevent it from being too tall
                            }}
                        />
                        <Typography>
                            Yep you got that right. Skyrim running in the browser written in JS. Trust us, it works.
                        </Typography>
                    </Paper>
                </Box>
            </Container>
            <Footer />
        </>
    );
};
