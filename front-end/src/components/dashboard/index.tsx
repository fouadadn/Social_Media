import Link from "next/link";

export default function Dashboard({ userId }: { userId: number }) {
    console.log(userId)
    return <>
        <div className="w-full h-full flex flex-wrap lg:flex-nowrap gap-5">
            <div className="w-full lg:w-[45%] h-full flex flex-col gap-5">
                <div className="w-full h-full bg-white rounded-md">
                    <div className="w-full px-4 pt-[20px] pb-[120px] flex justify-end Background-Size" style={{ backgroundImage: "url(https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-6016x3384-8324.png)", borderRadius: '8px 8px 0px 0px' }}>
                        <i className='bx bx-paint text-white text-[18px] p-2 bg-blue-500 cursor-pointer rounded-full'></i>
                    </div>
                    <div className="w-full h-[20vh] flex px-5 lg:px-10">
                        <div className="w-1/2 flex flex-col items-start gap-3">
                            <div className="p-1 rounded-full mt-[-4rem] lg:mt-[-5rem] bg-white">
                                <div className="w-full h-full p-16 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            </div>
                            <div className="flex flex-col gap-1 lg:pl-2">
                                <h1>Ahmed Hariri</h1>
                                <h1>AhmedHariri58@gmail.com</h1>
                            </div>
                        </div>
                        <div className="w-1/2 h-full flex justify-center pt-5 lg:pt-0 lg:items-center text-center gap-5 text-lg">
                            <div>
                                <h1>Folowers</h1>
                                <h1>60</h1>
                            </div>
                            <div>
                                <h1>Folowing</h1>
                                <h1>50</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full py-5 flex flex-col gap-6 bg-white rounded-md">
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
            </div>
            <div className="w-full lg:w-[55%] flex flex-col bg-white rounded-lg">
                <div className="flex flex-col px-5">
                    {/* <!-- User-Info --> */}
                    <div className="w-full pt-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            <h1>Ahmed Hariri</h1>
                        </div>
                    </div>
                    {/* <!-- Description --> */}
                    <div className="w-full py-5 flex flex-col">
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
                            dolores omnis commodi! Fugit asperiores expedita, unde veritatis ipsam
                            molestias corporis illum praesentium. Officia a ex perspiciatis eius eaque,
                            minus eos odit dignissimos, ut impedit ipsum adipisci dolorem enim debitis
                            dolorum recusandae nisi illum, ratione quidem labore qui nemo veniam vitae!
                            Suscipit optio atque consectetur quas voluptatum sunt, rerum dolor corporis
                            rem quam, omnis accusantium delectus ea, laboriosam repudiandae commodi earum
                            facere id autem natus enim vitae temporibus tempore. Sapiente, ipsam!
                        </p>
                    </div>
                </div>
                {/* <!-- Picture --> */}
                <div className="w-full h-[50vh] lg:max-h-[600px] bg-center Background-Size" style={{ backgroundImage: "url(https://media.licdn.com/dms/image/v2/D4E22AQFkEbrAfiv3fw/feedshare-shrink_2048_1536/B4EZP9yHfeHkAo-/0/1735129602184?e=1738800000&v=beta&t=DDAsooUXL9K8CTDcQw4u1squ5CFtZ8riZTOAi7XFG-o)" }}></div>
                {/* <!-- Actions --> */}
                <ul className="w-full py-5 flex gap-8 px-5">
                    <li className="flex items-center gap-[5px] cursor-pointer text-red-500">
                        <i className='bx bxs-heart text-[18px]'></i>
                        <h1>Jadore</h1>
                    </li>
                    <li className="flex items-center gap-[5px] cursor-pointer text-gray-500">
                        <i className='bx bxs-comment text-[18px]'></i>
                        <h1>Comment</h1>
                    </li>
                    <li className="flex items-center gap-[5px] cursor-pointer text-green-500">
                        <i className='bx bxs-bookmarks text-[18px]'></i>
                        <h1>Enregistrer</h1>
                    </li>
                </ul>
            </div>
        </div>
    </>
}