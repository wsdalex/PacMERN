import { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import UserCard from "../../components/UserCard";
import { getAllUsers } from "../../services/user";
import theme from "../../assets/theme";
import { getFriends, getFriendRequests, acceptFriendRequest, declineFriendRequest, sendFriendRequest, getFriendRequestsSent } from "../../services/friends";

export const FriendsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [requestsSent, setRequestsSent] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const userId = JSON.parse(localStorage.getItem('user'))?.id;

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [users, fetchedFriends, fetchedRequests, fetchedRequestsSent] = await Promise.all([
                getAllUsers(),
                getFriends(userId),
                getFriendRequests(userId),
                getFriendRequestsSent(userId)
            ]);

            setAllUsers(users);
            setFriends(fetchedFriends.friends);
            setFriendRequests(fetchedRequests.friendRequestsReceived);
            setRequestsSent(fetchedRequestsSent.friendRequestsSent);

            const filtered = users.filter(user =>
                !fetchedFriends.friends.some(friend => friend._id === user._id) &&
                !fetchedRequestsSent.friendRequestsSent.some(request => request._id === user._id) &&
                user._id !== userId
            );
            setFilteredUsers(filtered);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    const onAccept = async (currentUserId, friendId) => {
        try {
            await acceptFriendRequest(currentUserId, friendId);
            await fetchData(); 
        } catch (error) {
            console.error("Failed to accept friend request", error);
        }
    };

    const onReject = async (currentUserId, friendId) => {
        try {
            await declineFriendRequest(currentUserId, friendId);
            await fetchData(); 
        } catch (error) {
            console.error("Failed to decline friend request", error);
        }
    };

    const onSendFriendRequest = async (currentUserId, targetUserId) => {
        try {
            await sendFriendRequest(currentUserId, targetUserId);
            await fetchData();
        } catch (error) {
            console.error("Failed to send friend request", error);
        }
    };

    return (
        <>
            <GlobalNavBar />
            <Container 
                maxWidth="md" 
                sx={{ 
                    mt: 8, 
                    mb: 8,  
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "center", 
                    gap: 4,
                    width: '100%', 
                    padding: 1,
                }}
            >
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <>
                        <Box 
                            sx={{ 
                                border: '3px solid black', 
                                p: 2, 
                                mb: 4, 
                                minWidth: '15vw', 
                                backgroundColor: "#000099",
                                display: "flex", // Use Flexbox for alignment
                                flexDirection: "column",
                                alignItems: "flex", // Center contents
                            }}
                        >
                            <Typography 
                                variant="h4" 
                                sx={{
                                    backgroundColor: 'white',  
                                    color: 'black',           
                                    padding: '2px',
                                    border: '3px solid black', 
                                    fontSize: 25,
                                    fontFamily: `${theme.typography.retro.fontFamily}`,       
                                    borderRadius: '0px', 
                                    textAlign: 'center', // Center text
                                }} 
                                gutterBottom
                            >
                                Your Friends:
                            </Typography>
                            {friends.map((person) => (
                                <UserCard key={person._id} user={person} />
                            ))}
                        </Box>

                        <Box 
                            sx={{ 
                                border: '3px solid black', 
                                p: 2, 
                                mb: 4, 
                                minWidth: '15vw', 
                                backgroundColor: "#FFC001",
                                display: "flex", // Use Flexbox for alignment
                                flexDirection: "column",
                                alignItems: "center", // Center contents
                            }}
                        >
                            <Typography 
                                variant="h4" 
                                sx={{
                                    backgroundColor: 'white',  
                                    color: 'black',           
                                    padding: '2px',
                                    border: '3px solid black',
                                    fontSize: 25,
                                    fontFamily: `${theme.typography.retro.fontFamily}`, 
                                    borderRadius: '0px', 
                                    textAlign: 'center', // Center text
                                }} 
                                gutterBottom
                            >
                                Friend Requests:
                            </Typography>
                            {friendRequests.map((person) => (
                                <UserCard
                                    key={person._id}
                                    user={person}
                                    isFriendRequest={true}
                                    onAccept={onAccept}
                                    onReject={onReject}
                                    currentUserId={userId}
                                />
                            ))}
                        </Box>

                        <Box 
                            sx={{ 
                                border: '3px solid black', 
                                p: 2, 
                                mb: 4, 
                                minWidth: '15vw', 
                                backgroundColor: "#069330",
                                display: "flex", // Use Flexbox for alignment
                                flexDirection: "column",
                                alignItems: "center", // Center contents
                            }}
                        >
                            <Typography 
                                variant="h4"
                                sx={{
                                    backgroundColor: 'white',  
                                    color: 'black',           
                                    padding: '2px',
                                    border: '3px solid black', 
                                    fontSize: 25,
                                    fontFamily: `${theme.typography.retro.fontFamily}`, 
                                    borderRadius: '0px', 
                                    textAlign: 'center', // Center text
                                }} 
                                gutterBottom
                            >
                                Pending Friends:
                            </Typography>
                            {requestsSent.length ? (
                                requestsSent.map((person) => (
                                    <UserCard
                                        key={person._id}
                                        user={allUsers.find(user => user._id === person._id) || { _id: person._id, name: 'Loading...', imageUrl: '' }}
                                        currentUserId={userId}
                                    />
                                ))
                            ) : (
                                <Typography>No pending friend requests.</Typography>
                            )}
                        </Box>

                        <Box 
                            sx={{ 
                                border: '3px solid black', 
                                p: 2, 
                                mb: 4, 
                                minWidth: '15vw', 
                                backgroundColor: "#ff2d1e",
                                display: "flex", // Use Flexbox for alignment
                                flexDirection: "column",
                                alignItems: "center", // Center contents
                            }}
                        >
                            <Typography 
                                variant="h4" 
                                sx={{
                                    backgroundColor: 'white',  
                                    color: 'black',           
                                    padding: '2px',
                                    border: '3px solid black', 
                                    fontSize: 25,
                                    fontFamily: `${theme.typography.retro.fontFamily}`, 
                                    borderRadius: '0px', 
                                    textAlign: 'center', // Center text
                                }} 
                                gutterBottom
                            >
                                All Users:
                            </Typography>
                            {filteredUsers.length ? (
                                filteredUsers.map((person) => (
                                    <UserCard
                                        key={person._id}
                                        user={person}
                                        onSendFriendRequest={onSendFriendRequest}
                                        currentUserId={userId}
                                    />
                                ))
                            ) : (
                                <Typography>No users to display.</Typography>
                            )}
                        </Box>
                    </>
                )}
            </Container>
            <Footer />
        </>
    );
};