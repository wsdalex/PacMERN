import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import {
    sendMessage,
    getUserConversations,
    getConversation,
    getUserWithMessagesAndConversations,
} from "../../src/services/message";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("Message Service", () => {
    beforeEach(() => {
        fetchMocker.resetMocks();
        // Mock localStorage
        vi.spyOn(Storage.prototype, "getItem");
        Storage.prototype.getItem.mockReturnValue("mockedToken");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("sendMessage", () => {
        it("should send a message successfully", async () => {
            const mockResponse = { message: "Message sent successfully" };
            fetchMocker.mockResponseOnce(JSON.stringify(mockResponse));

            const result = await sendMessage(
                "123",
                "Hello",
                "http://example.com/image.jpg"
            );

            expect(fetchMocker).toHaveBeenCalledWith(
                `${BACKEND_URL}/messages`,
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer mockedToken",
                    },
                    body: JSON.stringify({
                        receiverId: "123",
                        message: "Hello",
                        imageUrl: "http://example.com/image.jpg",
                    }),
                })
            );
            expect(result).toEqual(mockResponse);
        });

        it("should throw an error if sending message fails", async () => {
            fetchMocker.mockResponseOnce(
                JSON.stringify({ message: "Error sending message" }),
                { status: 400 }
            );

            await expect(
                sendMessage("123", "Hello", "http://example.com/image.jpg")
            ).rejects.toThrow("Error sending message");
        });

        it("should throw an error if no token is found", async () => {
            Storage.prototype.getItem.mockReturnValue(null);

            await expect(
                sendMessage("123", "Hello", "http://example.com/image.jpg")
            ).rejects.toThrow("No authentication token found");
        });
    });

    describe("getUserConversations", () => {
        it("should get user conversations successfully", async () => {
            const mockResponse = { conversations: [] };
            fetchMocker.mockResponseOnce(JSON.stringify(mockResponse));

            const result = await getUserConversations();

            expect(fetchMocker).toHaveBeenCalledWith(
                `${BACKEND_URL}/messages/conversation`,
                expect.objectContaining({
                    headers: {
                        Authorization: "Bearer mockedToken",
                    },
                })
            );
            expect(result).toEqual(mockResponse);
        });

        it("should throw an error if getting conversations fails", async () => {
            fetchMocker.mockResponseOnce(
                JSON.stringify({ message: "Error getting conversations" }),
                { status: 400 }
            );

            await expect(getUserConversations()).rejects.toThrow(
                "Error getting conversations"
            );
        });
    });

    describe("getConversation", () => {
        it("should get a specific conversation successfully", async () => {
            const mockResponse = { conversation: {} };
            fetchMocker.mockResponseOnce(JSON.stringify(mockResponse));

            const result = await getConversation("123");

            expect(fetchMocker).toHaveBeenCalledWith(
                `${BACKEND_URL}/messages/conversation/123`,
                expect.objectContaining({
                    headers: {
                        Authorization: "Bearer mockedToken",
                    },
                })
            );
            expect(result).toEqual(mockResponse);
        });

        it("should throw an error if getting conversation fails", async () => {
            fetchMocker.mockResponseOnce(
                JSON.stringify({ message: "Error getting conversation" }),
                { status: 400 }
            );

            await expect(getConversation("123")).rejects.toThrow(
                "Error getting conversation"
            );
        });
    });

    describe("getUserWithMessagesAndConversations", () => {
        it("should get user data with messages and conversations successfully", async () => {
            const mockResponse = { user: {} };
            fetchMocker.mockResponseOnce(JSON.stringify(mockResponse));

            const result = await getUserWithMessagesAndConversations();

            expect(fetchMocker).toHaveBeenCalledWith(
                `${BACKEND_URL}/messages/user-data`,
                expect.objectContaining({
                    headers: {
                        Authorization: "Bearer mockedToken",
                    },
                })
            );
            expect(result).toEqual(mockResponse);
        });

        it("should throw an error if getting user data fails", async () => {
            fetchMocker.mockResponseOnce(
                JSON.stringify({ message: "Error getting user data" }),
                { status: 400 }
            );

            await expect(getUserWithMessagesAndConversations()).rejects.toThrow(
                "Error getting user data"
            );
        });
    });

    describe("handleResponse", () => {
        it("should handle successful responses", async () => {
            const mockResponse = { message: "Message sent successfully" };
            fetchMocker.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });
    
            const result = await sendMessage(
                "123",
                "Hello",
                "http://example.com/image.jpg"
            );
            expect(result).toEqual(mockResponse);
        });
    

        it("should throw an error for unsuccessful responses", async () => {
            fetchMocker.mockResponseOnce(
                JSON.stringify({ message: "Custom error message" }),
                { status: 400 }
            );
            await expect(
                sendMessage("123", "Hello", "http://example.com/image.jpg")
            ).rejects.toThrow("Custom error message");
        });

        it("should throw a generic error if no error message is provided", async () => {
            fetchMocker.mockResponseOnce("", { status: 500 });
            await expect(
                sendMessage("123", "Hello", "http://example.com/image.jpg")
            ).rejects.toThrow("HTTP error! status: 500");
        });
    });
});
