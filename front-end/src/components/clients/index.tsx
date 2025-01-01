import Link from "next/link";

export default function Clients() {
    return <>
        <div className="w-full lg:w-[36%] h-full py-5 flex flex-col gap-6 bg-white rounded-md">
            <div className="w-full flex justify-between items-center px-5">
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                    <Link href="/profile/0">Ahmed Hariri</Link>
                </div>
                <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                    Follow
                </button>
            </div>
            <div className="w-full flex justify-between items-center px-5">
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                    <Link href="/profile/0">Ahmed Hariri</Link>
                </div>
                <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                    Follow
                </button>
            </div>
            <div className="w-full flex justify-between items-center px-5">
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                    <Link href="/profile/0">Ahmed Hariri</Link>
                </div>
                <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                    Follow
                </button>
            </div>
        </div>
    </>
}