import { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import UserCard from "../../components/UserCard";
import { getAllUsers } from "../../services/user";
import { getFriends, getFriendRequests, acceptFriendRequest, declineFriendRequest, sendFriendRequest, getFriendRequestsSent } from "../../services/friends";

export const FriendsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [requestsSent, setRequestsSent] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const userId = JSON.parse(localStorage.getItem('user'))?.id;

    // Fetch data from API
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [users, fetchedFriends, fetchedRequests, fetchedRequestsSent] = await Promise.all([
                getAllUsers(),
                getFriends(userId),
                getFriendRequests(userId),
                getFriendRequestsSent(userId)
            ]);

            // Update state with fetched data
            setAllUsers(users);
            setFriends(fetchedFriends.friends);
            setFriendRequests(fetchedRequests.friendRequestsReceived);
            setRequestsSent(fetchedRequestsSent.friendRequestsSent);

            // Filter out friends and requests sent from all users
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

    // Handle accepting a friend request
    const onAccept = async (currentUserId, friendId) => {
        try {
            await acceptFriendRequest(currentUserId, friendId);
            await fetchData(); // Re-fetch data to update the state
        } catch (error) {
            console.error("Failed to accept friend request", error);
        }
    };

    // Handle rejecting a friend request
    const onReject = async (currentUserId, friendId) => {
        try {
            await declineFriendRequest(currentUserId, friendId);
            await fetchData(); // Re-fetch data to update the state
        } catch (error) {
            console.error("Failed to decline friend request", error);
        }
    };

    // Handle sending a friend request
    const onSendFriendRequest = async (currentUserId, targetUserId) => {
        try {
            await sendFriendRequest(currentUserId, targetUserId);
            
            // Re-fetch data to update requestsSent and filteredUsers
            await fetchData();
        } catch (error) {
            console.error("Failed to send friend request", error);
        }
    };

    return (
        <>
            <GlobalNavBar />
            <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <>
                        <Typography variant="h4" gutterBottom>Friends</Typography>
                        {friends.map((person) => (
                            <UserCard key={person._id} user={person} />
                        ))}
                        <Typography variant="h4" gutterBottom>Friend Requests</Typography>
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
                        <Typography variant="h4" gutterBottom>Pending Friends</Typography>
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
                        <Typography variant="h4" gutterBottom>All Users</Typography>
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
                    </>
                )}
            </Container>
            <Footer />
        </>
    );
};
