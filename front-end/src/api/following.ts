export async function newFollowing(id: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/${id}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error following:", error);
    }
}