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
        return console.log("Error fetching user information:", error);
    }
}