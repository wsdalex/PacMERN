const JWT = require("jsonwebtoken");
const { generateToken } = require("../../lib/token");

describe("Token functions", () => {
    const userId = "123456789";
    const testSecret = "test_secret";

    beforeAll(() => {
        process.env.JWT_SECRET = testSecret;
    });

    afterAll(() => {
        delete process.env.JWT_SECRET;
    });

    beforeEach(() => {
        jest.spyOn(Date, "now").mockImplementation(() => 1628000000000); // August 3, 2021 12:26:40 PM GMT
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("generateToken", () => {
        test("generates a valid JWT token", () => {
            const token = generateToken(userId);
            const decoded = JWT.verify(token, testSecret);

            expect(decoded).toHaveProperty("user_id", userId);
            expect(decoded).toHaveProperty("iat", 1628000000);
            expect(decoded).toHaveProperty("exp", 1628000600);
        });

        test("token expires in 10 minutes", () => {
            const token = generateToken(userId);
            const decoded = JWT.verify(token, testSecret);

            expect(decoded.exp - decoded.iat).toBe(600); // 10 minutes in seconds
        });

        test("throws error when JWT_SECRET is not set", () => {
            const originalSecret = process.env.JWT_SECRET;
            delete process.env.JWT_SECRET;

            expect(() => {
                generateToken(userId);
            }).toThrow("JWT_SECRET is not set");

            process.env.JWT_SECRET = originalSecret;
        });
    });
});