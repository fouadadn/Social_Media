// Like Post
export async function likeApi(id: number | null) {
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
        console.error("Error like post:", error);
    }
}

// Save Post
export async function saveApi(id: number | null) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}/save`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error save post:", error);
    }
}