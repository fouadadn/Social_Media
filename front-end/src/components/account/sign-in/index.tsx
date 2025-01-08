'use client'

import { GetAccountApi } from '@/api/account';
import { setEmail, setPassword } from '@/slices/signinSlice';
import { AccountTypes } from '@/types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AccountSignIn() {
    const [SignIn, setSignIn] = useState<AccountTypes>({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const Navigate = useRouter();

    const HandelChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignIn((prevstate: AccountTypes) => ({ ...prevstate, [name]: value }))
    }

    const CreateAccount = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setEmail(SignIn.email || ''));
        dispatch(setPassword(SignIn.password || ''));
        try {
            const response = await GetAccountApi(SignIn);
            if (response.token) {
                localStorage.setItem("Token", response.token);
                alert(response.message || '');
                Navigate.push('/');
                SignIn.email = "";
                SignIn.password = "";
            }
            else if (response.message === "email or password is incorrect") {
                alert(response.message);
            }
        } catch (error) {
            return console.log(error);
        }
    }
    return <>
        <section className="w-full h-screen flex justify-center gap-4 p-2">
            <div className="w-[60%] h-full rounded-xl Background-Size hidden lg:flex" style={{ backgroundImage: "url(https://www.luxcafeclub.com/cdn/shop/articles/Minimalist_Modern_Coffee_Shop_1_1200x1200.png?v=1713243107)" }}>
            </div>
            <div className="w-full lg:w-[40%] 2xl:max-w-[1600px] h-full flex justify-center items-center lg:py-28 px-4 xl:px-10">
                <form onSubmit={CreateAccount} className="w-full h-full flex flex-col items-center justify-center lg:justify-start 2xl:justify-center text-center gap-8 lg:gap-5">
                    <div className='flex flex-col gap-3'>
                        <h1 className="text-4xl font-bold">Sign In</h1>
                        <p className="text-gray">Sign In to Contact Many Person.</p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-1">
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Email" type="email" className="w-full" name='email' onChange={HandelChanges} />
                        </Box>
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Password" type="password" className="w-full" name='password' onChange={HandelChanges} />
                        </Box>
                        <div className="w-full flex flex-col items-center gap-3 mt-5">
                            <button type='submit' className="w-full py-3 text-lg bg-blue-500 text-white rounded-md duration-500 hover:bg-green-500">
                                Sign In
                            </button>
                            <Link href="/sign-up">You Dont have account?<span className="ml-1 text-gray cursor-pointer">Sign Up</span></Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </>
}