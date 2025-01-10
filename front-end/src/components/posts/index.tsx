'use client'

import { createPostApi, fetchPostsApi, updatePostApi, deletePostApi } from "@/api/post";
import { setBody, setTitle } from "@/slices/addposte";
import { AccountTypes, AddPosteTypes } from "@/types";
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { LuCircleAlert } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";
import { shareInfo } from "@/context";
import { FiEdit } from "react-icons/fi";
import { MdRemoveCircleOutline } from "react-icons/md"
import { AddLikeApi } from "@/api/like";
import { newFollowing } from "@/api/following";
import { verfication } from "@/utils";

export default function Posts() {
    const [cardsPost, setCardsPost] = useState<boolean>(false);
    const [addPost, setAddPost] = useState<AddPosteTypes>({ title: '', body: '' });
    const [posts, setPosts] = useState<AddPosteTypes[]>([]);
    const [isPostReady, setIsPostReady] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [actions, setActions] = useState<number | null>(null);
    const [editePost, seteditePost] = useState<number | null>(null);
    const { userInfo } = useContext(shareInfo);
    const dispatch = useDispatch();
    const reduxPoste = useSelector((state: any) => state.addPostes);

    const ChangeState = (): void => setCardsPost((prevstate: boolean) => !prevstate);
    const ShowActions = (index: number): void => setActions((prevstate: number | null) => prevstate === index ? null : index);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setAddPost((prevstate: AddPosteTypes) => ({ ...prevstate, [name]: value }));
    }

    const getPosts = async () => {
        try {
            const response = await fetchPostsApi();
            setPosts(response || []);
        } catch (error) {
            console.error("Problem Get Posts:", error);
        } finally {
            setLoading(false);
        }
    }

    const AddNewInformation = async () => {
        dispatch(setTitle(addPost?.title || ''));
        dispatch(setBody(addPost?.body || ''));
        setAddPost({ title: '', body: '' });
        setCardsPost(false);
        if (editePost) {
            setIsPostReady(false);
        } else {
            setIsPostReady(true);
        }
    }

    const CreatePost = async () => {
        try {
            const response = await createPostApi(reduxPoste || {});
            await getPosts();
            if (response?.message === 'post create succusfuly') {
                alert(response.message)
            }
        } catch (error) {
            console.error("Problem Create Post:", error);
        }
    }

    const deletePost = async (id: number) => {
        try {
            const response = await deletePostApi(id);
            await getPosts();
            alert(response?.message);
        } catch (error) {
            console.error("Problem Remove Post:", error);
        }
    }

    const EditePost = (id: number): void => {
        const findPost = posts.find((item: AddPosteTypes) => item?.id === id);
        if (findPost) {
            seteditePost(id);
            setCardsPost(true);
            setAddPost(findPost);
        }
    }

    const UpdatePost = async () => {
        try {
            const response = await updatePostApi(editePost ?? 0, reduxPoste);
            alert(response?.mesaage);
            await getPosts();
            setCardsPost(false);
        } catch (error) {
            console.error("Problem Update Post:", error);
        }
    }

    const likePost = async (id: number) => {
        try {
            const response = await AddLikeApi(id);
            console.log(response?.message ?? '');
            await getPosts();
        } catch (error) {
            console.error("Error add like to post:", error);
        }
    }

    const following = async (id: number) => {
        try {
            const response = await newFollowing(id);
            console.log(response?.message ?? '');
        } catch (error) {
            console.error("Error following:", error);
        }
    }

    useEffect(() => {
        if (isPostReady) {
            CreatePost();
            setIsPostReady(false);
        } else if (editePost) {
            UpdatePost();
        }
    }, [reduxPoste, isPostReady]);

    useEffect(() => {
        getPosts();
    }, []);

    return <>
        <div className="w-full lg:w-[50%] h-full flex flex-col gap-3 lg:gap-4 relative">
            <div className="w-full flex gap-3 items-center py-3 px-5 rounded-lg bg-white border-t border-b border-gray-200">
                <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                <div className="w-full px-5 py-[15px] bg-gray-200 text-[15px] cursor-pointer rounded-full" onClick={ChangeState}>
                    <h1>Create New Poste</h1>
                </div>
            </div>
            <div className="w-full flex flex-col gap-3">
                {loading ? (
                    <div className="w-full h-[20rem] flex justify-center items-center bg-white">
                        <iframe
                            src="https://lottie.host/embed/4dcaf26b-f660-49c2-974f-30d36cd3ac6a/DLnw3V4GAo.lottie"
                            className="w-full h-full"
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                ) : (
                    posts && posts?.length > 0 ? (
                        posts?.map((item: AddPosteTypes) => (
                            <div key={item?.id} className="flex flex-col bg-white rounded-lg">
                                <div className="flex flex-col px-5">
                                    {/* <!-- User-Info --> */}
                                    <div className="w-full pt-4 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                                            <h1>Ahmed Hariri</h1>
                                        </div>
                                        <div className="w-1/2 flex justify-end items-center gap-1 text-blue-500 cursor-pointer">
                                            <button className={`${item?.user_id !== userInfo?.id ? 'flex' : 'hidden'} ${verfication([], item?.user_id ?? 0, userInfo)} px-[18px] py-[6px] border border-blue-500 rounded-full`}
                                                onClick={() => following(item?.user_id ?? 0)}>
                                                {verfication([], item?.user_id ?? 0, userInfo) === 'bg-blue-500 text-white' ? 'Unfolow' : 'folow'}
                                            </button>
                                            <div className={`flex items-center gap-2 ${item?.user_id === userInfo?.id ? 'flex' : 'hidden'}`}>
                                                <div className={`flex ${item?.id === actions ? '' : 'hidden'} justify-end items-center gap-3`}>
                                                    <FiEdit className="text-green-500 text-[20px]" onClick={() => EditePost(item?.id ?? 0)} />
                                                    <MdRemoveCircleOutline className="text-red-500 text-[21px]" onClick={() => deletePost(item?.id ?? 0)} />
                                                </div>
                                                <CiMenuKebab className="text-2xl" onClick={() => ShowActions(item.id ?? 0)} />
                                            </div>
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
                                    <li className={`flex items-center gap-[5px] cursor-pointer ${verfication(item?.likes ?? [], item?.user_id ?? 0, userInfo)}`}
                                        onClick={() => likePost(item?.id ?? 0)}>
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
                        <div className="w-full h-[20vh] flex flex-col gap-3 justify-center items-center bg-white">
                            <LuCircleAlert className="text-5xl" />
                            <h1 className="text-xl">We dont have posts!</h1>
                        </div>
                    )
                )}
            </div>
            <div className={`w-full absolute ${cardsPost ? 'flex' : 'hidden'} flex-col gap-32 px-5 py-5 rounded-md bg-white shadow-lg`}>
                <div className="w-full h-5/6 flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            <h1>Ahmed Hariri</h1>
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
                        <input type="file" name="Picture" onChange={handleInputChange} className="absolute opacity-0" />
                        <button className="px-3 py-2 bg-green-500 text-white rounded-lg">Picture</button>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={AddNewInformation}>
                        {editePost ? 'Modify' : 'Post'}
                    </button>
                </div>
            </div>
        </div>
    </>
}