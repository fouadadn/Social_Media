import Posts from "@/components/posts"
import Profile from "@/components/profile"
import Profiles from "@/components/profiles"


export default function Home() {
    return <>
        <section className="w-full h-full flex justify-center">
            <div className="w-full lg:max-w-[1200px] h-full flex justify-between flex-wrap lg:flex-nowrap relative gap-5 p-4 lg:py-4 xl:px-0 lg:pt-2">
                <Profile />
                <Posts />
                <Profiles />
            </div>
        </section>
    </>
}