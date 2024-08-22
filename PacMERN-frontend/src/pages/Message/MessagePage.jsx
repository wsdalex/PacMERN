import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/user";
import { getToken } from "../../services/authentication";
import { getUserWithMessagesAndConversations } from "../../services/message";
import { Dialog, Box, Button, Container, Typography, TextField } from "@mui/material";
import ChatWindow from "./ChatWindow";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import FixedContainer from "../../components/Container";
import theme from '../../assets/theme';

const MessagePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openChats, setOpenChats] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate();

    const fetchAllUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const token = getToken();
            if (!token) {
                throw new Error("No authentication token found");
            }
            
            // Fetch current user data
            const userData = await getUserWithMessagesAndConversations();
            setCurrentUserId(userData.user._id);

            const users = await getAllUsers(token);
            const otherUsers = users.filter(user => user._id !== userData.user._id);
            setAllUsers(otherUsers);
            setFilteredUsers(otherUsers);
            setError(null);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Failed to load users. " + error.message);
            if (error.message === 'Authentication failed. Please log in again.') {
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const filterUsers = useCallback(() => {
        const lowercaseQuery = searchQuery.toLowerCase();
        return allUsers.filter((user) =>
            user._id !== currentUserId && user.name.toLowerCase().includes(lowercaseQuery)
        );
    }, [searchQuery, allUsers, currentUserId]);

    useEffect(() => {
        setFilteredUsers(filterUsers());
    }, [filterUsers]);

    const handleUserClick = (userId) => {
        setOpenChats((prev) => [...prev, userId]);
    };

    const handleCloseChat = (userId) => {
        setOpenChats((prev) => prev.filter((id) => id !== userId));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Container className='messages-container' sx={{ display: 'flex', flexDirection: 'column', minHeight: '10vh' }}>
            <GlobalNavBar />
            <Typography
                variant="h4"
                sx={{ 
                    fontFamily: theme.typography.retro, 
                    textAlign: 'center', 
                    mb: 3, 
                    color: 'black',
                }}
            >
                Messages
            </Typography>
            <FixedContainer>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem', }}>
                    <Box sx={{ width: '100%', maxWidth: '600px' , margin:'0rem',}}>
                        <Typography variant="h5" sx={{ fontFamily: theme.typography.retro, fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0rem', minHeight: '5vh' }}>
                            Search Users
                        </Typography>
                        <Box sx={{ marginBottom: '5rem' }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='...'
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        padding: '0 rem',
                                        color:'black',
                                    },
                                }}
                            />
                        </Box>
                        {filteredUsers.length === 0 ? (
                            <Typography>No users found.</Typography>
                        ) : (
                            <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
                                {filteredUsers.map((user) => (
                                    <Box component="li" key={user._id} sx={{ marginBottom: '1.25rem' }}>
                                        <Button
                                            onClick={() => handleUserClick(user._id)}
                                            sx={{
                                                textAlign: 'center',
                                                padding: '1.0rem',
                                                background: theme.palette.yellow.main,
                                                border: '3px solid black',
                                                borderRadius: '30px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: 'black',
                                                width: '30%',
                                                fontFamily: theme.typography.retro,
                                                textTransform: 'none',
                                                '&:hover':{
                                                    background: '#000099',
                                                    borderColor: 'white',
                                                    color: 'white',
                                                }
                                            }}
                                        >
                                            {user.profileImage && (
                                                <Box
                                                    component="img"
                                                    src={user.profileImage}
                                                    alt={user.name}
                                                    sx={{
                                                        width: '30px',
                                                        height: '30px',
                                                        borderRadius: '50%',
                                                        marginRight: '10px',
                                                    }}
                                                />
                                            )}
                                            {user.name}
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        )}
                        {openChats.map((userId) => (
                            <Dialog
                                key={userId}
                                open={true}
                                onClose={() => handleCloseChat(userId)}
                                aria-labelledby="chat-window-title"
                                aria-describedby="chat-window-description"
                            >
                                <Box
                                    sx={{
                                        width: 400,
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        p: 4,
                                        border: '3px solid black',
                                        borderRadius: '0px',
                                        fontFamily: theme.typography.retro,
                                        fontSize: 15,  
                                        color: "#D3D3D3",
                                    }}
                                >
                                    <ChatWindow userId={userId} />
                                    <Button onClick={() => handleCloseChat(userId)}
                                        sx={{
                                            color:'black',
                                            fontFamily: theme.typography.retro,
                                        }}>Close</Button>
                                </Box>
                            </Dialog>
                        ))}
                    </Box>
                </Box>
            </FixedContainer>
            <Footer />
        </Container>
    );
};

export default MessagePage;