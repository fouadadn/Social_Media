'use client'

import { setDescription, setPicture } from "@/slices/addposte";
import { AddPosteTypes } from "@/types";
import { useState } from "react"
import { useDispatch } from "react-redux";

export default function Postes() {
    const [CardsPost, setCardsPost] = useState<boolean>(false);
    const [AddPoste, setAddPoste] = useState<AddPosteTypes>({ Description: '', Picture: null });
    const dispatch = useDispatch();
    // const postes = useSelector((state: any) => state.addPostes);
    // console.log(postes);

    const ChangeState = (): void => setCardsPost((prevstate: boolean) => !prevstate);
    const HandelChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAddPoste((prevstate: AddPosteTypes) => ({ ...prevstate, [name]: value }))
    }
    const CreatePoste = (): void => {
        dispatch(setDescription(AddPoste.Description || ''));
        dispatch(setPicture(AddPoste.Picture || null));
        setAddPoste({ Description: '', Picture: null });
        setCardsPost(false);
    }

    return <>
        <div className="w-full lg:w-[50%] h-full flex flex-col gap-3 lg:gap-4 relative">
            <div className="w-full flex gap-3 items-center py-3 px-5 rounded-lg bg-white border-t border-b border-gray-200">
                <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                <div className="w-full px-5 py-[15px] bg-gray-200 text-[15px] cursor-pointer rounded-full" onClick={ChangeState}>
                    <h1>Create New Poste</h1>
                </div>
            </div>
            <div className="w-full flex flex-col bg-white rounded-lg">
                <div className="flex flex-col px-5">
                    {/* <!-- User-Info --> */}
                    <div className="w-full pt-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            <h1>Ahmed Hariri</h1>
                        </div>
                        <div className="flex items-center gap-1 text-blue-500 cursor-pointer">
                            <i className='bx bx-plus text-lg'></i>
                            <h1>Follow</h1>
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
            <div className={`w-full h-1/2 absolute ${CardsPost ? 'flex' : 'hidden'} flex-col px-5 py-3 rounded-md bg-white shadow-lg`}>
                <div className="w-full h-5/6 flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-6 rounded-full Background-Size" style={{ backgroundImage: "url(https://ahmed-hrr.vercel.app/Assets/ahmed-1.jpg)" }}></div>
                            <h1>Ahmed Hariri</h1>
                        </div>
                        <i className='bx bx-x text-3xl cursor-pointer' onClick={ChangeState}></i>
                    </div>
                    <textarea placeholder="Add description to your post" className="h-full text-black placeholder:text-gray-500 focus:outline-none resize-none" name="Description" onChange={HandelChanges} value={AddPoste.Description} />
                </div>
                <div className="w-full h-1/6 flex gap-2 items-center">
                    <div className="relative overflow-hidden">
                        <input type="file" name="Picture" onChange={HandelChanges} className="absolute opacity-0" />
                        <button className="px-3 py-2 bg-green-500 text-white rounded-lg">Picture</button>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={CreatePoste}>Post</button>
                </div>
            </div>
        </div>
    </>
}