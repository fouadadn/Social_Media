// Fetch User Information
export const fetchUserInfo = async (userToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userToken}`
            }
        });
        const data = await response.json();
        return data || {};
    } catch (error) {
        console.error("Error fetching user information:", error);
    }
}

// Fetch All Users Information
export const fetchUsersApi = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

