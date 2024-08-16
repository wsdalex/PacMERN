import { Paper, Typography } from "@mui/material";
import theme from "../assets/theme";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


export const GameCard = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
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
                            maxHeight: "280px",
                            maxWidth: "250px",
                            justifyContent: 'center',
                            gap: '10px',
                            
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
                            fontSize: '30px'   // Optional: Shrink to fit the text content
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
                            marginBottom: '0px',   // Optional: Shrink to fit the text content
                        }}>
                            {props.description}
                        </Typography>
                        <Button 
                        
                        onClick={handleClick} ><span style={{ fontSize: 15, color: 'black', textDecoration: 'underline'}}>PLAY GAME!</span></Button>
                    </Paper>
        </>
    )
}