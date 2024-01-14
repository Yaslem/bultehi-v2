import Sidebar from "./components/Sidebar";

export default function Layout({children, params}){
    return (
        <section className={"flex h-full"}>
            <Sidebar />
            <main className={"flex-grow"}>
                {children}
            </main>
        </section>
    )
}