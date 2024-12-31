import Postes from "@/components/postes"
import Profile from "@/components/profile"

export default function Home() {
    return <>
        <section className="w-full h-full flex justify-center">
            <div className="w-full lg:max-w-[1200px] h-full flex justify-between flex-wrap lg:flex-nowrap gap-5 p-4 lg:py-4 xl:px-0 lg:pt-2">
                <Profile />
                <Postes />
                <div className="w-[25%] h-full bg-green-500">

                </div>
            </div>
        </section>
    </>
}