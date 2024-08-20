require("../mongodb_helper");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

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

  it("hashes the password before saving", async () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "someone",
    });

    await user.save();
    // Ensure the password saved is not plain text
    expect(user.password).not.toEqual("password");
    // Ensure the password is hashed (length of bcrypt hash is 60)
    expect(user.password.length).toEqual(60);
  });

  // Test to check if the password is not re-hashed when not modified
  it("does not re-hash the password if it's not modified", async () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "someone",
    });

    await user.save();
    const originalHashedPassword = user.password;

    // Update some other field and save again
    user.name = "someone else";
    await user.save();

    // Ensure the password hasn't changed
    expect(user.password).toEqual(originalHashedPassword);
  });
  it("correctly compares passwords", async () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "someone",
    });

    await user.save();
    // Correct password comparison
    const isMatch = await user.comparePassword("password");
    expect(isMatch).toBe(true);

    // Incorrect password comparison
    const isNotMatch = await user.comparePassword("wrongpassword");
    expect(isNotMatch).toBe(false);
  });

  // Test to simulate bcrypt.genSalt error
  it("handles bcrypt.genSalt error", async () => {
    // Spy on bcrypt.genSalt and make it call the callback with an error
    const genSaltSpy = jest
      .spyOn(bcrypt, "genSalt")
      .mockImplementation((_, callback) => {
        callback(new Error("genSalt failed"));
      });

    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "someone",
    });

    try {
      await user.save();
    } catch (err) {
      expect(err.message).toBe("genSalt failed");
    }

    genSaltSpy.mockRestore(); // Restore original method after test
  });

  // Test to simulate bcrypt.hash error
  it("handles bcrypt.hash error", async () => {
    // Spy on bcrypt.genSalt to proceed normally
    const genSaltSpy = jest
      .spyOn(bcrypt, "genSalt")
      .mockImplementation((_, callback) => {
        callback(null, "fakeSalt");
      });

    // Spy on bcrypt.hash and make it call the callback with an error
    const hashSpy = jest
      .spyOn(bcrypt, "hash")
      .mockImplementation((_, __, callback) => {
        callback(new Error("hashing failed"));
      });

    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "someone",
    });

    try {
      await user.save();
    } catch (err) {
      expect(err.message).toBe("hashing failed");
    }

    genSaltSpy.mockRestore(); // Restore original method after test
    hashSpy.mockRestore(); // Restore original method after test
  });

  test("User has recently played", async () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "someone",
      recentlyPlayed: "Snake",
    });

    await user.save();

    const users = await User.find();

    expect(users[0].recentlyPlayed).toEqual("Snake");
  });
});
