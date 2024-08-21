import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import './App.css';
import { HomePage } from "../src/pages/HomePage/HomePage";
import { Error404Page } from "../src/pages/ErrorPage/Error404Page";
import { LoginPage } from "../src/pages/Login/LoginPage";
import { SignupPage } from "../src/pages/Signup/SignupPage";
import { ProfilePage } from "../src/pages/Profile/ProfilePage";
import "./assets/fonts/fonts.css"
import { GamePage } from "./pages/GamePage/GamePage";
import "./assets/fonts/fonts.css";
import MessagePage from "./pages/Message/MessagePage";
import ChatWindow from "./pages/Message/ChatWindow";
import ConnectionsGame from "./pages/ConnectionsPage/ConnectionsPage";
import SnakeGame from "./pages/SnakePage/SnakePage";
import { FriendsPage } from "./pages/FriendsPage/FriendsPage";
import Connect4 from "./pages/Connect4Page/Connect4Page";


// // Function to handle the redirection to a static file
// const RedirectToSnakeGame = () => {
//   window.location.href = "/Snake.html";
//   return null;
// };


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
    path: "/games",
    element: <GamePage />
  },
  {
    path: "/snakepage",
    element: <SnakeGame />,
  },
  {
    path: "/connections",
    element: <ConnectionsGame/>
  },
  {
    path: "/connect4",
    element: <Connect4 />
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
        path: "/messages",
        element: <MessagePage />
      },
      {
        path: "/message/:userId",
        element: <ChatWindow />
      },
      {
        path: "/friends",
        element:<FriendsPage/>
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
