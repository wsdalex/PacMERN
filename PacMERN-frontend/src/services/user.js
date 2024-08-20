const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACKEND_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message ||
                    `HTTP error! status: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
}