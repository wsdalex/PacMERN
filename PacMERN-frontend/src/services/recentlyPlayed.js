const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { getToken } from "./authentication";

export const updateRecentlyPlayed = async (id, recentlyPlayed) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ id, recentlyPlayed }),
  };
  try {
    const response = await fetch(
      `${BACKEND_URL}/users/recentlyPlayed`,
      requestOptions
    );
    if (response.status !== 200) {
      throw new Error("Unable to update recently played");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to update recently played");
  }
};
