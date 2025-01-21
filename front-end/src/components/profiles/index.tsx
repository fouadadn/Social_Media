'use client';

import { FollowingApi, newFollowing } from "@/api/following";
import { fetchUsersApi } from "@/api/user";
import { shareInfo } from "@/context/contextApi";
import { AccountTypes, AddPosteTypes, ApiResponse } from "@/types";
import { verfication } from "@/utils";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";

export default function Profiles({ width }: { width: React.ReactNode }) {
    /*<-- States -->*/
    const [profiles, setProfiles] = useState<ApiResponse>({ data: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const [followingProfile, setFollowingProfile] = useState<AccountTypes[]>([]);
    const { userInfo } = useContext(shareInfo)

    /*<-- Following people and send userId to database -->*/
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
    /*<-- Following people and send userId to database -->*/
    const following = async (id: number | null): Promise<void> => {
        try {
            const response = await newFollowing(id ?? null);
            console.log(response?.message);
            getFollowing();
        } catch (error) {
            console.error("Error following:", error);
        }
    }
    /*<-- Get all following -->*/
    const getFollowing = async (): Promise<void> => {
        try {
            const response = await FollowingApi();
            setFollowingProfile(response ?? []);
        } catch (error) {
            console.error("Error get following:", error);
        }
    }
    useEffect(() => {
        GetUsers();
        getFollowing()
    }, []);

    return <>
        <div className={`${width} h-full py-5 lg:flex flex-col gap-6 bg-white rounded-md hidden`}>
            {loading ? (
                <div className="w-full h-[20vh] flex flex-col items-center justify-center gap-4 text-blue-500">
                    <div className="w-[2.5rem] h-[2.5rem] animate-spin rounded-full border-l-2 border-blue-500"></div>
                    <h1>Loading...</h1>
                </div>
            ) :
                profiles?.data?.length ?? 0 > 0 ? (
                    profiles?.data?.map((profile: AccountTypes, index: number) => (
                        <div key={index} className="w-full flex justify-between items-center px-5">
                            <Link href={`/profile/${profile?.id}`} className="flex items-center gap-4 cursor-pointer">
                                <div className="p-[10px] border border-black rounded-full text-[17px]">
                                    <FaRegUser />
                                </div>
                                <h1>{profile?.name}</h1>
                            </Link>
                            <button className={`${verfication([], [], userInfo, profile?.id ?? null, followingProfile ?? [], [])} text-blue-500 px-[18px] py-[6px] border border-blue-500 rounded-full`}
                                onClick={() => following(profile?.id ?? null)}>
                                {verfication([], [], userInfo, profile?.id ?? null, followingProfile ?? [], []) === 'bg-blue-500 text-white' ? 'Unfolow' : 'folow'}
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