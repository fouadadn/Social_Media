import { AccountTypes } from "@/types";

// Sign-Up
export const AddNewAccountApi = async (newAccount: AccountTypes) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json',
            },
            body: JSON.stringify(newAccount)
        });

        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

// Sign-In
export const GetAccountApi = async (userInformation: AccountTypes) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json',
            },
            body: JSON.stringify(userInformation)
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}
