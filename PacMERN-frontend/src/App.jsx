import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import './App.css';
import { HomePage } from "../src/pages/HomePage/HomePage";
import { Error404Page } from "../src/pages/ErrorPage/Error404Page";
import { LoginPage } from "../src/pages/Login/LoginPage";
import { SignupPage } from "../src/pages/Signup/SignupPage";
import { ProfilePage } from "../src/pages/Profile/ProfilePage";
import "./assets/fonts/fonts.css"
import { GamePage } from "./pages/GamePage/GamePage";
import theme from "./assets/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import "./assets/fonts/fonts.css";

// Function to handle the redirection to a static file
const RedirectToSnakeGame = () => {
  window.location.href = "/Snake.html";
  return null;
};


const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  console.log("Current token:", token);
  return token !== null;
};

export const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/snakegame",
    element: <RedirectToSnakeGame />,
  },
  // any protected routes below - profile
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/games",
        element: <GamePage/>
      }
    ]
  },
  {
    path: "*",
    element: <Error404Page />,
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      
    </>


  );
};

export default App;
