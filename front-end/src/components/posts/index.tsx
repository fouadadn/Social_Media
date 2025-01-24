'use client'

import { createPostApi, fetchPostsApi, updatePostApi, deletePostApi, fetchUserPostsApi } from "@/api/post";
import { setActions, setActionsComments, setCardsPost, setCommentPost, setEditePost, setFollowing, setLoading, setMessage, setReplyComment, setshowComments, setShowReplay, setUsersLiked } from "@/slices/postsSlice";
import { AddPosteTypes, CommentsTypes } from "@/types";
import { useCallback, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { LuCircleAlert } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";
import { shareInfo } from "@/context/contextApi";
import { FiEdit } from "react-icons/fi";
import { MdRemoveCircleOutline } from "react-icons/md"
import { FollowingApi, newFollowing } from "@/api/following";
import { verfication } from "@/utils";
import { RootState } from "@/store/store";
import { likeApi, saveApi, savedPostsApi } from "@/api/postActions";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { AddCommentApi, LikeCommentApi, RemoveCommentApi, ReplyCommentApi } from "@/api/comments";
import { JSX } from "@emotion/react/jsx-runtime";
import { Toaster, toast } from 'sonner';
import { setPosts } from "@/slices/postsSlice";

export default function Posts({ ChangeDirect, width, Action }: { ChangeDirect?: React.ReactNode, width?: React.ReactNode, Action?: React.ReactNode }): JSX.Element {
    /*---> States <---*/
    const [addPost, setAddPost] = useState<AddPosteTypes>({ title: '', body: '', image: null });
    const { userInfo } = useContext(shareInfo);
    const reduxDispatch = useDispatch();
    const readStates = useSelector((state: RootState) => state.posts);

    /*---> Change state to show cardPost <---*/
    const ChangeState = (): void => {
        reduxDispatch(setCardsPost(!readStates?.cardsPost));
        setAddPost({ title: '', body: '', image: null });
        reduxDispatch(setEditePost(null));
    };
    /*---> Change states <---*/
    const ShowActions = (index: number | null, Actions: string): void => {
        if (Actions === "Post") reduxDispatch(setActions(readStates?.actions === index ? null : index));
        else if (Actions === "Comment") reduxDispatch(setshowComments(readStates?.showComments === index ? null : index));
        else if (Actions === "ActionsComment") reduxDispatch(setActionsComments(readStates?.actionsComments === index ? null : index));
        else if (Actions === "ShowReplyComment") reduxDispatch(setShowReplay(readStates?.showReplay === index ? null : index));
        return
    }
    /*---> Handel Values <---*/
    const handleInputChange = useCallback(((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>): void => {
        const { name, value } = e.target;
        if (name === "image") {
            setAddPost((prevstate: AddPosteTypes) => ({ ...prevstate, [name]: e.target.files ? e.target.files[0] : '' }));
            return
        }
        setAddPost((prevstate: AddPosteTypes) => ({ ...prevstate, [name]: value }));
    }), []);
    const handelChangeComment = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        if (name === "commentPost") {
            reduxDispatch(setCommentPost(value));

        } else if (name === "replyComment") {
            reduxDispatch(setReplyComment(value));
        }
        console.log("Error Comment Post");
        return
    }, []);

    /*---> Fetch All Posts <---*/
    const getPosts = async (): Promise<void> => {
        try {
            let response;
            if (ChangeDirect === "fetchUserPostsApi") {
                response = await fetchUserPostsApi();
                reduxDispatch(setMessage("You dont have posts!"))
            } else if (ChangeDirect === "savedPostsApi") {
                response = await savedPostsApi();
                reduxDispatch(setMessage("You dont have SavedPosts!"))
            } else {
                response = await fetchPostsApi();
                reduxDispatch(setMessage("We dont have Posts!"))
            }
            reduxDispatch(setPosts(response ?? []));
        } catch (error) {
            console.error("Problem Fetching:", error);
        } finally {
            reduxDispatch(setLoading(false));
        }
    }
    /*<-- Take information newPost at redux and send to database -->*/
    const CreatePost = async (): Promise<void> => {
        try {
            const newPost = new FormData();
            newPost.append('title', addPost?.title ?? '');
            newPost.append('body', addPost?.body ?? '');
            if (addPost?.image) newPost.append('image', addPost?.image);
            const response = await createPostApi(newPost || {});
            if (response?.message === 'post create succusfuly') toast.success("Post Create Succusfuly");
            getPosts();
            ChangeState();
        } catch (error) {
            console.error("Problem Create Post:", error);
        }
    }
    /*<-- Tcheck if create or update post -->*/
    const handlePostAction = (): void => {
        if (readStates?.editePost) {
            UpdatePost();
        } else {
            CreatePost();
        }
    }
    /*<-- delete post -->*/
    const deletePost = async (id: number | null): Promise<void> => {
        try {
            const response = await deletePostApi(id ?? null);
            if (response?.message === 'post deleted succussfuly') toast.warning("Post Delete Succusfuly");
            getPosts();
        } catch (error) {
            console.error("Problem Remove Post:", error);
        }
    }
    /*<-- Tcheck post at table posts and send his information -->*/
    const EditePost = (id: number | null): void => {
        const findPost = readStates?.posts?.find((item: AddPosteTypes) => item?.id === id);
        if (findPost) {
            reduxDispatch(setEditePost(id))
            reduxDispatch(setCardsPost(true));
            setAddPost({ title: findPost?.title ?? '', body: findPost?.body ?? '' });
        }
    }
    /*<-- Take id post modify and newInformation and send to database -->*/
    const UpdatePost = async (): Promise<void> => {
        try {
            const response = await updatePostApi(readStates?.editePost ?? null, addPost);
            if (response?.mesaage === 'post updated succusfuly') toast.info("Post Update Succusfuly");
            getPosts()
            ChangeState();
        } catch (error) {
            console.error("Problem Update Post:", error);
        }
    }
    /*<-- Like post and send postId to database -->*/
    const likePost = async (id: number | null): Promise<void> => {
        try {
            await likeApi(id ?? null);
            getPosts();
        } catch (error) {
            console.error("Error like post:", error);
        }
    }
    /*<-- Save post and send postId to database -->*/
    const savePost = async (id: number | null): Promise<void> => {
        try {
            await saveApi(id ?? null);
            getPosts();
        } catch (error) {
            console.error("Error save post:", error);
        }
    }
    /*<-- Following people and send userId to database -->*/
    const following = async (id: number | null): Promise<void> => {
        try {
            const haja = await newFollowing(id ?? null);
            console.log(haja)
            getFollowing();
        } catch (error) {
            console.error("Error following:", error);
        }
    }
    /*<-- Get all following -->*/
    const getFollowing = async (): Promise<void> => {
        try {
            const response = await FollowingApi();
            reduxDispatch(setFollowing(response?.data ?? []));
        } catch (error) {
            console.error("Error get following:", error);
        }
    }
    /*<-- Add New Comment -->*/
    const addComment = async (id: number | null): Promise<void> => {
        try {
            await AddCommentApi(id ?? null, readStates?.commentPost ?? '');
            getPosts();
            reduxDispatch(setCommentPost(''));
        } catch (error) {
            console.error("Error Comment post:", error);
        }
    }
    /*<-- Remove Comment -->*/
    const removeComment = async (id_post: number | null, id_comment: number | null): Promise<void> => {
        try {
            await RemoveCommentApi(id_post ?? null, id_comment ?? null);
            getPosts();
        } catch (error) {
            console.error("Error Remove Comment in post:", error);
        }
    }
    /*<-- Like Comment -->*/
    const LikeComment = async (id: number | null): Promise<void> => {
        try {
            await LikeCommentApi(id ?? null);
            getPosts();
        } catch (error) {
            console.error("Error Remove Comment in post:", error);
        }
    }
    /*<-- Reply Comment -->*/
    const ReplyComment = async (id: number | null): Promise<void> => {
        try {
            await ReplyCommentApi(id ?? null, readStates?.replyComment ?? '');
            getPosts();
            reduxDispatch(setReplyComment(''));
            reduxDispatch(setShowReplay(null));
        } catch (error) {
            console.error("Error Remove Comment in post:", error);
        }
    }
    /*<-- Get all posts when i open application -->*/
    useEffect(() => {
        Promise.all(
            [getPosts(), getFollowing()]
        ).catch((error) => console.error("Error fetching data:", error));
    }, []);

    return <>
        <div className={`w-full lg:w-[${width}] h-full flex flex-col gap-3 lg:gap-4 relative`}>
            <div className={`w-full flex gap-3 items-center ${Action ? "flex" : "hidden"} py-3 px-5 rounded-lg bg-white border-t border-b border-gray-200`}>
                <div className="p-[10px] border border-black rounded-full text-[17px]">
                    <FaRegUser />
                </div>
                <div className="w-full px-5 py-[15px] bg-gray-200 text-[15px] cursor-pointer rounded-full"
                    onClick={ChangeState}>
                    <h1>Create New Post</h1>
                </div>
            </div>
            <div className="w-full flex flex-col gap-3 rounded-xl">
                {readStates?.loading ? (
                    <div className="w-full h-[20rem] flex justify-center items-center bg-white">
                        <iframe
                            src="https://lottie.host/embed/4dcaf26b-f660-49c2-974f-30d36cd3ac6a/DLnw3V4GAo.lottie"
                            className="w-full h-full"
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                ) : (
                    readStates?.posts && readStates?.posts?.length > 0 ? (
                        readStates?.posts?.map((item: AddPosteTypes, index) => (
                            <div key={index} className="flex flex-col bg-white rounded-lg">
                                <div className="flex flex-col px-5">
                                    <div className="w-full pt-4 flex justify-between items-center">
                                        <Link href={`/profiles/${item?.user_id}`} className="flex items-center gap-3">
                                            <div className="p-[10px] border border-black rounded-full text-[17px]">
                                                <FaRegUser />
                                            </div>
                                            <h1>{item?.username ?? "loading.."}</h1>
                                        </Link>
                                        <div className="w-1/2 flex justify-end items-center gap-1 text-blue-500 cursor-pointer">
                                            <button className={`${item?.user_id !== userInfo?.id ? 'flex' : 'hidden'} ${verfication([], [], userInfo, item?.user_id ?? null, readStates?.following ?? [], [])} px-[18px] py-[6px] border border-blue-500 rounded-full`}
                                                onClick={() => following(item?.user_id ?? null)}>
                                                {verfication([], [], userInfo, item?.user_id ?? null, readStates?.following ?? [], []) === 'bg-blue-500 text-white' ? 'Unfolow' : 'folow'}
                                            </button>
                                            <div className={`flex items-center gap-2 ${item?.user_id === userInfo?.id ? 'flex' : 'hidden'}`}>
                                                <div className={`${item?.id === readStates?.actions ? '' : 'hidden'} flex justify-end items-center gap-3`}>
                                                    <FiEdit className="text-green-500 text-[20px]"
                                                        onClick={() => EditePost(item?.id ?? null)} />
                                                    <MdRemoveCircleOutline className="text-red-500 text-[21px]"
                                                        onClick={() => deletePost(item?.id ?? null)} />
                                                </div>
                                                <CiMenuKebab className="text-2xl" onClick={() => ShowActions(item?.id ?? null, "Post")} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full pt-5 flex flex-col">
                                        <p className="text-xl">{item?.title}</p>
                                    </div>
                                    <div className="w-full py-6 flex flex-col">
                                        <p className="text-sm">{item?.body}</p>
                                    </div>
                                </div>
                                {/* <!-- Picture --> */}
                                <div className={`w-full h-[50vh] bg-blue-200 lg:max-h-[500px] bg-center Background-Size ${item?.image ? "flex" : "hidden"}`}
                                    style={{ backgroundImage: `url(http://127.0.0.1:8000/storage/${item?.image})` }}>
                                </div>
                                {/* <!-- Actions --> */}
                                <ul className="w-full py-5 flex gap-8 px-5">
                                    <li className={`flex items-center gap-[5px] cursor-pointer ${verfication(item?.likes ?? [], [], userInfo, item?.user_id ?? null, [], [])}`}
                                        onClick={() => likePost(item?.id ?? null)}>
                                        <i className='bx bxs-heart text-[20px]'></i>
                                        <h1>{item?.likes?.length}</h1>
                                    </li>
                                    <li className="flex items-center gap-[5px] cursor-pointer"
                                        onClick={() => ShowActions(item?.id ?? null, "Comment")}>
                                        <i className='bx bxs-comment text-[18px]'></i>
                                        <h1>{item?.comments?.length}</h1>
                                    </li>
                                    <li className={`flex items-center gap-[5px] cursor-pointer ${verfication([], item?.saves ?? [], userInfo, item?.user_id ?? null, [], [])}`}
                                        onClick={() => savePost(item?.id ?? null)}>
                                        <i className='bx bxs-bookmarks text-[18px]'></i>
                                        <h1>{item?.saves?.length}</h1>
                                    </li>
                                    <li className="flex items-center gap-[5px] cursor-pointer">
                                        <i className='bx bx-share text-[18px]'></i>
                                        <h1>Share</h1>
                                    </li>
                                </ul>
                                {/* <!-- Add Comments --> */}
                                <div className={`w-full flex items-center gap-3 px-5 pb-2 ${readStates?.showComments === item?.id ? 'flex' : 'hidden'}`}>
                                    <input
                                        type="text"
                                        placeholder="Add Comment"
                                        className="w-full pl-5 text-black placeholder:text-gray-500 focus:outline-none py-3 rounded-full border border-gray-500"
                                        onChange={handelChangeComment}
                                        name="commentPost"
                                        value={readStates?.commentPost} />
                                    <button className="px-5 py-2 bg-blue-500 text-white rounded-lg" onClick={() => addComment(item?.id ?? null)}>
                                        Add
                                    </button>
                                </div>
                                {/* <!-- Show Comments --> */}
                                <div className={`w-full flex flex-col gap-3 ${readStates?.showComments === item?.id ? 'flex' : 'hidden'}`}>
                                    {item?.comments?.map((comment: CommentsTypes, index: number) => (
                                        <div key={index} className="w-full flex flex-col items-start gap-1 py-3 pl-4 pr-4">
                                            <div className="w-full flex justify-between items-center gap-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-[10px] border border-black rounded-full text-[17px]">
                                                        <FaRegUser />
                                                    </div>
                                                    <ul className="flex flex-col">
                                                        <li>{comment?.username}</li>
                                                        <li>{comment?.body}</li>
                                                    </ul>
                                                </div>
                                                <div className={`flex items-center gap-2 ${comment?.id === readStates?.showReplay ? 'flex' : 'hidden'}`}>
                                                    <input
                                                        type="text"
                                                        placeholder="Reply Comment"
                                                        value={readStates?.replyComment}
                                                        name="replyComment"
                                                        onChange={handelChangeComment}
                                                        className="w-full pl-5 py-2 text-black placeholder:text-gray-500 focus:outline-none rounded-full border border-gray-500" />
                                                    <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg"
                                                        onClick={() => ReplyComment(comment?.id ?? null)}>
                                                        Add
                                                    </button>
                                                </div>
                                                <div className={`flex items-center gap-2 ${comment?.user_id === userInfo?.id ? 'flex' : 'hidden'}`}>
                                                    <MdRemoveCircleOutline className={`text-red-500 text-[21px] cursor-pointer ${comment?.id === readStates?.actionsComments ? '' : 'hidden'}`}
                                                        onClick={() => removeComment(item?.id ?? null, comment?.id ?? null)} />
                                                    <CiMenuKebab className="text-2xl cursor-pointer" onClick={() => ShowActions(comment?.id ?? null, "ActionsComment")} />
                                                </div>
                                            </div>
                                            <div className="flex gap-4 ml-12">
                                                <button className={`text-[15px] ${comment?.user_id !== userInfo?.id ? 'flex' : 'hidden'}`}
                                                    onClick={() => ShowActions(comment?.id ?? null, "ShowReplyComment")}>
                                                    Reply
                                                </button>
                                                <li className={`flex items-center gap-[5px] cursor-pointer ${verfication([], [], userInfo, item?.user_id ?? null, [], comment?.likes ?? [])}`}
                                                    onClick={() => LikeComment(comment?.id ?? null)}>
                                                    <i className='bx bxs-heart text-[17px]'></i>
                                                    <h1>{comment?.likes?.length}</h1>
                                                </li>
                                            </div>
                                            <div className={`w-full flex flex-col gap-3 mt-2 ml-12 ${comment?.replies.length > 0 ? "flex" : "hidden"}`}>
                                                {comment?.replies?.map((reply: CommentsTypes, index: number) => (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-[10px] border border-black rounded-full text-[17px]">
                                                                <FaRegUser />
                                                            </div>
                                                            <ul className="flex flex-col">
                                                                <li>{reply?.username}</li>
                                                                <li>{reply?.body}</li>
                                                            </ul>
                                                        </div>
                                                        <MdRemoveCircleOutline className={`text-red-500 text-[21px] cursor-pointer`}
                                                            onClick={() => removeComment(item?.id ?? null, reply?.id ?? null)} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full h-[30vh] flex flex-col gap-3 justify-center items-center bg-white">
                            <LuCircleAlert className="text-5xl" />
                            <h1 className="text-xl">{readStates?.message}</h1>
                        </div>
                    )
                )}
            </div>
            <div className={`w-[38rem] fixed ${readStates?.cardsPost ? 'flex' : 'hidden'} flex-col gap-5 px-5 py-5 rounded-md bg-white shadow-lg`}>
                <div className="w-full h-5/6 flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-[10px] border border-black rounded-full text-[17px]">
                                <FaRegUser />
                            </div>
                            <h1>{userInfo?.name}</h1>
                        </div>
                        <i className='bx bx-x text-3xl cursor-pointer' onClick={ChangeState}></i>
                    </div>
                    <input
                        type="text"
                        placeholder="Title Post"
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
                    <div className={`w-full h-[12rem] flex justify-end items-start p-4 text-white bg-center Background-Size ${addPost?.image ? 'flex' : 'hidden'}`}
                        style={{ backgroundImage: `url(${addPost?.image ? URL.createObjectURL(addPost?.image) : ''})` }}>
                        <i className='bx bx-x px-1 py-1 text-[20px] bg-blue-500 text-white rounded-md cursor-pointer'
                            onClick={() => setAddPost({ ...addPost, image: null })}></i>
                    </div>
                </div>
                <div className="w-full flex gap-2 items-center">
                    <div className="relative overflow-hidden">
                        <input type="file" name="image" onChange={handleInputChange} className="absolute opacity-0" />
                        <button className="px-3 py-2 bg-green-500 text-white rounded-lg">Picture</button>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handlePostAction}>
                        {readStates?.editePost ? 'Modify' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
        <div className="w-full py-5 absolute bottom-0">
            <Toaster position="bottom-right" expand={true} richColors />
        </div>
    </>
}