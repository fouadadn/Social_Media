import Profile from "@/components/profile"

export default function Home() {
    return <>
        <section className="w-full h-full flex justify-center">
            <div className="w-full 2xl:max-w-[1200px] h-full flex justify-between flex-wrap lg:flex-nowrap gap-2 p-4 lg:px-0 lg:pt-2">
                <Profile />
                <div className="w-[50%] h-full bg-yellow-500">

                </div>
                <div className="w-[25%] h-full bg-green-500">

                </div>
            </div>
        </section>
    </>
}