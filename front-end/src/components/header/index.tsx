'use client'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
    const [ChangeUrl, setChangeUrl] = useState<string>('');
    const Pathname = usePathname();

    useEffect(() => {
        switch (Pathname) {
            case '/':
                setChangeUrl("Home")
                break;
            case '/reseau':
                setChangeUrl("Reseau")
                break;
            case '/messagerie':
                setChangeUrl("Messagerie")
                break;
            case '/':
                setChangeUrl("Home")
                break;
            default:
                if (Pathname.startsWith('/profile')) {
                    setChangeUrl('Profile')
                }
                else {
                    setChangeUrl('');
                }
        }
    }, [Pathname]);

    return <>
        <header className="w-full py-[13px] flex justify-center mb-3 bg-white shadow-sm">
            <div className="w-full lg:max-w-[1200px] h-full flex justify-between items-center lg:px-4 xl:px-0">
                <div className="w-[30%] lg:flex items-center hidden">
                    <Box className="w-5/6">
                        <TextField fullWidth rows={1} type="text" className="w-full" size="small" label="Search" name="LastName" />
                    </Box>
                </div>
                <ul className="w-full lg:w-[35%] flex justify-center gap-10 items-center px-2 lg:px-0 text-[13px]">
                    <Link href="/" className={`flex flex-col items-center gap-[1px] cursor-pointer ${ChangeUrl === 'Home' ? 'border-b-2 border-black' : ''}`}>
                        <i className='bx bx-home text-[20px]'></i>
                        <h1>Accueil</h1>
                    </Link>
                    <Link href="/profile" className={`flex flex-col items-center gap-[1px] cursor-pointer ${ChangeUrl === 'Profile' ? 'border-b-2 border-black' : ''}`}>
                        <i className='bx bxs-user-account text-[20px]'></i>
                        <h1>Profile</h1>
                    </Link>
                    <Link href="/" className={`flex flex-col items-center gap-[1px] cursor-pointer ${ChangeUrl === 'Reseau' ? 'border-b-2 border-black' : ''}`}>
                        <i className='bx bx-universal-access text-[20px]'></i>
                        <h1>Reseau</h1>
                    </Link>
                    <Link href="/" className={`flex flex-col items-center gap-[1px] cursor-pointer ${ChangeUrl === 'Messagerie' ? 'border-b-2 border-black' : ''}`}>
                        <i className='bx bxs-chat text-[20px]'></i>
                        <h1>Messagerie</h1>
                    </Link>
                </ul>
                <div className='w-[30%] lg:flex justify-end items-center hidden'>
                    <button className='px-4 py-2 text-sm bg-blue-600 text-white rounded-md'>
                        Log out
                    </button>
                </div>
            </div>
        </header>
    </>
}