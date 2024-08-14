import { getToken } from "../../services/authentication";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    let user_name = ""; // Added check to ensure 'user' is not 'null', as throws error
    let profile_image = "";

    if (user) {
        try {
            const userObj = JSON.parse(user);
            user_name = userObj.name;
            // profile_image = userObj.profile_image;
        } catch (error) {
            console.error("Error parsing user data", error);
        }
    }

    const token = getToken();
    if (!token) {
        navigate("/login");
    }

    return (
        <div>
            <h1 data-testid="welcome-message">Welcome, {user_name}</h1>
            <img src={profile_image} alt="Profile" />
        </div>
    );
};
