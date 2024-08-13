import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import './App.css';
import { HomePage } from "../src/pages/HomePage/HomePage";
import { Error404Page } from "../src/pages/ErrorPage/Error404Page";
import { LoginPage } from "../src/pages/Login/LoginPage";
import { SignupPage } from "../src/pages/Signup/SignupPage";
import { ProfilePage } from "../src/pages/Profile/ProfilePage";

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
