'use client'

import { fetchUserInfo } from "@/api/user";
import { AccountTypes } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ShareInfoContextType {
    userInfo: AccountTypes,
    setuserInfo: (userInfo: AccountTypes) => void
}

const initialState: ShareInfoContextType = {
    userInfo: {},
    setuserInfo: () => { }
}

export const shareInfo = createContext<ShareInfoContextType>(initialState)

export default function ShareProvider({ children }: { children: ReactNode }) {
    const [userInfo, setuserInfo] = useState<AccountTypes>({});
    const route = useRouter();

    const GetUserInfo = async () => {
        try {
            const response = await fetchUserInfo(localStorage.getItem("Token") || "")
            setuserInfo(response || {});
        } catch (error) {
            return console.log("Problem read user information:", error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("Token")) {
            GetUserInfo();
        }
        else {
            route.push("/sign-up");
            return console.log("You dont have Token!")
        }
    }, [route]);


    return <>
        <shareInfo.Provider value={{ userInfo, setuserInfo }}>
            {children}
        </shareInfo.Provider>
    </>
}