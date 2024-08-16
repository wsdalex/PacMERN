import { Paper, Typography } from "@mui/material";
import theme from "../assets/theme";

export const GameCard = (props) => {
    return (
        <>
        <Paper 
                        elevation={3} 
                        sx={{ 
                            backgroundColor: props.colour,
                            flexGrow: 1,
                            textAlign: 'center',
                            padding: 2,
                        }}
                    >
                        <Typography variant="h4">{props.name}</Typography>
                        <img 
                            src={`${props.image}`} 
                            alt="props.alt" 
                            style={{ 
                                maxWidth: '100%', // Ensures the image fits within the container width
                                height: 'auto', // Maintains aspect ratio
                                maxHeight: '200px', // Optional: Limit the height to prevent it from being too tall
                            }}
                        />
                        <Typography>
                            {props.description}
                        </Typography>
                    </Paper>
        </>
    )
}