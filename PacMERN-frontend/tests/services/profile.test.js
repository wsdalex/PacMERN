import createFetchMock from "vitest-fetch-mock";
import { describe, vi, test, expect } from "vitest";
import { getProfile } from "../../src/services/profile";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

// Mock getToken function
vi.mock("../../src/services/authentication", () => ({
    default: vi.fn(() => "mockedToken"),
}));

describe("profile service", () => {
    describe("getProfile", () => {
        test("fetches the user profile successfully", async () => {
            const userId = "12345";
            const mockProfile = { id: userId, name: "Test User", email: "test@test.com" };

            fetch.mockResponseOnce(JSON.stringify(mockProfile), { status: 200 });

            const profile = await getProfile(userId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/users/${userId}`);
            expect(options.method).toEqual("GET");
            expect(options.headers.Authorization).toEqual("Bearer mockedToken");
            expect(profile).toEqual(mockProfile);
        });

        test("throws an error if the profile fetch fails with a non-200 status", async () => {
            const userId = "12345";

            fetch.mockResponseOnce(JSON.stringify({ message: "Not found" }), { status: 404 });

            try {
                await getProfile(userId);
            } catch (err) {
                expect(err.message).toEqual("Unable to fetch profile");
            }
        });

        test("throws an error if there is a network error during profile fetch", async () => {
            const userId = "12345";

            fetch.mockReject(new Error("Network error"));

            try {
                await getProfile(userId);
            } catch (err) {
                expect(err.message).toEqual("Unable to fetch profile");
            }
        });
    });
});
