import { Paper, Typography } from "@mui/material";
import theme from "../assets/theme";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { updateRecentlyPlayed } from "../services/recentlyPlayed";


export const GameCard = (props) => {

    const navigate = useNavigate();

    const handleClick = async () => {
        const user = localStorage.getItem("user")
        const gameName = props.name
        let userId;
        if (user) {
            try {
      const userObj = JSON.parse(user);
      userId = userObj.id

            } catch (error) {
                console.error("Error parsing user data", error);
              }

        }
        await updateRecentlyPlayed(userId, gameName)
        navigate(props.path)
    }

    return (
        <>
        <Paper 
                        elevation={3} 
                        sx={{ 
                            backgroundColor: props.colour,
                            flexGrow: 1,
                            textAlign: 'center',
                            padding: "15px",
                            border: '3px solid black',
                            maxHeight: "auto",
                            width: "100vw",
                            justifyContent: 'center',
                            gap: '10px',
                            boxSizing: 'border-box',
                            overflow: 'hidden',
                            
                        }}
                        
                    >
                        <Typography variant="h4"
                        sx={{
                            backgroundColor: 'white',  // Set background to white
                            color: 'black',           // Change font color
                            padding: '2px',
                            border: '3px solid black',           // Optional: Add padding to make text more readable
                            borderRadius: '0px',       // Optional: Add rounded corners
                            display: 'inline-block',
                            marginBottom: '10px',
                            fontSize: 'calc(1.5vw + 8px)',  // Responsive font size based on viewport width
                            lineHeight: '1.2',  // Adjust line-height for better readability
                            // whiteSpace: 'nowrap', // Prevent text from wrapping
                            overflow: 'hidden',  // Ensure long text doesn't overflow
                            textOverflow: 'ellipsis',  // Add ellipsis to long overflowing text
                        }}>
                            {props.name}</Typography>
                        <img 
                            src={`${props.image}`} 
                            alt="props.alt" 
                            style={{ 
                                paddingTop: '5px',
                                padding: '0px',
                                maxWidth: '100%', // Ensures the image fits within the container width
                                height: '130px', // Maintains aspect ratio
                                maxHeight: '200px',
                                borderRadius: '15px',
                                position: 'static'  // Optional: Limit the height to prevent it from being too tall
                            }}
                        />
                        <Typography
                        sx={{
                            
                            color: 'black',           // Change font color
                            padding: '2px',
                            display: 'inline-block',
                            marginBottom: '0px', 
                            fontSize: 'calc(1vw + 8px)',  // Responsive font size based on viewport width
                            lineHeight: '1.2',  // Adjust line-height for better readability
                            overflowWrap: 'break-word', // Ensure long words break to the next line  // Optional: Shrink to fit the text content
                        }}>
                            {props.description}
                        </Typography>
                        <Button 
                        
                        onClick={handleClick} ><span style={{ fontSize: 15, color: 'black', textDecoration: 'underline'}}>PLAY GAME!</span></Button>
                    </Paper>
        </>
    )
}