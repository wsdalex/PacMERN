import { Box, Container, Paper, Typography } from "@mui/material";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import theme from "../../assets/theme";
import { GameCard } from "../../components/GameCard";
import FixedContainer from "../../components/Container";


const gameData = [
    {
        name: "SNAKE",
        img: "https://tilcode.blog/wp-content/uploads/2019/04/Screen-Shot-2019-04-28-at-17.51.16.png",
        description: "AS SEEN ON NOKIA 3210!",
        colour: theme.palette.yellow.main,
        path: "/snakepage"

    },
    {
        name: "CONNECTIONS",
        img: "data:image/png;base64,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",
        description: "A TOTALLY ORIGINAL GAME!",
        colour: theme.palette.green.main,
        path: "/connections"

    },
    {
        name: "NEXT GAME",
        img: "https://m.media-amazon.com/images/I/41fO8fe8WdL.png",
        description: "THIS IS THE DESCRIPTION",
        colour: theme.palette.red.main,
        path: "/snakegame"

    },
]

export const GamePage = () => {
    return (
        <>
            <GlobalNavBar />
            <Typography variant="h4" 
                    sx={{ 
                        color: "black",
                        fontFamily: `${theme.typography.retro.fontFamily}`,
                        marginBottom: 4, // Adds space between the heading and game cards
                        textAlign: 'center', // Centers the heading text
                    }}
                >
                    Choose a game!
                </Typography>
            <FixedContainer 
                maxWidth={false} 
                disableGutters 
                sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    width: '100%', // Ensures the container fills the screen width
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: 4,
                    flexDirection: 'column', // Adds padding at the top and bottom
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
        path={game.path}
    />
))}

                </Box>
            </FixedContainer>
            <Footer />
        </>
    );
};
