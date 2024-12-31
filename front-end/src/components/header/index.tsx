import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Header() {
    return <>
        <header className="w-full py-[14px] flex justify-center mb-3 bg-white shadow-sm">
            <div className="w-full lg:max-w-[1200px] h-full flex justify-between items-center lg:px-4 xl:px-0">
                <div className="w-[30%] lg:flex items-center hidden">
                    <Box className="w-5/6">
                        <TextField fullWidth rows={1} type="text" className="w-full" size="medium" label="Search" name="LastName" />
                    </Box>
                </div>
                <ul className="w-full lg:w-[35%] flex justify-around items-center px-2 lg:px-0">
                    <li className="flex flex-col items-center gap-[1px] cursor-pointer border-b-2 border-black">
                        <i className='bx bx-home text-[24px]'></i>
                        <h1>Accueil</h1>
                    </li>
                    <li className="flex flex-col items-center gap-[1px] cursor-pointer">
                        <i className='bx bx-universal-access text-[24px]'></i>
                        <h1>Reseau</h1>
                    </li>
                    <li className="flex flex-col items-center gap-[1px] cursor-pointer">
                        <i className='bx bxs-chat text-[24px]'></i>
                        <h1>Messagerie</h1>
                    </li>
                    <li className="flex flex-col items-center gap-[1px] cursor-pointer">
                        <i className='bx bxs-user-account text-[24px]'></i>
                        <h1>Account</h1>
                    </li>
                </ul>
                <div className='w-[30%] lg:flex justify-end items-center hidden'>
                    <button className='px-4 py-2 text-lg bg-blue-600 text-white rounded-md'>
                        Log out
                    </button>
                </div>
            </div>
        </header>
    </>
}