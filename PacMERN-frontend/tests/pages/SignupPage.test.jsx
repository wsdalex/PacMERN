import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { SignupPage } from "../../src/pages/Signup/SignupPage";
import { signup } from "../../src/services/authentication";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock authentication service
vi.mock("../../src/services/authentication", () => ({
    signup: vi.fn(),
}));

// Reusable function for filling out signup form
const completeSignupForm = async (user, { email = "test@email.com", password = "1234", confirmPassword = "1234", profileImage = "" } = {}) => {
    await user.type(screen.getByLabelText(/name/i), "Test User");
    await user.type(screen.getByLabelText(/email/i), email);
    await user.type(screen.getByLabelText(/^password/i), password);
    await user.type(screen.getByLabelText(/confirm password/i), confirmPassword);
    
    // Only type profile image URL if it's provided
    if (profileImage) {
        await user.type(screen.getByLabelText(/profile image url/i), profileImage);
    }

    await user.click(screen.getByRole("button", { name: /sign up/i }));
};

describe("Signup Page", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("initial state of the form", () => {
        render(<SignupPage />);
        expect(screen.getByLabelText(/name/i)).toHaveValue("");
        expect(screen.getByLabelText(/email/i)).toHaveValue("");
        expect(screen.getByLabelText(/^password/i)).toHaveValue("");
        expect(screen.getByLabelText(/confirm password/i)).toHaveValue("");
        expect(screen.getByLabelText(/profile image url/i)).toHaveValue("");
    });

    test("allows a user to signup", async () => {
        render(<SignupPage />);
        const user = userEvent.setup();

        await completeSignupForm(user);

        expect(signup).toHaveBeenCalledWith("Test User", "test@email.com", "1234", "");
    });

    test("navigates to /login on successful signup", async () => {
        signup.mockResolvedValue({});
        render(<SignupPage />);
        const user = userEvent.setup();

        await completeSignupForm(user);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    test("displays error message on unsuccessful signup", async () => {
        signup.mockRejectedValue(new Error("Error signing up"));
        render(<SignupPage />);
        const user = userEvent.setup();

        await completeSignupForm(user);

        await waitFor(() => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Error signing up");
        });
    });

    test("displays error for invalid email", async () => {
        render(<SignupPage />);
        const user = userEvent.setup();

        await completeSignupForm(user, { email: "invalidemail" });

        await waitFor(() => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Invalid email address format");
        });
    });

    test("displays error for mismatched passwords", async () => {
        render(<SignupPage />);
        const user = userEvent.setup();

        await completeSignupForm(user, { password: "1234", confirmPassword: "5678" });

        await waitFor(() => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Passwords do not match");
        });
    });

    test("displays error when required fields are missing", async () => {
        render(<SignupPage />);
        const user = userEvent.setup();

        await user.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Invalid email address format");
        });
    });

    test("allows signup with valid profile image URL", async () => {
        render(<SignupPage />);
        const user = userEvent.setup();

        await completeSignupForm(user, { profileImage: "http://example.com/image.jpg" });

        expect(signup).toHaveBeenCalledWith("Test User", "test@email.com", "1234", "http://example.com/image.jpg");
    });

    test("allows signup without profile image URL", async () => {
        render(<SignupPage />);
        const user = userEvent.setup();

        await completeSignupForm(user);

        expect(signup).toHaveBeenCalledWith("Test User", "test@email.com", "1234", "");
    });

    test("shows required error message when the name is missing", async () => {
        render(<SignupPage />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/email/i), "test@email.com");
        await user.type(screen.getByLabelText(/^password/i), "1234");
        await user.type(screen.getByLabelText(/confirm password/i), "1234");
        await user.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Name is required");
        });
    });
    
    test("handles signup service failure", async () => {
        signup.mockRejectedValue(new Error("Service is down"));
        render(<SignupPage />);
        const user = userEvent.setup();
    
        await completeSignupForm(user);
    
        await waitFor(() => {
            expect(screen.getByTestId("error-message")).toHaveTextContent("Service is down");
        });
    });
});
