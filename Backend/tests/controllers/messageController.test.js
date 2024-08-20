const request = require("supertest");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../../app");
const User = require("../../models/user");
const Message = require("../../models/message");
const Conversation = require("../../models/conversation");

require("../mongodb_helper");

// Set a mock JWT_SECRET for testing
process.env.JWT_SECRET = 'test_secret';

describe("MessageController", () => {
    let user1, user2, token1, token2;

    beforeAll(async () => {
        await mongoose.connection.dropDatabase();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Message.deleteMany({});
        await Conversation.deleteMany({});

        user1 = new User({
            name: "User One",
            email: "user1@example.com",
            password: "password",
        });
        user2 = new User({
            name: "User Two",
            email: "user2@example.com",
            password: "password",
        });
        await user1.save();
        await user2.save();

        token1 = JWT.sign({ user_id: user1._id }, process.env.JWT_SECRET);
        token2 = JWT.sign({ user_id: user2._id }, process.env.JWT_SECRET);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    describe("POST /messages", () => {
        test("sends a message", async () => {
            const response = await request(app)
                .post("/messages")
                .set("Authorization", `Bearer ${token1}`)
                .send({
                    receiverId: user2._id,
                    message: "Hello, User Two!",
                    imageUrl: "http://example.com/image.jpg"
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Message sent successfully");
            expect(response.body.newMessage).toBeDefined();
            expect(response.body.newMessage.message).toBe("Hello, User Two!");
            expect(response.body.newMessage.imageUrl).toBe("http://example.com/image.jpg");

            const savedMessage = await Message.findOne();
            expect(savedMessage).toBeDefined();
            expect(savedMessage.sender.toString()).toBe(user1._id.toString());
            expect(savedMessage.receiver.toString()).toBe(user2._id.toString());
            expect(savedMessage.message).toBe("Hello, User Two!");
            expect(savedMessage.imageUrl).toBe("http://example.com/image.jpg");

            const conversation = await Conversation.findOne();
            expect(conversation).toBeDefined();
            expect(conversation.lastMessage.toString()).toBe(savedMessage._id.toString());
        });

        test("returns an error if the receiver ID is missing", async () => {
            const response = await request(app)
                .post("/messages")
                .set("Authorization", `Bearer ${token1}`)
                .send({
                    message: "Hello, Invalid User!",
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Receiver ID is required");
        });

        test("returns an error if user is not authenticated", async () => {
            const response = await request(app)
                .post("/messages")
                .send({
                    receiverId: user2._id,
                    message: "Hello, User Two!",
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("auth error");
        });

        test("returns an error if token is invalid", async () => {
            const response = await request(app)
                .post("/messages")
                .set("Authorization", "Bearer invalidtoken")
                .send({
                    receiverId: user2._id,
                    message: "Hello, User Two!",
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("auth error");
        });
    });

    describe("GET /messages/user-data", () => {
        beforeEach(async () => {
            const conversation = new Conversation({
                senderId: user1._id,
                receiverId: user2._id,
            });
            await conversation.save();

            const message = new Message({
                sender: user1._id,
                receiver: user2._id,
                conversation: conversation._id,
                message: "Test message",
            });
            await message.save();

            conversation.lastMessage = message._id;
            await conversation.save();
        });

        test("retrieves user with messages and conversations", async () => {
            const response = await request(app)
                .get("/messages/user-data")
                .set("Authorization", `Bearer ${token1}`);

            expect(response.status).toBe(200);
            expect(response.body.user).toBeDefined();
            expect(response.body.user.name).toBe("User One");
            expect(response.body.user.conversations).toBeDefined();
            expect(response.body.user.conversations.length).toBe(1);
            expect(response.body.user.conversations[0].messages).toBeDefined();
            expect(response.body.user.conversations[0].messages.length).toBe(1);
            expect(response.body.user.conversations[0].messages[0].message).toBe("Test message");
        });

        test("returns an error if user is not found", async () => {
            await User.deleteMany({});

            const response = await request(app)
                .get("/messages/user-data")
                .set("Authorization", `Bearer ${token1}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe("User not found");
        });

        test("returns an error if user is not authenticated", async () => {
            const response = await request(app)
                .get("/messages/user-data");

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("auth error");
        });
    });
});