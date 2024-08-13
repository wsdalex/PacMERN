const request = require("supertest");
const app = require("../../app"); // Adjust the path according to your project structure

describe("App error handling", () => {
  // Mock environment
  let originalEnv;

  beforeAll(() => {
    originalEnv = process.env.NODE_ENV;
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it("should handle errors and return a detailed message in development", async () => {
    process.env.NODE_ENV = "development";

    // Simulate an error in one of the routes
    app.get("/error", () => {
      throw new Error("Test error");
    });

    const res = await request(app).get("/error");

    expect(res.status).toBe(500);
    expect(res.text).toBe("Test error");
  });

  it("should handle errors and return a generic message in production", async () => {
    process.env.NODE_ENV = "production";

    // Simulate an error in one of the routes
    app.get("/error", () => {
      throw new Error("Test error");
    });

    const res = await request(app).get("/error");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ err: "Something went wrong" });
  });
  it("should return 404 for non-existent routes", async () => {
    const res = await request(app).get("/non-existent-route");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ err: "Error 404: Not Found" });
  });
});
