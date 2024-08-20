const Message = require("../models/message");
const User = require("../models/user");
const Conversation = require("../models/conversation");

const sendMessage = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const receiverId = req.body.receiverId;
        const message = req.body.message;
        const imageUrl = req.body.imageUrl;
        const senderId = req.user_id;

        console.log(`Sender id --> ${senderId}`);
        console.log(`Receiver id --> ${receiverId}`);
        console.log(`Message --> ${message}`);
        console.log(`Image URL --> ${imageUrl}`);

        if (!senderId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        if (!receiverId) {
            return res.status(400).json({ error: "Receiver ID is required" });
        }

        // checking if conversation already exists
        let conversation = await Conversation.findOne({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });

        // if not then create one
        if (!conversation) {
            conversation = new Conversation({
                senderId: senderId,
                receiverId: receiverId,
            });
            await conversation.save();
        }

        // creating and saving the message
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            conversation: conversation._id,
            message,
            imageUrl,
        });
        console.log(`Sender id --> ${newMessage.sender}`);
        console.log(`Receiver id --> ${newMessage.receiver}`);
        await newMessage.save();

        // updating the lastMessage in the conversation
        conversation.lastMessage = newMessage._id;
        await conversation.save();

        res.status(200).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

const getUserWithMessagesAndConversations = async (req, res) => {
    try {
        const userId = req.user_id;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const conversations = await Conversation.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        })
        .populate("senderId", "name email profileImage")
        .populate("receiverId", "name email profileImage")
        .populate({
            path: "lastMessage",
            populate: {
                path: 'sender',
                select: 'name email profileImage'
            }
        });

        // Fetch messages for all conversations
        const conversationIds = conversations.map(conv => conv._id);
        const messages = await Message.find({ conversation: { $in: conversationIds } })
            .sort({ createdAt: 1 })
            .populate('sender', 'name email profileImage');

        // Group messages by conversation
        const messagesByConversation = messages.reduce((acc, message) => {
            const conversationId = message.conversation.toString();
            if (!acc[conversationId]) {
                acc[conversationId] = [];
            }
            acc[conversationId].push(message);
            return acc;
        }, {});

        // Add messages to each conversation
        const conversationsWithMessages = conversations.map(conv => ({
            ...conv.toObject(),
            messages: messagesByConversation[conv._id.toString()] || []
        }));

        const userData = {
            ...user.toObject(),
            conversations: conversationsWithMessages
        };

        res.status(200).json({ user: userData });
    } catch (error) {
        console.error("Error in getUserWithMessagesAndConversations:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendMessage,
    getUserWithMessagesAndConversations
};