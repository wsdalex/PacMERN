import { getToken } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import GlobalNavBar from "../../components/GlobalNavBar";
import FixedContainer from "../../components/Container";
import { Box, Typography } from "@mui/material";
import theme from "../../assets/theme";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/profile";

export const ProfilePage = () => {
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    let userId = null; 
    // let user_name = ""; 
    // let profile_image = "";

    if (user) {
        try {
            const userObj = JSON.parse(user);
            userId = userObj.id
        } catch (error) {
            console.error("Error parsing user data", error);
        }
    }

    const token = getToken();
    if (!token) {
        navigate("/login");
    }

    useEffect(() => {
        if (userId) {
            getProfile(userId)
                .then((data) => {
                    setProfile(data);
                    console.log(data); // Check what data is being retrieved
                })
                .catch((error) => {
                    console.error("Error fetching profile data", error);
                });
        }
    }, [userId]);

    return (
        <div>
            <GlobalNavBar />
            {profile ? <><Box 
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
                                    src={profile.profileImage} 
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
                                    Name: {profile.name}
                                    <br />
                                    <br />
                                    Score: 0
                                    <br />
                                    <br />
                                    Badges: 0
                                    <br />
                                    <br />
                                    Friends: {profile.friends.length}
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
                    <br />
                    {profile.recentlyPlayed[0].game}
                </Typography>
            </FixedContainer>
            </>
            : (
                <Typography variant="h6">Loading profile...</Typography>
            )}
        </div>
    );
};