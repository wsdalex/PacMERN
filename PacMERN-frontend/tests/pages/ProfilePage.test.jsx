import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { vi, expect, describe, test, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>
}));

// Mock authentication service
import { getToken } from "../../src/services/authentication";
vi.mock("../../src/services/authentication", () => ({
    getToken: vi.fn(),
}));

// Mock profile service
import { getProfile } from "../../src/services/profile";
vi.mock("../../src/services/profile", () => ({
    getProfile: vi.fn(),
}));

// Mock GlobalNavBar component
vi.mock("../../components/GlobalNavBar", () => ({
    default: () => <div data-testid="global-nav-bar">Global Nav Bar</div>,
}));

// Mock moment
vi.mock("moment", () => ({
    default: (date) => ({
        fromNow: () => "a few seconds ago",
    }),
}));

describe("Profile Page", () => {
    const mockUser = { id: "123", name: "Test User" };
    const mockProfile = {
        name: "Test User",
        profileImage: "http://example.com/image.jpg",
        friends: [],
        recentlyPlayed: []
    };

    beforeEach(() => {
        vi.resetAllMocks();
        localStorage.setItem("user", JSON.stringify(mockUser));
        getToken.mockReturnValue("fake-token");
    });

    afterEach(() => {
        localStorage.clear();
    });

    test("renders loading state initially", () => {
        render(<ProfilePage />);
        expect(screen.getByText("Loading profile...")).toBeInTheDocument();
    });

    test("renders profile data when loaded", async () => {
        getProfile.mockResolvedValue(mockProfile);

        render(<ProfilePage />);

        await waitFor(() => {
            expect(screen.getByText(/Name: Test User/)).toBeInTheDocument();
            expect(screen.getByText(/Friends: 0/)).toBeInTheDocument();
            expect(screen.getByText(/Most played:/)).toBeInTheDocument();
            expect(screen.getByAltText("Profile")).toHaveAttribute("src", mockProfile.profileImage);
        });
    });

    test("renders error message when profile fetch fails", async () => {
        getProfile.mockRejectedValue(new Error("Failed to load profile"));

        render(<ProfilePage />);

        await waitFor(() => {
            expect(screen.getByText("Failed to load profile")).toBeInTheDocument();
        });
    });

    test("navigates to login page when token is not present", () => {
        getToken.mockReturnValue(null);

        render(<ProfilePage />);

        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    test("renders recently played games when available", async () => {
        const profileWithGames = {
            ...mockProfile,
            recentlyPlayed: [
                { game: "Pac-Man", createdAt: new Date().toISOString() },
                { game: "Tetris", createdAt: new Date().toISOString() }
            ]
        };
        getProfile.mockResolvedValue(profileWithGames);

        render(<ProfilePage />);

        await waitFor(() => {
            expect(screen.getByText(/Test User played Pac-Man/)).toBeInTheDocument();
            expect(screen.getByText(/Test User played Tetris/)).toBeInTheDocument();
        });
    });

    test("renders 'No recent games played' when recentlyPlayed is empty", async () => {
        getProfile.mockResolvedValue(mockProfile);

        render(<ProfilePage />);

        await waitFor(() => {
            expect(screen.getByText("No recent games played.")).toBeInTheDocument();
        });
    });
});