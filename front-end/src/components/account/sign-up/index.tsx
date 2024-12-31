'use client'

import { setEmail, setFirstName, setLastName, setPassword, setPasswordConfirmation } from '@/slices/signupSlice';
import { AccountTypes } from '@/types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AccountSignUp() {
    const [SignUp, setSignUp] = useState<AccountTypes>({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        PasswordConfirmation: ''
    });
    const dispatch = useDispatch();
    // const values = useSelector((state: any) => state.signup);

    const HandelChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignUp((prevstate: AccountTypes) => ({ ...prevstate, [name]: value }))
    }

    const CreateAccount = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setFirstName(SignUp.FirstName || ''));
        dispatch(setLastName(SignUp.LastName || ''));
        dispatch(setEmail(SignUp.Email || ''));
        dispatch(setPassword(SignUp.Password || ''));
        dispatch(setPasswordConfirmation(SignUp.PasswordConfirmation || ''));
    }
    return <>
        <section className="w-full h-screen flex justify-center gap-4 p-2">
            <div className="w-[60%] h-full rounded-xl Background-Size hidden lg:flex" style={{ backgroundImage: "url(https://www.luxcafeclub.com/cdn/shop/articles/Minimalist_Modern_Coffee_Shop_1_1200x1200.png?v=1713243107)" }}>
            </div>
            <div className="w-full lg:w-[40%] 2xl:max-w-[1600px] h-full flex justify-center items-center lg:py-28 px-4 xl:px-10">
                <form onSubmit={CreateAccount} className="w-full h-full flex flex-col items-center justify-center lg:justify-start 2xl:justify-center text-center gap-8 lg:gap-5">
                    <div className='flex flex-col gap-3'>
                        <h1 className="text-4xl font-bold">Sign Up</h1>
                        <p className="text-gray">Sign Up to Contact Many Person.</p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-1">
                        <div className='w-full flex gap-3'>
                            <Box className="w-1/2 mt-2">
                                <TextField fullWidth label="First Name" className="w-full" name='FirstName' onChange={HandelChanges} />
                            </Box>
                            <Box className="w-1/2 mt-2">
                                <TextField fullWidth label="Last Name" className="w-full" name='LastName' onChange={HandelChanges} />
                            </Box>
                        </div>
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Email" type="email" className="w-full" name='Email' onChange={HandelChanges} />
                        </Box>
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Password" type="password" className="w-full" name='Password' onChange={HandelChanges} />
                        </Box>
                        <Box className="w-full mt-2">
                            <TextField fullWidth label="Password Cofirmation" type="password" className="w-full" name='PasswordConfirmation' onChange={HandelChanges} />
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