import { useState, useEffect } from "react";
import { Grid, CardContent, Typography, Card, Box } from "@mui/material";
import theme from "../../assets/theme";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";

const solutions = [
  ["Apple", "Banana", "Cherry", "Peach"],       // Fruits
  ["Lion", "Tiger", "Bear", "Wolf"],            // Animals
  ["Hammer", "Screwdriver", "Wrench", "Pliers"],// Tools
  ["Car", "Truck", "Bike", "Bus"]               // Vehicles
];

const words = [
  "Apple", "Banana", "Cherry", "Peach",
  "Lion", "Tiger", "Bear", "Wolf",
  "Hammer", "Screwdriver", "Wrench", "Pliers",
  "Car", "Truck", "Bike", "Bus"
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffledWords = shuffle([...words]);

export const ConnectionsGame = () => {
  const [clickedCards, setClickedCards] = useState(Array(words.length).fill(false));
  const [currentSelection, setCurrentSelection] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [removedCards, setRemovedCards] = useState([]);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const handleCardClick = (index) => {
    const selectedWord = shuffledWords[index];

    if (removedCards.includes(selectedWord)) {
      return; // Ignore clicks on already removed cards
    }

    let newClickedCards = [...clickedCards];
    let newSelection = [...currentSelection];

    if (clickedCards[index]) {
      // If the card was already clicked, unselect it
      newClickedCards[index] = false;
      newSelection = newSelection.filter(word => word !== selectedWord);
    } else {
      // If less than 4 cards are selected, allow new selection
      if (newSelection.length < 4) {
        newClickedCards[index] = true;
        newSelection.push(selectedWord);
      }
    }

    if (newSelection.length === 4) {
      const match = solutions.find((solution) =>
        solution.every((word) => newSelection.includes(word))
      );

      if (match) {
        // Correct group
        setSolvedGroups([...solvedGroups, match]);
        setTimeout(() => {
          setRemovedCards([...removedCards, ...match]);
        }, 1000); // Delay before removal

        setCurrentSelection([]);
        setClickedCards(Array(words.length).fill(false));
      } else {
        // Wrong group
        alert("Incorrect! Try again.");
        setCurrentSelection([]);
        setClickedCards(Array(words.length).fill(false));
      }
    } else {
      setClickedCards(newClickedCards);
      setCurrentSelection(newSelection);
    }
  };

  useEffect(() => {
    if (solvedGroups.length === solutions.length) {
      setIsGameComplete(true);
    }
  }, [solvedGroups]);

  return (
    <>
    <GlobalNavBar/>
    <Box sx={{ padding: 4 }}>
      {isGameComplete && (
        <Box sx={{
          marginBottom: 4,
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}>
          <Typography variant="h4">
            Well Done!
          </Typography>
        </Box>
      )}

      <Grid container spacing={2} justifyContent="center">
        {shuffledWords.map((word, index) => {
          const isSolved = solvedGroups.some(group => group.includes(word));
          const isRemoved = removedCards.includes(word);

          return (
            !isRemoved && (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card
                  onClick={() => handleCardClick(index)}
                  sx={{
                    cursor: isSolved ? 'default' : 'pointer',
                    backgroundColor: clickedCards[index]
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                    opacity: isSolved ? 0.5 : 1,
                    transition: 'background-color 0.3s ease, opacity 1s ease',
                    pointerEvents: isSolved ? 'none' : 'auto',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {word}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          );
        })}
      </Grid>
      
      {solvedGroups.length > 0 && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" align="center">
            Solved Groups:
          </Typography>
          {solvedGroups.map((group, index) => (
            <Typography key={index} variant="h6" align="center" sx={{ mt: 2 }}>
              {group.join(", ")} - {getGroupDescription(group)}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
    <Footer/>
    </>
  );
};

const getGroupDescription = (group) => {
  if (group.every((word) => solutions[0].includes(word))) {
    return "Fruits";
  }
  if (group.every((word) => solutions[1].includes(word))) {
    return "Animals";
  }
  if (group.every((word) => solutions[2].includes(word))) {
    return "Tools";
  }
  if (group.every((word) => solutions[3].includes(word))) {
    return "Vehicles";
  }
  return "";
};

export default ConnectionsGame;
