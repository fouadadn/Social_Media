// Add comment to post
export async function AddCommentApi(id: number | null, Comment: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}/add_comment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            },
            body: JSON.stringify({
                body: Comment
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Error Comment post:", error);
    }
}

// remove comment in post
export async function RemoveCommentApi(id_post: number | null, id_comment: number | null) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id_post}/delete_comment/${id_comment}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error Comment post:", error);
    }
}

// Like comment in post
export async function LikeCommentApi(id: number | null) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like_comment/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error Comment post:", error);
    }
}

// Reply comment in post
export async function ReplyCommentApi(id: number | null, replyComment: string | null) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reply/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            },
            body: JSON.stringify({
                body: replyComment
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Error Comment post:", error);
    }
}