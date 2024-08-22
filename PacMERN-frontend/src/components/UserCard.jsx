import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import theme from '../assets/theme';
import Box from '@mui/material/Box'; // Import Box for additional styling

const UserCard = ({ user, isFriendRequest, onAccept, onReject, onSendFriendRequest, currentUserId }) => {
    return (
        <Card 
            variant="outlined" 
            sx={{ 
                width: "100%", 
                marginBottom: 2, 
                border: "3px solid black",
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', // Center the content
            }}
        >
            <CardContent sx={{ width: '100%' }}> {/* Ensures full width content */}
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="left" paddingLeft="10px" paddingRight="10px">
                    <Avatar  alt={user.name} src={user.imageUrl} sx={{border: "2px solid black"}}/>
                    <Typography variant="h6" component="div" textAlign="center">
                        {user.name}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}> {/* Center the buttons */}
                {isFriendRequest ? (
                    <>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => onAccept(currentUserId, user._id)}
                        >
                            Accept
                        </Button>
                        <Button
                            size="small"
                            color="secondary"
                            onClick={() => onReject(currentUserId, user._id)}
                        >
                            Reject
                        </Button>
                    </>
                ) : (
                    onSendFriendRequest && (
                        <Button
                            size="small"
                            sx={{
                                color: "primary",
                                border: "3px solid black",
                                textTransform: "none", // Ensures no automatic capitalization
                            }}
                            onClick={() => onSendFriendRequest(currentUserId, user._id)}
                        >
                            <Typography sx={{
                                color: "black",
                                border: "none",
                                fontSize: 15,
                                fontFamily: theme.typography.retro.fontFamily,
                            }}>
                                Add Friend
                            </Typography>
                        </Button>
                    )
                )}
            </CardActions>
        </Card>
    );
};

export default UserCard;