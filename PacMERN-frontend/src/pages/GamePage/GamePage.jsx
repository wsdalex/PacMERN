import { Box, Container, Paper, Typography } from "@mui/material";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import theme from "../../assets/theme";
import { GameCard } from "../../components/GameCard";


const gameData = [
    {
        name: "DVD Arcade",
        img: "https://m.media-amazon.com/images/I/41fO8fe8WdL.png",
        description: "This the description",
        colour: theme.palette.yellow.main,

    },
    {
        name: "DVD Arcade",
        img: "https://m.media-amazon.com/images/I/41fO8fe8WdL.png",
        description: "This the description",
        colour: theme.palette.green.main,

    },
    {
        name: "DVD Arcade",
        img: "https://m.media-amazon.com/images/I/41fO8fe8WdL.png",
        description: "This the description",
        colour: theme.palette.red.main,

    },
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
                    {gameData.map(game => (
    <GameCard 
        key={game.name} 
        name={game.name} 
        image={game.img} 
        description={game.description} 
        colour={game.colour} 
    />
))}

                </Box>
            </Container>
            <Footer />
        </>
    );
};
