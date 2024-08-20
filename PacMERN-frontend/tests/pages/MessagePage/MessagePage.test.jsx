import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import MessagePage from "../../../src/pages/Message/MessagePage";
import { getAllUsers } from "../../../src/services/user";
import * as authService from "../../../src/services/authentication";

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

describe("MessagePage", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("renders loading state initially", () => {
        vi.spyOn(authService, 'getToken').mockReturnValue("fake-token");
        getAllUsers.mockReturnValue(new Promise(() => {})); // Never resolves
        render(<MessagePage />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("renders users list after loading", async () => {
        vi.spyOn(authService, 'getToken').mockReturnValue("fake-token");
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
        getAllUsers.mockResolvedValue([
            { _id: "1", name: "Alice" },
            { _id: "2", name: "Bob" },
        ]);

        render(<MessagePage />);

        await waitFor(() => {
            expect(screen.getByText("Alice")).toBeInTheDocument();
            expect(screen.getByText("Bob")).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText("Search users...");
        await userEvent.type(searchInput, "Alice");

        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });

    test("navigates to chat window when a user is clicked", async () => {
        vi.spyOn(authService, 'getToken').mockReturnValue("fake-token");
        getAllUsers.mockResolvedValue([
            { _id: "1", name: "Alice" },
        ]);

        render(<MessagePage />);

        await waitFor(() => {
            expect(screen.getByText("Alice")).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("Alice"));

        expect(mockNavigate).toHaveBeenCalledWith("/message/1");
    });

    test("displays error message when fetching users fails", async () => {
        vi.spyOn(authService, 'getToken').mockReturnValue("fake-token");
        getAllUsers.mockRejectedValue(new Error("Failed to load users"));

        render(<MessagePage />);

        await waitFor(() => {
            expect(screen.getByText("Failed to load users. Failed to load users")).toBeInTheDocument();
        });
    });

    test("displays error message when token is not found", async () => {
        vi.spyOn(authService, 'getToken').mockReturnValue(null);
        getAllUsers.mockRejectedValue(new Error("No authentication token found"));

        render(<MessagePage />);

        await waitFor(() => {
            expect(screen.getByText("Failed to load users. No authentication token found")).toBeInTheDocument();
        });
    });
});