'use client'

import { GetUserInfoApi } from "@/api/user";
import { AccountTypes } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ShareInfoContextType {
    userInfo: AccountTypes,
    setuserInfo: (userInfo: AccountTypes) => void
}

export const shareInfo = createContext<ShareInfoContextType | undefined>(undefined)

export default function ShareProvider({ children }: { children: ReactNode }) {
    const [userInfo, setuserInfo] = useState<AccountTypes>({});

    const GetUserInfo = async () => {
        try {
            const response = await GetUserInfoApi(localStorage.getItem("Token") || "")
            setuserInfo(response || {})
        } catch (error) {
            return console.log("Problem read user information:", error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("Token")) {
            GetUserInfo();
        } else {
            return console.log("You dont have Token!")
        }
    }, [])

    return <>
        <shareInfo.Provider value={{ userInfo, setuserInfo }}>
            {children}
        </shareInfo.Provider>
    </>
}