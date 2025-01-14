'use client'

import { registerNewAccount } from '@/api/account';
import { setEmail, setName, setPassword, setPasswordConfirmation } from '@/slices/signupSlice';
import { AccountTypes } from '@/types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AccountSignUp() {
    const [account, setAccount] = useState<AccountTypes>({ name: '', email: '', password: '', password_confirmation: '' });
    const reduxDispatch = useDispatch();
    const navigate = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAccount((prevstate: AccountTypes) => ({ ...prevstate, [name]: value }))
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        reduxDispatch(setName(account.name || ''));
        reduxDispatch(setEmail(account.email || ''));
        reduxDispatch(setPassword(account.password || ''));
        reduxDispatch(setPasswordConfirmation(account.password_confirmation || ''));
        await signUp();
    }

    const signUp = async () => {
        try {
            const response = await registerNewAccount(account ?? {});
            if (response.token) {
                localStorage.setItem("Token", response.token);
                alert(response.message || '');
                setAccount({ name: '', email: '', password: '', password_confirmation: '' });
                navigate.push('/');
            }
            else if (response.message === "The email has already been taken.") {
                alert(response.message);
            }
        } catch (error) {
            console.error("Error Register:", error);
        }
    }

    return <>
        <section className="w-full h-screen flex justify-center gap-4 p-2">
            <div className="w-[60%] h-full rounded-xl Background-Size hidden lg:flex" style={{ backgroundImage: "url(https://www.luxcafeclub.com/cdn/shop/articles/Minimalist_Modern_Coffee_Shop_1_1200x1200.png?v=1713243107)" }}>
            </div>
            <div className="w-full lg:w-[40%] 2xl:max-w-[1600px] h-full flex justify-center items-center lg:py-28 px-4 xl:px-10">
                <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center justify-center lg:justify-start 2xl:justify-center text-center gap-8 lg:gap-5">
                    <div className='flex flex-col gap-3'>
                        <h1 className="text-4xl font-bold">Sign Up</h1>
                        <p className="text-gray">Sign Up to Contact Many Person.</p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-1">
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Name" className="w-full" name='name' onChange={handleInputChange} />
                        </Box>
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Email" type="email" className="w-full" name='email' onChange={handleInputChange} />
                        </Box>
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Password" type="password" className="w-full" name='password' onChange={handleInputChange} />
                        </Box>
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Password Cofirmation" type="password" className="w-full" name='password_confirmation' onChange={handleInputChange} />
                        </Box>
                        <div className="w-full flex flex-col items-center gap-3 mt-5">
                            <button type='submit' className="w-full py-3 text-lg bg-blue-500 text-white rounded-md duration-500 hover:bg-green-500">
                                Sign Up
                            </button>
                            <Link href="/sign-in">Already have an account?<span className="ml-1 text-gray cursor-pointer">Sign In</span></Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </>
}