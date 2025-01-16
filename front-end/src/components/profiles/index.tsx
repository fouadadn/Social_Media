import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";

export default function Profiles() {
    return <>
        <div className="w-full lg:w-[28%] h-full py-5 lg:flex flex-col gap-6 bg-white rounded-md hidden">
            <div className="w-full flex justify-between items-center px-5">
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="p-[10px] border border-black rounded-full text-[17px]">
                        <FaRegUser />
                    </div>
                    <Link href="/profiles/0">User name</Link>
                </div>
                <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                    Follow
                </button>
            </div>
            <div className="w-full flex justify-between items-center px-5">
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="p-[10px] border border-black rounded-full text-[17px]">
                        <FaRegUser />
                    </div>
                    <Link href="/profiles/0">User name</Link>
                </div>
                <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                    Follow
                </button>
            </div>
            <div className="w-full flex justify-between items-center px-5">
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="p-[10px] border border-black rounded-full text-[17px]">
                        <FaRegUser />
                    </div>
                    <Link href="/profiles/0">User name</Link>
                </div>
                <button className="px-4 py-[6px] hover:bg-blue-600 hover:text-white duration-500 text-sm text-blue-500 border border-blue-500 rounded-full">
                    Follow
                </button>
            </div>
        </div>
    </>
}