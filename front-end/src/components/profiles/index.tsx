'use client';

import { fetchUsersApi } from "@/api/user";
import { AccountTypes, AddPosteTypes, ApiResponse } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";

export default function Profiles() {
    const [profiles, setProfiles] = useState<ApiResponse>({ data: [] });
    const [loading, setLoading] = useState<boolean>(true);

    const GetUsers = async () => {
        try {
            const response = await fetchUsersApi();
            setProfiles(response || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        GetUsers();
    }, []);

    return <>
        <div className="w-full lg:w-[28%] h-full py-5 lg:flex flex-col gap-6 bg-white rounded-md hidden">
            {loading ? (
                <div className="w-full h-[20vh] flex items-center justify-center">
                    <h1>Loading...</h1>
                </div>
            ) :
                profiles?.data?.length ?? 0 > 0 ? (
                    profiles?.data?.map((profile: AccountTypes, index: number) => (
                        <div key={index} className="w-full flex justify-between items-center px-5">
                            <Link href={`/profiles/${profile?.id}`} className="flex items-center gap-4 cursor-pointer">
                                <div className="p-[10px] border border-black rounded-full text-[17px]">
                                    <FaRegUser />
                                </div>
                                <h1>{profile?.name}</h1>
                            </Link>
                            <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                                Follow
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="w-full h-[20vh] flex items-center justify-center">
                        <h1>We dont have any user!</h1>
                    </div>
                )}
        </div>
    </>
}