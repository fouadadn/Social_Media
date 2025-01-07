// Get User Information
export const GetUserInfoApi = async (userToken: string) => {
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
        return console.log("Problem Get User Information:", error);
    }
}