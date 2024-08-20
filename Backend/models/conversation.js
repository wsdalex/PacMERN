const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
}, { timestamps: true });

// Create a compound index to ensure uniqueness of conversations
ConversationSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;