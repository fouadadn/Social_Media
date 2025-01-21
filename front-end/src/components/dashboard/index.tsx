'use client'

import { shareInfo } from "@/context/contextApi";
import { AccountTypes } from "@/types";
import { useCallback, useContext, useState } from "react";
import Profiles from "../profiles";
import { FaRegUser } from "react-icons/fa6";
import Posts from "../posts";
import { fetchUserPostsApi } from "@/api/post";

export default function Dashboard() {
    /*---> States <---*/
    const [addPictures, setAddPictures] = useState<AccountTypes>({ profile: null, backGround: null });
    const { userInfo } = useContext(shareInfo);

    /*---> Handel Values <---*/
    const handleInputChange = useCallback(((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>): void => {
        const { name } = e.target;
        setAddPictures((prevstate: any) => ({ ...prevstate, [name]: e.target.files ? e.target.files[0] : '' }));
    }), []);
    
    return <>
        <div className="w-full h-full flex flex-wrap lg:flex-nowrap gap-5">
            <div className="w-full lg:w-[45%] h-full flex flex-col gap-5">
                <div className="w-full h-full bg-white rounded-md">
                    <div className="w-full px-4 pt-[20px] pb-[120px] flex justify-end Background-Size" style={{ backgroundImage: "url(https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-6016x3384-8324.png)", borderRadius: '8px 8px 0px 0px' }}>
                        <i className='bx bx-paint text-white text-[18px] p-2 bg-blue-500 cursor-pointer rounded-full'></i>
                    </div>
                    <div className="w-full h-full flex justify-between pb-8 px-5 lg:px-10">
                        <div className="w-[40%] flex flex-col items-center gap-3">
                            <div className="mt-[-4rem] lg:mt-[-3.8rem] flex relative cursor-pointer changeProfile">
                                <div className="w-full h-full p-[31px] border-b border-black bg-white rounded-full text-[45px]">
                                    <FaRegUser />
                                </div>
                                <div className="w-full h-full bg-[#1a4bffc1] absolute rounded-full">
                                    <div className="w-full h-full flex justify-center items-center relative">
                                        <i className='bx bx-paint text-white text-4xl'></i>
                                        <input type="file" name="profile" onChange={handleInputChange} className="absolute opacity-0" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="p-1 rounded-full mt-[-4rem] lg:mt-[-5rem] bg-white">
                                <div className="w-full h-full p-16 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            </div> */}
                            <div className="flex flex-col text-center gap-1 lg:pl-2">
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
                <div className="w-full h-full bg-white rounded-md">
                    <Profiles width="w-full" />
                </div>
            </div>
            <div className="w-[55%] h-5/6 flex flex-col gap-3">
                <Posts ChangeDirect={"fetchUserPostsApi"} width="100%" Action={true}/>
            </div>
        </div>
    </>
}