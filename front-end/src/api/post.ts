import { AddPosteTypes } from '@/types';

// Fetch User Posts
export async function fetchUserPostsApi() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user_posts`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching user posts:", error);
    }
}

// Fetch All Posts
export async function fetchPostsApi() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

// Create a New Post
export async function createPostApi(newPost: AddPosteTypes) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            },
            body: JSON.stringify(newPost || {})
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating post:", error);
    }
}

// Delete Post
export async function deletePostApi(id: number | null) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}

// Update Post
export async function updatePostApi(id: number | null, newPost: AddPosteTypes) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            },
            body: JSON.stringify(newPost)
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating post:", error);
    }
}