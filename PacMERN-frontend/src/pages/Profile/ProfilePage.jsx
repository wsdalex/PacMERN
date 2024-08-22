import { getToken } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import GlobalNavBar from "../../components/GlobalNavBar";
import FixedContainer from "../../components/Container";
import { Box, Typography } from "@mui/material";
import theme from "../../assets/theme";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/profile";
import moment from "moment";

export const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const defaultProfileImage = "../src/assets/images/defaultProfileImage.svg.png";

    useEffect(() => {
        const fetchProfile = async () => {
            const token = getToken();
            if (!token) {
                navigate("/login");
                return;
            }

            if (userId) {
                try {
                    const data = await getProfile(userId);
                    setProfile(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching profile data", error);
                    setError("Failed to load profile");
                    setLoading(false);
                }
            }
        };

        fetchProfile();
    }, [userId, navigate]);

    function findMostPlayed(recentlyPlayed) {
        if (recentlyPlayed.length === 0) return null;

        const frequency = {}; //to store the games and their counts
        recentlyPlayed.forEach((item) => {
            //iterating over each item in the array
            const game = item.game; //getting the game name item
            if (frequency[game]) {
                frequency[game]++; //if game exists already, increase count
            } else {
                frequency[game] = 1; //if not, add the game with count of 1
            }
        });
        let mostRecurringGame = null; //variables to track most fre game and count
        let maxFrequency = 0;

        for (const game in frequency) {
            if (frequency[game] > maxFrequency) {
                //updating most freq
                mostRecurringGame = game;
                maxFrequency = frequency[game];
            }
        }
        return mostRecurringGame;
    }

    if (loading)
        return <Typography variant='h6'>Loading profile...</Typography>;
    if (error)
        return (
            <Typography variant='h6' color='error'>
                {error}
            </Typography>
        );
    if (!profile) return <Typography variant='h6'>No profile found</Typography>;

    return (
        <div>
            <GlobalNavBar />
            {profile ? (
                <>
                    <Box //invisible box for the whitespace to contain yellow profile box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "50vh",
                            marginTop: "-1vw",
                            marginBottom: "-3vw",
                            padding: "3vw",
                        }}
                    >
                        <Box //yellow profile box
                            sx={{
                                width: "45vw",
                                height: "22vw",
                                display: "flex",
                                bgcolor: theme.palette.yellow.main,
                                border: "3px solid black",
                                boxSizing: "border-box",
                                padding: "3vw",
                            }}
                        >
                            <Box //profile image box
                                sx={{
                                    width: "10vw",
                                    minHeight: "15vw",
                                    border: "3px solid black",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "1vw",
                                }}
                            >
                                <img
                                    src={
                                        profile.profileImage ||
                                        defaultProfileImage
                                    }
                                    alt='Profile'
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop
                                        e.target.src = defaultProfileImage;
                                    }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>

                            {/* White stat box */}
                            <Box
                                sx={{
                                    minWidth: "25vw",
                                    maxHeighteight: "15vw",
                                    bgcolor: "white",
                                    border: "3px solid black",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "left",
                                    marginRight: "0vw",
                                    padding: "1vw",
                                }}
                            >
                                <Typography
                                    variant='body1'
                                    sx={{
                                        color: "black",
                                        fontFamily: `${theme.typography.retro.fontFamily}`,
                                        textAlign: "left",
                                        fontSize: 15,
                                        marginLeft: "2vw",
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
                                    <br />
                                    <br />
                                    Most played:{" "}
                                    {findMostPlayed(profile.recentlyPlayed)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <FixedContainer>
                        <Box //put the following in a box to help with alignment
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    color: "black",
                                    fontFamily: `${theme.typography.retro.fontFamily}`,
                                    marginBottom: 4,
                                    marginTop: -14,
                                }}
                            >
                                Recently played:
                            </Typography>
                            {profile.recentlyPlayed.length > 0 ? (
                                profile.recentlyPlayed.map((item, index) => (
                                    <Typography
                                        key={index}
                                        variant='body1'
                                        sx={{
                                            color: "black",
                                            fontFamily: `${theme.typography.retro.fontFamily}`,
                                            marginBottom: 2,
                                            fontSize: 20,
                                        }}
                                    >
                                        <Box
                                            component='img'
                                            src='../src/assets/images/controller-icon.png'
                                            alt='Controller Icon'
                                            sx={{
                                                height: "28px", // Set a fixed height for the icon
                                                width: "28px", // Set a fixed width for the icon
                                                marginRight: "0.5rem", // Spacing between the image and text
                                            }}
                                        />
                                        {profile.name} played{" "}
                                        <span style={{ color: "#069330" }}>
                                            {item.game}
                                        </span>{" "}
                                        <span style={{ fontSize: 12 }}>
                                            - {moment(item.createdAt).fromNow()}
                                        </span>
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant='body1'>
                                    No recent games played.
                                </Typography>
                            )}
                        </Box>
                    </FixedContainer>
                </>
            ) : (
                <Typography variant='h6'>Loading profile...</Typography>
            )}
        </div>
    );
};
