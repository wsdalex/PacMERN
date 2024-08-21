import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const UserCard = ({ user, isFriendRequest, onAccept, onReject, onSendFriendRequest, currentUserId }) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 345, marginBottom: 2 }}>
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar alt={user.name} src={user.imageUrl} />
                    <Typography variant="h6" component="div">
                        {user.name}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions>
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
                            color="primary"
                            onClick={() => onSendFriendRequest(currentUserId, user._id)}
                        >
                            Send Friend Request
                        </Button>
                    )
                )}
            </CardActions>
        </Card>
    );
};

export default UserCard;
