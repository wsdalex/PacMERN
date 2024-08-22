import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserWithMessagesAndConversations, sendMessage } from "../../services/message";
import { TextField } from "@mui/material";
import theme from '../../assets/theme';

const ChatWindow = () => {
    const { userId } = useParams();
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState(null);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchUserData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getUserWithMessagesAndConversations();
            setUserData(data.user);
            const conversation = data.user.conversations.find(conv => 
                conv.senderId._id === userId || conv.receiverId._id === userId
            );
            setCurrentConversation(conversation || null);
            setError(null);
        } catch (error) {
            console.error("Error fetching user data:", error);
            if (error.message === 'Authentication failed. Please log in again.') {
                navigate('/login');
            } else {
                setError("Failed to load user data. " + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, [navigate, userId]);
    
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        scrollToBottom();
    }, [currentConversation]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        try {
            await sendMessage(userId, message);
            setMessage("");
            fetchUserData();
        } catch (error) {
            console.error("Error sending message:", error);
            setError("Failed to send message");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const otherUser = currentConversation ? 
        (currentConversation.senderId._id === userId ? currentConversation.senderId : currentConversation.receiverId) 
        : null;

    return (
        <div style={{ padding: "1rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                Chat with {otherUser ? otherUser.name : "User"}
            </h1>
            <div style={{
                marginBottom: "1rem",
                height: "400px",
                overflowY: "auto",
                border: '2px solid black',
                // backgroundColor:'#8c9c60',
                borderRadius: "30px",
                padding: "0.5rem",
            }}>
                {!currentConversation || currentConversation.messages.length === 0 ? (
                    <p>No messages yet. Start a conversation!</p>
                ) : (
                    currentConversation.messages.map((msg, index) => (
                        <div
                            key={msg._id || index}
                            style={{
                                marginBottom: "0.5rem",
                                textAlign: msg.sender._id === userData._id ? "right" : "left",
                            }}
                        >
                            <span style={{
                                background: msg.sender._id === userData._id ? "#e0e0e0" : "#007bff",
                                color: msg.sender._id === userData._id ? "black" : "white",
                                borderRadius: "4px",
                                padding: "0.25rem 0.5rem",
                                display: "inline-block",
                                maxWidth: "70%",
                                wordWrap: "break-word",
                            }}>
                                {msg.message}
                            </span>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} style={{ display: "flex" , margin: '0rem',}}>
            <TextField
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Type your message...'
                fullWidth
                sx={{
                    flexGrow: 1,
                    marginRight: '0.5rem',
                    '& .MuiOutlinedInput-root': {
                        padding: '0.5rem',
                        borderRadius: '30px',
                        border: '2px solid black',
                        '& fieldset': {
                            borderColor: 'black',
                        },
                    },
                    '& .MuiInputBase-input': {
                        fontFamily: theme.typography.retro,
                        fontSize: '10px', 
                        color: 'black',
                    },
                }}
            />
                <button
                    type='submit'
                    style={{
                        
                        padding: "1rem 1rem",
                        background: "blue",
                        color: "white",
                        border: "none",
                        borderRadius: "90px",
                        cursor: "pointer",
                    }}
                >
                    Send
                </button>
            </form>
        </div>
    );
};


export default ChatWindow;