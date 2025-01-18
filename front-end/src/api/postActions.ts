// Get Liked-Post
export async function likedPostsApi() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_liked_posts`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error get liked posts:", error);
    }
}

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

// Get Users-Liked Posts
export async function UserslikedApi(id: number | null) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_post_likes/${id}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error get liked posts:", error);
    }
}

// Save Post
export async function saveApi(id: number | null) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save_post/${id}`, {
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

// Get Saved-Post
export async function savedPostsApi() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_saved_posts`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error get saved posts:", error);
    }
}