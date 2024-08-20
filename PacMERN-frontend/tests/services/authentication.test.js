import createFetchMock from "vitest-fetch-mock";
import { describe, vi, beforeEach, afterEach } from "vitest";
import { login, signup, getToken } from "../../src/services/authentication";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("authentication service", () => {
    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
        // Clear localStorage before each test
        localStorage.clear();
    });

    afterEach(() => {
        // Clear all mocks after each test
        vi.clearAllMocks();
        // Clear localStorage after each test
        localStorage.clear();
    });

    describe("getToken", () => {
        test("returns the token from localStorage", () => {
            localStorage.setItem("token", "testToken");
            expect(getToken()).toBe("testToken");
        });

        test("returns null if no token in localStorage", () => {
            expect(getToken()).toBe(null);
        });
    });

    describe("login", () => {
        test("calls the backend url for a token", async () => {
            const testEmail = "test@testEmail.com";
            const testPassword = "12345678";

            fetch.mockResponseOnce(JSON.stringify({ token: "testToken", user: { id: 1, name: "Test User" } }), {
                status: 201,
            });

            await login(testEmail, testPassword);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/tokens`);
            expect(options.method).toEqual("POST");
            expect(options.body).toEqual(
                JSON.stringify({ email: testEmail, password: testPassword })
            );
            expect(options.headers["Content-Type"]).toEqual("application/json");
        });

        test("returns the session if the request was a success", async () => {
            const testEmail = "test@testEmail.com";
            const testPassword = "12345678";
            const mockResponse = { token: "testToken", user: { id: 1, name: "Test User" } };

            fetch.mockResponseOnce(JSON.stringify(mockResponse), {
                status: 201,
            });

            const session = await login(testEmail, testPassword);
            expect(session).toEqual(mockResponse);
            expect(localStorage.getItem("token")).toBe("testToken");
        });

        test("throws an error if the request failed", async () => {
            const testEmail = "test@testEmail.com";
            const testPassword = "12345678";
            const errorMessage = "Invalid credentials";

            fetch.mockResponseOnce(
                JSON.stringify({ message: errorMessage }),
                { status: 401 }
            );

            await expect(login(testEmail, testPassword)).rejects.toThrow(errorMessage);
        });

        test("throws a default error message if no message in response", async () => {
            const testEmail = "test@testEmail.com";
            const testPassword = "12345678";

            fetch.mockResponseOnce(
                JSON.stringify({}),
                { status: 500 }
            );

            await expect(login(testEmail, testPassword)).rejects.toThrow("Received status 500 when logging in. Expected 201");
        });
    });

    describe("signup", () => {
        test("calls the backend url for signup", async () => {
            const testName = "test name";
            const testEmail = "test@testEmail.com";
            const testPassword = "12345678";
            const testProfileImage = "test-image-url";

            fetch.mockResponseOnce("", {
                status: 201,
            });

            await signup(testName, testEmail, testPassword, testProfileImage);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/users`);
            expect(options.method).toEqual("POST");
            expect(options.body).toEqual(
                JSON.stringify({
                    name: testName,
                    email: testEmail,
                    password: testPassword,
                    profileImage: testProfileImage,
                })
            );
            expect(options.headers["Content-Type"]).toEqual("application/json");
        });

        test("returns undefined if the signup request was a success", async () => {
            const testName = "test name";
            const testEmail = "test@testEmail.com";
            const testPassword = "12345678";
            const testProfileImage = "test-image-url";

            fetch.mockResponseOnce("", {
                status: 201,
            });

            const result = await signup(testName, testEmail, testPassword, testProfileImage);
            expect(result).toBeUndefined();
        });

        test("throws an error if the request failed with custom message", async () => {
            const testName = "test name";
            const testEmail = "test@testEmail.com";
            const testPassword = "12345678";
            const testProfileImage = "test-image-url";
            const errorMessage = "Email already exists";

            fetch.mockResponseOnce(
                JSON.stringify({ message: errorMessage }),
                { status: 400 }
            );

            await expect(signup(testName, testEmail, testPassword, testProfileImage)).rejects.toThrow(errorMessage);
        });

        test("throws a default error message if no message in response", async () => {
            const testName = "test name";
            const testEmail = "test@testEmail.com";
            const testPassword = "12345678";
            const testProfileImage = "test-image-url";

            fetch.mockResponseOnce(
                JSON.stringify({}),
                { status: 500 }
            );

            await expect(signup(testName, testEmail, testPassword, testProfileImage)).rejects.toThrow("Received status 500 when signing up. Expected 201");
        });
    });
});