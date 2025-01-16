// Get all following
export async function FollowingApi() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_following`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error following:", error);
    }
}

// Add newFollowing
export async function newFollowing(id: number | null) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/${id}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error following:", error);
    }
}