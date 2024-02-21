import Sidebar from "./components/Sidebar";
import Notify from "./components/Notify";

export default function Layout({children, params}){
    return (
        <section className={"flex h-full"}>
            <Sidebar />
            <main className={"flex-grow flex flex-col"}>
                <Notify />
                {children}
            </main>
        </section>
    )
}