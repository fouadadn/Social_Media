import { AccountTypes } from "@/types";

// Register New Account
export const registerNewAccount = async (newAccount: AccountTypes) => {
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
        console.error("Error Register New Account:", error);
    }
}

// User Login
export const loginUser = async (userInformation: AccountTypes) => {
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
        console.error("Error Login:", error);
    }
}
