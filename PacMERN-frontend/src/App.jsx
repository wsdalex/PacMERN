import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import './App.css';
import { HomePage } from "../pages/HomePage/HomePage";
import { Error404Page } from "../pages/ErrorPage/Error404Page";
import { LoginPage } from "../pages/Login/LoginPage";
import { SignupPage } from "../pages/Signup/SignupPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
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
  // any protected routes below - profile
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
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
