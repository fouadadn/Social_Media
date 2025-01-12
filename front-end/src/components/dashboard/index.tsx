'use client'

import { createPostApi, fetchUserPostsApi, updatePostApi, deletePostApi } from "@/api/post";
import { shareInfo } from "@/context/contextApi";
import { AddPosteTypes } from "@/types";
import Link from "next/link";
import { useContext, useEffect, useReducer, useState } from "react";
import { LuCircleAlert } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { MdRemoveCircleOutline } from "react-icons/md"
import { CiMenuKebab } from "react-icons/ci";
import { AddLikeApi } from "@/api/like";
import { verfication } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { setActions, setCardsPost, setEditePost, setLoading, setPosts } from "@/slices/dashoardSlice";
import { RootState } from "@/store/store";

export default function Dashboard() {
    /*---> States <---*/
    const [addPost, setAddPost] = useState<AddPosteTypes>({ title: '', body: '' });
    const { userInfo } = useContext(shareInfo);
    const reduxDispatch = useDispatch();
    const readStates = useSelector((state: RootState) => state.dashboardSlice);

    /*---> Change state to show cardPost <---*/
    const ChangeState = (): void => {
        reduxDispatch(setCardsPost(!readStates?.cardsPost));
        setAddPost({ title: '', body: '' });
    };
    /*---> Change state to show actions button <---*/
    const ShowActions = (index: number): void => {
        reduxDispatch(setActions(readStates?.actions === index ? null : index));
    }
    /*---> Handel Values <---*/
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAddPost((prevstate: AddPosteTypes) => ({ ...prevstate, [name]: value }));
    }
    /*---> Fetch All Posts <---*/
    const getUserPosts = async () => {
        try {
            const response = await fetchUserPostsApi();
            reduxDispatch(setPosts(response ?? []));
        } catch (error) {
            console.error("Problem Get UserPost:", error);
        } finally {
            reduxDispatch(setLoading(false));
        }
    }
    /*<-- Take information newPost and send to database -->*/
    const createNewPost = async () => {
        try {
            const response = await createPostApi(addPost ?? {});
            await getUserPosts();
            alert(response?.message);
            setAddPost({ title: '', body: '' });
        } catch (error) {
            console.error("Problem Create Post:", error);
        } finally {
            reduxDispatch(setCardsPost(false));
        }
    }
    /*<-- Tcheck if create or update post -->*/
    const handlePostAction = (): void => {
        if (readStates?.editePost) {
            UpdatePost();
        } else {
            createNewPost();
        }
    }
    /*<-- delete post -->*/
    const deletePost = async (id: number) => {
        try {
            const response = await deletePostApi(id);
            await getUserPosts();
            alert(response?.message);
        } catch (error) {
            console.error("Problem Remove Post:", error);
        }
    }
    /*<-- Tcheck post at table posts and send his information -->*/
    const EditePost = (id: number) => {
        const FindTask = readStates?.posts?.find((item: AddPosteTypes) => item?.id === id);
        if (FindTask) {
            reduxDispatch(setEditePost(id))
            reduxDispatch(setCardsPost(true));
            setAddPost(FindTask);
        }
    }
    /*<-- Take id post modify and newInformation and send to database -->*/
    const UpdatePost = async () => {
        try {
            const response = await updatePostApi(readStates?.editePost ?? 0, addPost);
            alert(response?.mesaage);
            await getUserPosts();
            reduxDispatch(setCardsPost(false));
        } catch (error) {
            console.error("Problem Update UserPost:", error);
        }
    }
    /*<-- Like post and send postId to database -->*/
    const likePost = async (id: number) => {
        try {
            const response = await AddLikeApi(id);
            console.log(response?.message ?? '');
            await getUserPosts();
        } catch (error) {
            console.error("Error add like to post:", error);
        }
    }
    /*<-- Get all posts user created -->*/
    useEffect(() => {
        getUserPosts();
    }, []);

    return <>
        <div className="w-full h-full flex flex-wrap lg:flex-nowrap gap-5">
            <div className="w-full lg:w-[45%] h-full flex flex-col gap-5">
                <div className="w-full h-full bg-white rounded-md">
                    <div className="w-full px-4 pt-[20px] pb-[120px] flex justify-end Background-Size" style={{ backgroundImage: "url(https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-6016x3384-8324.png)", borderRadius: '8px 8px 0px 0px' }}>
                        <i className='bx bx-paint text-white text-[18px] p-2 bg-blue-500 cursor-pointer rounded-full'></i>
                    </div>
                    <div className="w-full h-full flex pb-8 px-5 lg:px-10">
                        <div className="w-1/2 flex flex-col items-start gap-3">
                            <div className="p-1 rounded-full mt-[-4rem] lg:mt-[-5rem] bg-white">
                                <div className="w-full h-full p-16 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            </div>
                            <div className="flex flex-col gap-1 lg:pl-2">
                                <h1>{userInfo?.name ?? 'loading..'}</h1>
                                <h1>{userInfo?.email ?? 'loading..'}</h1>
                            </div>
                        </div>
                        <div className="w-1/2 h-full flex justify-center pt-5 lg:items-center text-center gap-5 text-lg">
                            <div>
                                <h1>Folowers</h1>
                                <h1>{userInfo?.followers?.length ?? 0}</h1>
                            </div>
                            <div>
                                <h1>Folowing</h1>
                                <h1>{userInfo?.following?.length ?? 0}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full py-5 flex flex-col gap-6 bg-white rounded-md">
                    <div className="w-full flex justify-between items-center px-5">
                        <div className="flex items-center gap-4 cursor-pointer">
                            <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            <Link href={`/profile/${userInfo?.id}`}>Ahmed Hariri</Link>
                        </div>
                        <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                            Follow
                        </button>
                    </div>
                    <div className="w-full flex justify-between items-center px-5">
                        <div className="flex items-center gap-4 cursor-pointer">
                            <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            <Link href={`/profile/${userInfo?.id}`}>Ahmed Hariri</Link>
                        </div>
                        <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                            Follow
                        </button>
                    </div>
                    <div className="w-full flex justify-between items-center px-5">
                        <div className="flex items-center gap-4 cursor-pointer">
                            <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            <Link href={`/profile/${userInfo?.id}`}>Ahmed Hariri</Link>
                        </div>
                        <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                            Follow
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-[55%] rounded-md flex flex-col gap-3 relative">
                <div className="w-full flex gap-3 items-center py-3 px-5 rounded-lg bg-white border-t border-b border-gray-200">
                    <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                    <div className="w-full px-5 py-[15px] bg-gray-200 text-[15px] cursor-pointer rounded-full" onClick={ChangeState}>
                        <h1>Create New Poste</h1>
                    </div>
                </div>
                <div className="w-full h-5/6 flex flex-col gap-3">
                    {readStates?.loading ? (
                        <div className="w-full h-full flex justify-center items-center bg-white">
                            <iframe
                                src="https://lottie.host/embed/4dcaf26b-f660-49c2-974f-30d36cd3ac6a/DLnw3V4GAo.lottie"
                                className="w-full h-full"
                                style={{ border: 'none' }}
                            ></iframe>
                        </div>
                    ) : (
                        readStates?.posts && readStates?.posts?.length > 0 ? (
                            readStates?.posts?.map((item: AddPosteTypes) => (
                                <div key={item?.id} className="w-full flex flex-col rounded-md bg-white">
                                    <div className="flex flex-col px-5">
                                        {/* <!-- User-Info --> */}
                                        <div className="w-full pt-4 flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                                                <h1>{userInfo?.name}</h1>
                                            </div>
                                            <div className="w-1/2 flex justify-end items-center gap-3 text-blue-500 cursor-pointer">
                                                <div className={`w-full h-full flex ${item?.id === readStates?.actions ? '' : 'hidden'} justify-end items-center gap-3`}>
                                                    <FiEdit className="text-green-500" onClick={() => EditePost(item?.id ?? 0)} />
                                                    <MdRemoveCircleOutline className="text-red-500 text-lg" onClick={() => deletePost(item?.id ?? 0)} />
                                                </div>
                                                <CiMenuKebab className={`text-2xl ${item?.user_id === userInfo?.id ? 'flex' : 'hidden'}`} onClick={() => ShowActions(item.id ?? 0)} />
                                            </div>
                                        </div>
                                        {/* <!-- Title --> */}
                                        <div className="w-full pt-5 flex flex-col">
                                            <p className="text-sm">{item?.title}</p>
                                        </div>
                                        {/* <!-- Description --> */}
                                        <div className="w-full py-5 flex flex-col">
                                            <p className="text-sm">{item?.body}</p>
                                        </div>
                                    </div>
                                    {/* <!-- Picture --> */}
                                    <div className="w-full h-[50vh] lg:max-h-[600px] bg-center Background-Size" style={{ backgroundImage: "url(https://media.licdn.com/dms/image/v2/D4E22AQFkEbrAfiv3fw/feedshare-shrink_2048_1536/B4EZP9yHfeHkAo-/0/1735129602184?e=1738800000&v=beta&t=DDAsooUXL9K8CTDcQw4u1squ5CFtZ8riZTOAi7XFG-o)" }}></div>
                                    {/* <!-- Actions --> */}
                                    <ul className="w-full py-5 flex gap-8 px-5">
                                        <li className={`flex items-center gap-[5px] cursor-pointer ${verfication(item?.likes ?? [], 0, userInfo)}`} onClick={() => likePost(item?.id ?? 0)}>
                                            <i className='bx bxs-heart text-[18px]'></i>
                                            <h1>Jadore</h1>
                                        </li>
                                        <li className="flex items-center gap-[5px] cursor-pointer">
                                            <i className='bx bxs-comment text-[18px]'></i>
                                            <h1>Comment</h1>
                                        </li>
                                        <li className="flex items-center gap-[5px] cursor-pointer">
                                            <i className='bx bxs-bookmarks text-[18px]'></i>
                                            <h1>Enregistrer</h1>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-full flex flex-col gap-3 justify-center items-center bg-white">
                                <div className="flex flex-col items-center gap-3">
                                    <LuCircleAlert className="text-5xl" />
                                    <h1 className="text-xl">You dont have posts!</h1>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h1>You Want Create Post?</h1>
                                    <button className="text-blue-500" onClick={ChangeState}>Create Post!</button>
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className={`w-full h-4/6 ${readStates?.cardsPost ? 'flex' : 'hidden'} absolute flex-col gap-32 px-5 py-5 rounded-md bg-white shadow-lg`}>
                    <div className="w-full h-full flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                                <h1>{userInfo?.name}</h1>
                            </div>
                            <i className='bx bx-x text-3xl cursor-pointer' onClick={ChangeState}></i>
                        </div>
                        <input
                            type="text"
                            placeholder="Tittle Post"
                            className="text-black placeholder:text-gray-500 focus:outline-none"
                            name="title"
                            onChange={handleInputChange}
                            value={addPost?.title} />
                        <textarea
                            placeholder="Description Post"
                            className="h-full text-black placeholder:text-gray-500 focus:outline-none resize-none"
                            name="body"
                            onChange={handleInputChange}
                            value={addPost?.body} />
                    </div>
                    <div className="w-full h-1/6 flex gap-2 items-center">
                        <div className="relative overflow-hidden">
                            <input type="file" name="Picture" className="absolute opacity-0" />
                            <button className="px-3 py-2 bg-green-500 text-white rounded-lg">Picture</button>
                        </div>
                        <button className="px-4 py-2 hover:bg-transparent bg-blue-500 hover:text-blue-500 text-white duration-500 border border-blue-500 rounded-lg"
                            onClick={handlePostAction}>
                            {readStates?.editePost ? 'Modify' : 'Post'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}