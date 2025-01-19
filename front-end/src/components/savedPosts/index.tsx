'use client'

import { likeApi, likedPostsApi, saveApi, savedPostsApi } from "@/api/postActions";
import { shareInfo } from "@/context/contextApi";
import { AddPosteTypes } from "@/types";
import { verfication } from "@/utils";
import Link from "next/link";
import { useContext, useEffect, useState } from "react"
import { FaRegUser } from "react-icons/fa6";
import { LuCircleAlert } from "react-icons/lu";

export default function SavedPosts() {
    const [savedPosts, setSavedPosts] = useState<AddPosteTypes[]>([]);
    const { userInfo } = useContext(shareInfo);

    /*---> Fetch All Posts <---*/
    const getSavedPosts = async () => {
        try {
            const response = await savedPostsApi();
            setSavedPosts(response ?? []);
        } catch (error) {
            console.error("Problem Get Posts:", error);
        }
    }
    /*<-- Like post and send postId to database -->*/
    const likePost = async (id: number | null) => {
        try {
            likeApi(id ?? null);
            getSavedPosts();
        } catch (error) {
            console.error("Error like post:", error);
        }
    }
    /*<-- Save post and send postId to database -->*/
    const savePost = async (id: number | null) => {
        try {
            saveApi(id ?? null);
            getSavedPosts();
        } catch (error) {
            console.error("Error save post:", error);
        }
    }

    useEffect(() => {
        getSavedPosts();
    }, [])
    return <>
        <div className="w-full">
            {savedPosts && savedPosts?.length > 0 ? (
                savedPosts?.map((item: AddPosteTypes) => (
                    <div key={item?.id} className="w-1/3 flex flex-col bg-white rounded-lg">
                        <div className="flex flex-col px-5">
                            {/* <!-- User-Info --> */}
                            <div className="w-full pt-4 flex justify-between items-center">
                                <Link href={`/profiles/${item?.user_id}`} className="flex items-center gap-3">
                                    <div className="p-[10px] border border-black rounded-full text-[17px]">
                                        <FaRegUser />
                                    </div>
                                    <h1>{item?.username ?? "loading.."}</h1>
                                </Link>
                                <div className="w-1/2 flex justify-end items-center gap-1 text-blue-500 cursor-pointer">
                                    {/* <button className={`${item?.user_id !== userInfo?.id ? 'flex' : 'hidden'} ${verfication([], [], userInfo, item?.user_id ?? null, readStates?.following ?? [])} px-[18px] py-[6px] border border-blue-500 rounded-full`}
                                            onClick={() => following(item?.user_id ?? null)}>
                                            {verfication([], [], userInfo, item?.user_id ?? null, readStates?.following ?? []) === 'bg-blue-500 text-white' ? 'Unfolow' : 'folow'}
                                        </button> */}
                                </div>
                            </div>
                            {/* <!-- Title --> */}
                            <div className="w-full pt-5 flex flex-col">
                                <p className="text-xl">{item?.title}</p>
                            </div>
                            {/* <!-- Description --> */}
                            <div className="w-full py-6 flex flex-col">
                                <p className="text-sm">{item?.body}</p>
                            </div>
                        </div>
                        {/* <!-- Picture --> */}
                        <div className="w-full h-[50vh] lg:max-h-[500px] bg-center Background-Size" style={{ backgroundImage: "url(https://media.licdn.com/dms/image/v2/D4E22AQFkEbrAfiv3fw/feedshare-shrink_2048_1536/B4EZP9yHfeHkAo-/0/1735129602184?e=1738800000&v=beta&t=DDAsooUXL9K8CTDcQw4u1squ5CFtZ8riZTOAi7XFG-o)" }}></div>
                        {/* <!-- Actions --> */}
                        <ul className="w-full py-5 flex gap-8 px-5">
                            <li className={`flex items-center gap-[5px] cursor-pointer ${verfication(item?.likes ?? [], [], userInfo, item?.user_id ?? null, [], [])}`}
                                onClick={() => likePost(item?.id ?? null)}>
                                <i className='bx bxs-heart text-[18px]'></i>
                                <h1>Jadore</h1>
                            </li>
                            <li className="flex items-center gap-[5px] cursor-pointer">
                                <i className='bx bxs-comment text-[18px]'></i>
                                <h1>Comment</h1>
                            </li>
                            <li className={`flex items-center gap-[5px] cursor-pointer ${verfication([], item?.saves ?? [], userInfo, item?.user_id ?? null, [], [])}`}
                                onClick={() => savePost(item?.id ?? null)}>
                                <i className='bx bxs-bookmarks text-[18px]'></i>
                                <h1>Enregistrer</h1>
                            </li>
                        </ul>
                    </div>
                ))
            ) : (
                <div className="w-full h-[50vh] flex flex-col gap-3 justify-center items-center bg-white">
                    <LuCircleAlert className="text-5xl" />
                    <h1 className="text-xl">you dont have posts liked!</h1>
                </div>
            )
            }
        </div>
    </>
}