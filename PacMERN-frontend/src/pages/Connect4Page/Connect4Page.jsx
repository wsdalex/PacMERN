/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import "./Connect4Page.css";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";

const PlayerNameForm = ({ onSubmit }) => {
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (player1Name && player2Name) {
            onSubmit(player1Name, player2Name);
        }
    };

    return (
        <Container maxWidth='sm'>
            <GlobalNavBar />
            <Box my={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Enter Player Names
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin='normal'
                        label='Player 1 Name'
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin='normal'
                        label='Player 2 Name'
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                        required
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        size='large'
                        sx={{ mt: 2 }}
                    >
                        Start Game
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

const Connect4 = () => {
    const width = 7;
    const height = 6;
    const cellCount = width * height;

    const [cells, setCells] = useState(Array(cellCount).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [result, setResult] = useState("");
    const [endOfGame, setEndOfGame] = useState("");
    const [canPlay, setCanPlay] = useState(true);
    const [players, setPlayers] = useState(null);
    const [fallingPiece, setFallingPiece] = useState(null);


    const winArray = [
        [0, 1, 2, 3],
        [41, 40, 39, 38],
        [7, 8, 9, 10],
        [34, 33, 32, 31],
        [14, 15, 16, 17],
        [27, 26, 25, 24],
        [21, 22, 23, 24],
        [20, 19, 18, 17],
        [28, 29, 30, 31],
        [13, 12, 11, 10],
        [35, 36, 37, 38],
        [6, 5, 4, 3],
        [0, 7, 14, 21],
        [41, 34, 27, 20],
        [1, 8, 15, 22],
        [40, 33, 26, 19],
        [2, 9, 16, 23],
        [39, 32, 25, 18],
        [3, 10, 17, 24],
        [38, 31, 24, 17],
        [4, 11, 18, 25],
        [37, 30, 23, 16],
        [5, 12, 19, 26],
        [36, 29, 22, 15],
        [6, 13, 20, 27],
        [35, 28, 21, 14],
        [0, 8, 16, 24],
        [41, 33, 25, 17],
        [7, 15, 23, 31],
        [34, 26, 18, 10],
        [14, 22, 30, 38],
        [27, 19, 11, 3],
        [35, 29, 23, 17],
        [6, 12, 18, 24],
        [28, 22, 16, 10],
        [13, 19, 25, 31],
        [21, 15, 9, 3],
        [20, 26, 32, 38],
        [36, 30, 24, 18],
        [5, 11, 17, 23],
        [37, 31, 25, 19],
        [4, 10, 16, 22],
        [2, 10, 18, 26],
        [39, 31, 23, 15],
        [1, 9, 17, 25],
        [40, 32, 24, 16],
        [9, 17, 25, 33],
        [8, 16, 24, 32],
        [11, 17, 23, 29],
        [12, 18, 24, 30],
        [1, 2, 3, 4],
        [5, 4, 3, 2],
        [8, 9, 10, 11],
        [12, 11, 10, 9],
        [15, 16, 17, 18],
        [19, 18, 17, 16],
        [22, 23, 24, 25],
        [26, 25, 24, 23],
        [29, 30, 31, 32],
        [33, 32, 31, 30],
        [36, 37, 38, 39],
        [40, 39, 38, 37],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 16, 23, 30],
        [10, 17, 24, 31],
        [11, 18, 25, 32],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
    ];

    const handlePlayerNames = (player1Name, player2Name) => {
        setPlayers({
            1: { className: "player1", name: player1Name },
            2: { className: "player2", name: player2Name },
        });
    };

    const gridClick = (index) => {
        if (canPlay && !cells[index]) {
            let lastIndex;
            for (let i = index % width; i < cellCount; i += width) {
                if (!cells[i]) {
                    lastIndex = i;
                }
            }

            if (lastIndex !== undefined) {
                const newCells = [...cells];
                newCells[lastIndex] = currentPlayer;
                
                // Calculate the number of rows the piece needs to fall
                const rowsToFall = Math.floor(lastIndex / width);
                
                // Set the falling piece
                setFallingPiece({
                    player: currentPlayer,
                    column: lastIndex % width,
                    fallHeight: rowsToFall * 100
                });
                
                // Remove the falling piece after animation completes
                setTimeout(() => {
                    setFallingPiece(null);
                    setCells(newCells);
                    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
                    checkBoard(newCells);
                }, 500); // This should match the CSS animation duration
            }
        }
    };

    const checkBoard = (currentCells) => {
        for (let i = 0; i < winArray.length; i++) {
            const [a, b, c, d] = winArray[i];
            if (
                currentCells[a] &&
                currentCells[a] === currentCells[b] &&
                currentCells[a] === currentCells[c] &&
                currentCells[a] === currentCells[d]
            ) {
                setResult(`${players[currentCells[a]].name} Wins!`);
                setEndOfGame("Press restart to play again");
                setCanPlay(false);
                return;
            }
        }
    };

    const restartGame = () => {
        setCells(Array(cellCount).fill(null));
        setCurrentPlayer(1);
        setResult("");
        setEndOfGame("");
        setCanPlay(true);
    };

    if (!players) {
        return <PlayerNameForm onSubmit={handlePlayerNames} />;
    }

    return (
        <div className='connect4-game'>
            <GlobalNavBar />
                        <div className='grid-wrapper'>
                <div id='grid'>
                    {cells.map((cell, index) => (
                        <div
                            key={index}
                            onClick={() => gridClick(index)}
                            className={
                                cell
                                    ? `playerpiece ${players[cell].className}`
                                    : ""
                            }
                        />
                    ))}
                    {fallingPiece && (
                        <div 
                            className={`falling-piece ${players[fallingPiece.player].className}`}
                            style={{
                                left: `${fallingPiece.column * 100}px`,
                                '--fall-height': `${fallingPiece.fallHeight}px`
                            }}
                        />
                    )}
                </div>
            </div>
            <div id='text'>
                <h1>CONNECT 4</h1>
                <div id='result'>{result}</div>
                {canPlay && (
                    <p id='playersturn'>
                        <span id='playerturn'>
                            {players[currentPlayer].name}
                        </span>
                        &apos;s turn!
                    </p>
                )}
                <p id='endofgame'>{endOfGame}</p>
                <button onClick={restartGame}>Restart</button>
            </div>
            <Footer/>
        </div>
    );
};

export default Connect4;
