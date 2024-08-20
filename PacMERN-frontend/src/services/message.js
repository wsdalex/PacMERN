// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getToken = () => {
    const token = window.localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return token;
};

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message;
        } catch {
            errorMessage = "HTTP error! status: 500";
        }
        throw new Error(errorMessage);
    }
    return response.json();
};

export const sendMessage = async (receiverId, message, imageUrl) => {
    try {
        const token = getToken();
        const response = await fetch(`${BACKEND_URL}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ receiverId, message, imageUrl }),
        });

        return handleResponse(response);
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

export const getUserConversations = async () => {
    try {
        const token = getToken();
        const response = await fetch(`${BACKEND_URL}/messages/conversation`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    } catch (error) {
        console.error("Error getting user conversations:", error);
        throw error;
    }
};

export const getConversation = async (userId) => {
    try {
        const token = getToken();
        const response = await fetch(
            `${BACKEND_URL}/messages/conversation/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("response:", response);

        return handleResponse(response);
    } catch (error) {
        console.error("Error getting conversation:", error);
        throw error;
    }
};

export const getUserWithMessagesAndConversations = async () => {
    try {
        const token = getToken();
        const response = await fetch(
            `${BACKEND_URL}/messages/user-data`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return handleResponse(response);
    } catch (error) {
        console.error("Error getting user data:", error);
        throw error;
    }
};