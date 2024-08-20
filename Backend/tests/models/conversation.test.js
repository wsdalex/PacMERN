const mongoose = require("mongoose");
require("../mongodb_helper");
const Conversation = require("../../models/conversation");
const User = require("../../models/user");
const Message = require("../../models/message");

describe("Conversation model", () => {
    let sender, receiver;

    beforeEach(async () => {
        await Conversation.deleteMany({});
        await User.deleteMany({});
        await Message.deleteMany({});

        sender = new User({
            email: "sender@example.com",
            password: "password",
            name: "Sender",
        });
        receiver = new User({
            email: "receiver@example.com",
            password: "password",
            name: "Receiver",
        });
        await sender.save();
        await receiver.save();
    });

    it("has a sender", () => {
        const conversation = new Conversation({
            senderId: sender._id,
            receiverId: receiver._id,
        });
        expect(conversation.senderId).toEqual(sender._id);
    });

    it("has a receiver", () => {
        const conversation = new Conversation({
            senderId: sender._id,
            receiverId: receiver._id,
        });
        expect(conversation.receiverId).toEqual(receiver._id);
    });

    it("can have a last message", async () => {
        const message = new Message({
            sender: sender._id,
            receiver: receiver._id,
            message: "Hello",
        });
        await message.save();

        const conversation = new Conversation({
            senderId: sender._id,
            receiverId: receiver._id,
            lastMessage: message._id,
        });

        expect(conversation.lastMessage).toEqual(message._id);
    });

    it("can list all conversations", async () => {
        const conversations = await Conversation.find();
        expect(conversations).toEqual([]);
    });

    it("can save a conversation", async () => {
        const conversation = new Conversation({
            senderId: sender._id,
            receiverId: receiver._id,
        });

        await conversation.save();
        const conversations = await Conversation.find();

        expect(conversations.length).toEqual(1);
        expect(conversations[0].senderId.toString()).toEqual(
            sender._id.toString()
        );
        expect(conversations[0].receiverId.toString()).toEqual(
            receiver._id.toString()
        );
    });

    it("should have timestamps", async () => {
        const conversation = new Conversation({
            senderId: sender._id,
            receiverId: receiver._id,
        });

        await conversation.save();
        const savedConversation = await Conversation.findOne();

        expect(savedConversation.createdAt).toBeDefined();
        expect(savedConversation.updatedAt).toBeDefined();
    });

    it("enforces unique conversations between two users", async () => {
        const conversation1 = new Conversation({
            senderId: sender._id,
            receiverId: receiver._id,
        });
        await conversation1.save();

        const conversation2 = new Conversation({
            senderId: sender._id,
            receiverId: receiver._id,
        });

        await expect(conversation2.save()).rejects.toThrow(
            mongoose.Error.MongoError
        );
    });

    it("allows reversed sender and receiver for a new conversation", async () => {
        const conversation1 = new Conversation({
            senderId: sender._id,
            receiverId: receiver._id,
        });
        await conversation1.save();

        const conversation2 = new Conversation({
            senderId: receiver._id,
            receiverId: sender._id,
        });

        await expect(conversation2.save()).resolves.toBeDefined();
    });
});
