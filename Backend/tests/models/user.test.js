require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
    beforeEach(async () => {
    await User.deleteMany({});
});

    it("has an email address", () => {
    const user = new User({
        email: "someone@example.com",
        password: "password",
        name: "someone",
    });
    expect(user.email).toEqual("someone@example.com");
});

    it("has a password", () => {
    const user = new User({
        email: "someone@example.com",
        password: "password",
        name: "someone",
    });
    expect(user.password).toEqual("password");
});

    it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
});

// changed expect statement to comparePassword to cope with hashed password

    it("can save a user", async () => {
    const user = new User({
        email: "someone@example.com",
        password: "password",
        name: "someone",
    });

    await user.save();
    const users = await User.find();

    expect(users[0].email).toEqual("someone@example.com");
    expect(await users[0].comparePassword("password")).toEqual(true);
});
});