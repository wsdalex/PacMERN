const app = require("../../app");
const supertest = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");

// Set a mock JWT_SECRET for testing
process.env.JWT_SECRET = 'test_secret';

describe("/tokens", () => {
    beforeAll(async () => {
        await User.deleteMany({});
        const user = new User({
            email: "auth-test@test.com",
            password: "12345678",
            name: "Test User",
            profileImage: "http://example.com/image.jpg",
        });

        await user.save();
        console.log("Test user created:", user);
    });

    afterAll(async () => {
        await User.deleteMany({});
        delete process.env.JWT_SECRET; // Clean up after tests
    });

    test("returns a token when credentials are valid", async () => {
        const testApp = supertest(app);
        const response = await testApp
            .post("/tokens")
            .send({ email: "auth-test@test.com", password: "12345678" });

        console.log("Response status:", response.status);
        console.log("Response body:", response.body);

        expect(response.status).toEqual(201);
        expect(response.body.token).not.toEqual(undefined);
        expect(response.body.message).toEqual("OK");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user).toHaveProperty(
            "email",
            "auth-test@test.com"
        );
        expect(response.body.user).toHaveProperty("name", "Test User");
        expect(response.body.user).toHaveProperty(
            "profileImage",
            "http://example.com/image.jpg"
        );
    });

    test("doesn't return a token when the user doesn't exist", async () => {
        const testApp = supertest(app);
        const response = await testApp
            .post("/tokens")
            .send({ email: "non-existent@test.com", password: "1234" });

        expect(response.status).toEqual(401);
        expect(response.body.token).toEqual(undefined);
        expect(response.body.message).toEqual("User not found");
    });

    test("doesn't return a token when the wrong password is given", async () => {
        const testApp = supertest(app);
        const response = await testApp
            .post("/tokens")
            .send({ email: "auth-test@test.com", password: "wrongpassword" });

        expect(response.status).toEqual(401);
        expect(response.body.token).toEqual(undefined);
        expect(response.body.message).toEqual("Password incorrect");
    });
});
