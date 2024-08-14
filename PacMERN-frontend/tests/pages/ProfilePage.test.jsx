import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

// Mock authentication service
vi.mock("../../src/services/authentication", () => ({
    getToken: vi.fn(),
}));

describe("Profile Page", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.spyOn(console, "error").mockImplementation(() => {});  // Suppress console error output
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    test("renders user name from localStorage", () => {
        const user = { name: "Test User" };
        localStorage.setItem("user", JSON.stringify(user));

        render(<ProfilePage />);

        expect(screen.getByTestId("welcome-message")).toHaveTextContent("Welcome, Test User");
    });
});
