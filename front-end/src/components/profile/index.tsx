import Link from "next/link";

export default function Profile() {
    return <>
        <div className="w-full lg:w-[25%] h-full flex flex-col">
            <div className="w-full h-full flex flex-wrap bg-white">
                <div className="w-full py-14 lg:py-10 Background-Size" style={{ backgroundImage: "url(https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-6016x3384-8324.png)", borderRadius: '8px 8px 0px 0px' }}></div>
                <div className="w-full h-full flex flex-col pb-6 gap-2 items-center" style={{ borderRadius: '0px 0px 8px 8px' }}>
                    <div className="p-1 rounded-full mt-[-4rem] lg:mt-[-3rem] bg-white">
                        <div className="w-full h-full p-16 lg:p-12 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                    </div>
                    <Link href="/profile/0" className="text-xl lg:text-base font-[500]">Ahmed Hariri</Link>
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-2 text-[15px] lg:text-[13px] border-t border-b border-gray-200 px-4 py-[12px] bg-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-500">Followers</h1>
                    <h1 className="text-blue-700">280</h1>
                </div>
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-500">Following</h1>
                    <h1 className="text-blue-700">60</h1>
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-3 text-[15px] lg:text-[13px] border-b border-b-gray-200 px-4 py-[12px] bg-white">
                <div className="flex gap-[8px] items-center cursor-pointer hover:text-green-500 duration-500 text-gray-500">
                    <i className='bx bxs-bookmarks text-[15px] text-green-500'></i>
                    <h1>Éléments enregistrés</h1>
                </div>
                <div className="flex gap-[8px] items-center cursor-pointer hover:text-red-500 duration-500 text-gray-500">
                    <i className='bx bxs-heart text-[15px] text-red-500'></i>
                    <h1>Éléments aimes</h1>
                </div>
            </div>
        </div>
    </>
}