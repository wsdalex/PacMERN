const mongoose = require("mongoose");
const { connectToDatabase } = require("../../db/db");

describe("connectToDatabase", () => {
  let originalMongoDbUrl;
  let originalNodeEnv;

  beforeAll(() => {
    // Store original environment variables to restore them later
    originalMongoDbUrl = process.env.MONGODB_URL;
    originalNodeEnv = process.env.NODE_ENV;
  });

  afterAll(() => {
    // Restore the original environment variables after tests
    process.env.MONGODB_URL = originalMongoDbUrl;
    process.env.NODE_ENV = originalNodeEnv;
  });

  afterEach(() => {
    // Reset mocks after each test
    jest.clearAllMocks();
  });

  it("throws an error if MONGODB_URL is not provided", async () => {
    process.env.MONGODB_URL = "";

    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await expect(connectToDatabase()).rejects.toThrow(
      "No connection string provided"
    );

    expect(logSpy).toHaveBeenCalledWith(
      "No MongoDB url provided. Make sure there is a MONGODB_URL environment variable set. See the README for more details."
    );

    logSpy.mockRestore();
  });

  it("successfully connects to the database when MONGODB_URL is provided", async () => {
    process.env.MONGODB_URL = "mongodb://localhost:27017/testdb";
    process.env.NODE_ENV = "test";

    const connectSpy = jest.spyOn(mongoose, "connect").mockResolvedValueOnce();

    await expect(connectToDatabase()).resolves.not.toThrow();

    expect(connectSpy).toHaveBeenCalledWith("mongodb://localhost:27017/testdb");

    connectSpy.mockRestore();
  });

  it("logs a success message when NODE_ENV is not 'test'", async () => {
    process.env.MONGODB_URL = "mongodb://localhost:27017/testdb";
    process.env.NODE_ENV = "development";

    const connectSpy = jest.spyOn(mongoose, "connect").mockResolvedValueOnce();
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await connectToDatabase();

    expect(connectSpy).toHaveBeenCalledWith("mongodb://localhost:27017/testdb");
    expect(logSpy).toHaveBeenCalledWith("Successfully connected to MongoDB");

    connectSpy.mockRestore();
    logSpy.mockRestore();
  });
});
