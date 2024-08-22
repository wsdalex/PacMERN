import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import MessagePage from "../../../src/pages/Message/MessagePage";
import { getAllUsers } from "../../../src/services/user";
import * as authService from "../../../src/services/authentication";
import * as messageService from "../../../src/services/message";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

// Mock user service
vi.mock("../../../src/services/user", () => ({
    getAllUsers: vi.fn(),
}));

// Mock authentication service
vi.mock("../../../src/services/authentication", () => ({
    getToken: vi.fn(),
}));

// Mock message service
vi.mock("../../../src/services/message", () => ({
    getUserWithMessagesAndConversations: vi.fn(),
}));

// Mock GlobalNavBar and Footer components
vi.mock("../../../src/components/GlobalNavBar", () => ({
    default: () => <div data-testid="global-nav-bar">Global Nav Bar</div>,
}));

vi.mock("../../../src/components/footer", () => ({
    default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("../../../src/pages/Message/ChatWindow", () => ({
    default: ({ userId }) => <div data-testid="chat-window">Chat Window for user {userId}</div>,
}));

describe("MessagePage", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("renders loading state initially", () => {
        vi.spyOn(authService, 'getToken').mockReturnValue("fake-token");
        messageService.getUserWithMessagesAndConversations.mockReturnValue(new Promise(() => {}));
        getAllUsers.mockReturnValue(new Promise(() => {}));
        render(<MessagePage />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("renders users list after loading", async () => {
        vi.spyOn(authService, 'getToken').mockReturnValue("fake-token");
        messageService.getUserWithMessagesAndConversations.mockResolvedValue({
            user: { _id: "currentUser" }
        });
        getAllUsers.mockResolvedValue([
            { _id: "1", name: "User 1" },
            { _id: "2", name: "User 2" },
        ]);

        render(<MessagePage />);

        await waitFor(() => {
            expect(screen.getByText("User 1")).toBeInTheDocument();
            expect(screen.getByText("User 2")).toBeInTheDocument();
        });
    });

    test("filters users based on search query", async () => {
        vi.spyOn(authService, 'getToken').mockReturnValue("fake-token");
        messageService.getUserWithMessagesAndConversations.mockResolvedValue({
            user: { _id: "currentUser" }
        });
        getAllUsers.mockResolvedValue([
            { _id: "1", name: "Alice" },
            { _id: "2", name: "Bob" },
        ]);

        render(<MessagePage />);

        await waitFor(() => {
            expect(screen.getByText("Alice")).toBeInTheDocument();
            expect(screen.getByText("Bob")).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText("...");
        await userEvent.type(searchInput, "Alice");

        await waitFor(() => {
            expect(screen.getByText("Alice")).toBeInTheDocument();
            expect(screen.queryByText("Bob")).not.toBeInTheDocument();
        });
    });

    test("opens chat window when a user is clicked", async () => {
        vi.spyOn(authService, 'getToken').mockReturnValue("fake-token");
        messageService.getUserWithMessagesAndConversations.mockResolvedValue({
            user: { _id: "currentUser" }
        });
        getAllUsers.mockResolvedValue([
            { _id: "1", name: "Alice" },
        ]);

        render(<MessagePage />);

        await waitFor(() => {
            expect(screen.getByText("Alice")).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("Alice"));

        await waitFor(() => {
            expect(screen.getByTestId("chat-window")).toBeInTheDocument();
            expect(screen.getByText("Chat Window for user 1")).toBeInTheDocument();
        });
    });

    test("displays error message when fetching users fails", async () => {
        vi.spyOn(authService, 'getToken').mockReturnValue("fake-token");
        messageService.getUserWithMessagesAndConversations.mockRejectedValue(new Error("Failed to load user data"));

        render(<MessagePage />);

        await waitFor(() => {
            expect(screen.getByText("Failed to load users. Failed to load user data")).toBeInTheDocument();
        });
    });

    test("displays error message when token is not found", async () => {
        vi.spyOn(authService, 'getToken').mockReturnValue(null);

        render(<MessagePage />);

        await waitFor(() => {
            expect(screen.getByText("Failed to load users. No authentication token found")).toBeInTheDocument();
        });
    });
});