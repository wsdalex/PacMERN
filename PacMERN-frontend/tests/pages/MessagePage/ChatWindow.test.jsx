import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import ChatWindow from "../../../src/pages/Message/ChatWindow";
import * as messageService from "../../../src/services/message";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    useParams: () => ({ userId: "123" }),
}));

// Mock message service
vi.mock("../../../src/services/message", () => ({
    getUserWithMessagesAndConversations: vi.fn(),
    sendMessage: vi.fn(),
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("ChatWindow", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("renders loading state initially", () => {
        vi.spyOn(messageService, 'getUserWithMessagesAndConversations').mockReturnValue(new Promise(() => {}));
        render(<ChatWindow />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("renders chat with messages after loading", async () => {
        vi.spyOn(messageService, 'getUserWithMessagesAndConversations').mockResolvedValue({
            user: {
                _id: "currentUser",
                conversations: [{
                    senderId: { _id: "123", name: "Other User" },
                    receiverId: { _id: "currentUser" },
                    messages: [
                        { _id: "1", sender: { _id: "123" }, message: "Hello" },
                        { _id: "2", sender: { _id: "currentUser" }, message: "Hi there" },
                    ],
                }],
            },
        });

        render(<ChatWindow />);

        await waitFor(() => {
            expect(screen.getByText(/Chat with Other User/i)).toBeInTheDocument();
            expect(screen.getByText("Hello")).toBeInTheDocument();
            expect(screen.getByText("Hi there")).toBeInTheDocument();
        });
    });

    test("allows sending a message", async () => {
        vi.spyOn(messageService, 'getUserWithMessagesAndConversations').mockResolvedValue({
            user: {
                _id: "currentUser",
                conversations: [{
                    senderId: { _id: "123", name: "Other User" },
                    receiverId: { _id: "currentUser" },
                    messages: [],
                }],
            },
        });
        vi.spyOn(messageService, 'sendMessage').mockResolvedValue({});

        render(<ChatWindow />);

        await waitFor(() => {
            expect(screen.getByPlaceholderText(/Type your message/i)).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText(/Type your message/i);
        await userEvent.type(input, "New message");
        await userEvent.click(screen.getByText(/Send/i));

        expect(messageService.sendMessage).toHaveBeenCalledWith("123", "New message");
    });

    test("displays error message when fetching data fails", async () => {
        vi.spyOn(messageService, 'getUserWithMessagesAndConversations').mockRejectedValue(new Error("Failed to load user data"));

        render(<ChatWindow />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to load user data/i)).toBeInTheDocument();
        });
    });

    test("navigates to login page when authentication fails", async () => {
        vi.spyOn(messageService, 'getUserWithMessagesAndConversations').mockRejectedValue(new Error("Authentication failed. Please log in again."));

        render(<ChatWindow />);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    test("displays 'No messages yet' when conversation is empty", async () => {
        vi.spyOn(messageService, 'getUserWithMessagesAndConversations').mockResolvedValue({
            user: {
                _id: "currentUser",
                conversations: [{
                    senderId: { _id: "123", name: "Other User" },
                    receiverId: { _id: "currentUser" },
                    messages: [],
                }],
            },
        });

        render(<ChatWindow />);

        await waitFor(() => {
            expect(screen.getByText(/No messages yet/i)).toBeInTheDocument();
        });
    });
});