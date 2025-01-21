'use client'

import { loginUser } from '@/api/account';
import { AccountTypes } from '@/types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import Cookies from 'js-cookie';

export default function AccountSignIn() {
    const [account, setAccount] = useState<AccountTypes>({ email: '', password: '' });
    const navigate = useRouter();
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAccount((prevstate: AccountTypes) => ({ ...prevstate, [name]: value }))
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationEmail = account?.email?.trim() !== "";
        const validationPassword = account?.password?.trim() !== "";
        if (!validationEmail || !validationPassword) {
            toast.warning("Please fill in all the fields.");
            return
        }
        await Login();
    }

    const Login = async () => {
        setLoading(true);
        try {
            const response = await loginUser(account ?? {});
            if (response.token) {
                Cookies.set("Token", response.token, { expires: 5 });
                toast.success("Login successfully.");
                setAccount({ email: '', password: '' });
                navigate.push('/');
                return
            }
            else if (response?.message === "email or password is incorrect") {
                toast.error("email or password is incorrect");
                return
            }
            else {
                toast.error("Something went wrong, please try again later.");
                return
            }
        }
        catch (error) { console.error("Error Login:", error) }
        finally { setLoading(false) }
    }
    return <>
        <section className="w-full h-screen flex justify-center gap-4 p-2 relative">
            <div className="w-[60%] 2xl:hidden h-full rounded-xl Background-Size hidden lg:flex" style={{ backgroundImage: "url(https://www.luxcafeclub.com/cdn/shop/articles/Minimalist_Modern_Coffee_Shop_1_1200x1200.png?v=1713243107)" }}>
            </div>
            <div className="w-full lg:w-[40%] 2xl:max-w-[50rem] h-full flex justify-center items-center lg:py-28 px-4 xl:px-10">
                <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center justify-center lg:justify-start 2xl:justify-center text-center gap-8 lg:gap-5">
                    <div className='flex flex-col gap-3'>
                        <h1 className="text-4xl font-bold">Sign In</h1>
                        <p className="text-gray">Sign In to Contact Many Person.</p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-1">
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Email" type="email" className="w-full" name='email' value={account?.email} onChange={handleInputChange} />
                        </Box>
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Password" type="password" className="w-full" name='password' value={account?.password} onChange={handleInputChange} />
                        </Box>
                        <div className="w-full flex flex-col items-center gap-3 mt-5">
                            <button type='submit' disabled={loading} className="w-full flex justify-center items-center gap-3 py-[14px] text-lg bg-black text-white rounded-md">
                                Sign In
                                <div className={`p-[9px] rounded-full animate-spin border-l-2 border-l-white ${loading ? "flex" : "hidden"}`}></div>
                            </button>
                            <Link href="/sign-up">You Dont have account?<span className="ml-1 text-gray cursor-pointer text-blue-500">Sign Up</span></Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className='w-full flex justify-center bottom-0 absolute'>
                <Toaster position="bottom-center" expand={true} richColors />
            </div>
        </section>
    </>
}