// Add Like
export async function AddLikeApi(id: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}/like`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error add like to post:", error);
    }
}