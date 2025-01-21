import Dashboard from "@/components/dashboard"

export default async function Profle({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params
    return <>
        <section className="w-full h-full flex justify-center">
            <div className="w-full lg:max-w-[1200px] h-full flex justify-between flex-wrap lg:flex-nowrap relative gap-5 p-4 lg:py-4 xl:px-0 lg:pt-2">
                <Dashboard />
            </div>
        </section>
    </>
}