const mongoose = require("mongoose");
require("../mongodb_helper");
const Message = require("../../models/message");
const User = require("../../models/user");
const Conversation = require("../../models/conversation");

describe("Message model", () => {
    let sender, receiver, conversation;

    beforeEach(async () => {
        await Message.deleteMany({});
        await User.deleteMany({});
        await Conversation.deleteMany({});

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

        conversation = new Conversation({
            senderId: sender._id,
            receiverId: receiver._id,
        });
        await conversation.save();
    });

    it("has a sender", () => {
        const message = new Message({
            sender: sender._id,
            receiver: receiver._id,
            conversation: conversation._id,
            message: "Hello",
        });
        expect(message.sender).toEqual(sender._id);
    });

    it("has a receiver", () => {
        const message = new Message({
            sender: sender._id,
            receiver: receiver._id,
            conversation: conversation._id,
            message: "Hello",
        });
        expect(message.receiver).toEqual(receiver._id);
    });

    it("has a conversation", () => {
        const message = new Message({
            sender: sender._id,
            receiver: receiver._id,
            conversation: conversation._id,
            message: "Hello",
        });
        expect(message.conversation).toEqual(conversation._id);
    });

    it("has a message content", () => {
        const message = new Message({
            sender: sender._id,
            receiver: receiver._id,
            conversation: conversation._id,
            message: "Hello",
        });
        expect(message.message).toEqual("Hello");
    });

    it("can have an image URL", () => {
        const message = new Message({
            sender: sender._id,
            receiver: receiver._id,
            conversation: conversation._id,
            message: "Check this out",
            imageUrl: "https://example.com/image.jpg",
        });
        expect(message.imageUrl).toEqual("https://example.com/image.jpg");
    });

    it("can list all messages", async () => {
        const messages = await Message.find();
        expect(messages).toEqual([]);
    });

    it("can save a message", async () => {
        const message = new Message({
            sender: sender._id,
            receiver: receiver._id,
            conversation: conversation._id,
            message: "Hello",
        });

        await message.save();
        const messages = await Message.find();

        expect(messages.length).toEqual(1);
        expect(messages[0].message).toEqual("Hello");
        expect(messages[0].sender.toString()).toEqual(sender._id.toString());
        expect(messages[0].receiver.toString()).toEqual(
            receiver._id.toString()
        );
        expect(messages[0].conversation.toString()).toEqual(
            conversation._id.toString()
        );
    });

    it("should have timestamps", async () => {
        const message = new Message({
            sender: sender._id,
            receiver: receiver._id,
            conversation: conversation._id,
            message: "Hello",
        });

        await message.save();
        const savedMessage = await Message.findOne();

        expect(savedMessage.createdAt).toBeDefined();
        expect(savedMessage.updatedAt).toBeDefined();
    });
});
