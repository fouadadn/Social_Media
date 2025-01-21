'use client'

import Posts from "../posts";

export default function SavedPosts() {
    return <>
        <div className="w-full">
            <Posts ChangeDirect="savedPostsApi" width="100%" Action={false}/>
        </div>
    </>
}