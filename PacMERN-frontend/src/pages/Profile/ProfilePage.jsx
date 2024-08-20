import { getToken } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import GlobalNavBar from "../../components/GlobalNavBar";
import FixedContainer from "../../components/Container";
import { Box, Typography } from "@mui/material";
import theme from "../../assets/theme";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    let user_name = ""; 
    let profile_image = "";

    if (user) {
        try {
            const userObj = JSON.parse(user);
            user_name = userObj.name;
            profile_image = userObj.profileImage;
        } catch (error) {
            console.error("Error parsing user data", error);
        }
    }

    const token = getToken();
    if (!token) {
        navigate("/login");
    }

    return (
        <div>
            <GlobalNavBar />
            <Box 
                sx={{ 
                    display: 'flex',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minHeight: '50vh',
                    marginTop: '2vw', 
                    marginBottom: '1vw',
                    padding: '3vw'
                }}
            >
                <Box 
                    sx={{ 
                        width: '45vw', 
                        height: '22vw',
                        display: 'flex', // Ensures that the text box and image box are side by side
                        bgcolor: theme.palette.yellow.main,  
                        border: '3px solid black',
                        boxSizing: 'border-box',
                        padding: '3vw',
                    }}
                > 
                            {/* Profile Image */}
                            <Box
                                sx={{
                                    width: '15vw',
                                    height: '15vw',
                                    border: '3px solid black',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '1vw'
                                }}
                            >
                                <img 
                                    src={profile_image} 
                                    alt="Profile" 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>

                            {/* White stat box */}
                            <Box
                                sx={{
                                    minWidth: '25vw',
                                    width: 'flex',
                                    height: '15vw',
                                    bgcolor: 'white',
                                    border: '3px solid black',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'left',
                                    marginRight: '0vw', // Space between the text box and the image
                                }}
                            >
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: "black",
                                        fontFamily: `${theme.typography.retro.fontFamily}`,
                                        textAlign: 'left', 
                                        fontSize: 15,
                                        marginLeft: '2vw'
                                    }}
                                >
                                    Name: {user_name}
                                    <br />
                                    <br />
                                    Score: 0
                                    <br />
                                    <br />
                                    Badges: 0
                                    <br />
                                    <br />
                                    Friends: 0
                                </Typography>
                            </Box>

                </Box>
            </Box>
            <FixedContainer>
                <Typography variant="h4" 
                    sx={{ 
                        color: "black",
                        fontFamily: `${theme.typography.retro.fontFamily}`,
                        marginBottom: 4, 
                        marginTop: -14,
                        textAlign: 'start', 
                    }}
                >
                    Recently played:
                </Typography>
            </FixedContainer>
        </div>
    );
};