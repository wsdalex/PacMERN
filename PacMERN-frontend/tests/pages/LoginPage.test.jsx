import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";

import { LoginPage } from "../../src/pages/Login/LoginPage";
import { login } from "../../src/services/authentication";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock authentication service
vi.mock("../../src/services/authentication", () => ({
    login: vi.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
    };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Reusable function for filling out login form
const completeLoginForm = async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email address/i), "test@email.com");
    await user.type(screen.getByLabelText(/password/i), "1234");
    await user.click(screen.getByRole("button", { name: /sign in/i }));
};

describe("Login Page", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        localStorage.clear();
    });

    test("allows a user to login", async () => {
        render(<LoginPage />);

        await completeLoginForm();

        expect(login).toHaveBeenCalledWith("test@email.com", "1234");
    });

    test("navigates to /posts on successful login", async () => {
        login.mockResolvedValue({
            token: "secrettoken123",
            user: { id: 1, name: "Test User" },
        });

        render(<LoginPage />);

        await completeLoginForm();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/posts");
            expect(localStorage.getItem("token")).toBe("secrettoken123");
            expect(localStorage.getItem("user")).toBe(
                JSON.stringify({ id: 1, name: "Test User" })
            );
        });
    });

    test("displays error message on unsuccessful login", async () => {
        login.mockRejectedValue(new Error("Error logging in"));

        render(<LoginPage />);

        await completeLoginForm();

        await waitFor(() => {
            expect(screen.getByText("Error logging in")).toBeInTheDocument();
        });
    });
});
