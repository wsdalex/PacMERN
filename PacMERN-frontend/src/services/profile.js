const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { getToken } from "./authentication";

export const getProfile = async (id) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    };

    try {
        const response = await fetch(`${BACKEND_URL}/users/${id}`, requestOptions);

        if (response.status !== 200) {
            throw new Error("Unable to fetch profile");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Unable to fetch profile");
    }
};
