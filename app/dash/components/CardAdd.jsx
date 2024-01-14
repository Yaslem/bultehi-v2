"use client"
import {IoClose} from "react-icons/io5";

export default function CardAdd(
    {
        children,
        title,
        onClick
    }) {
    return (
        <section className={"absolute z-50 w-full h-full bg-black/50 top-0 right-0 bottom-0 left-0"}>
            <div className={"flex flex-col gap-3 border bg-white rounded-lg mt-10 w-[400px] mx-auto"}>
                <div className={"flex shadow-lg gap-2 justify-between items-center p-2"}>
                    <h4 className={"font-semibold text-slate-700"}>{ title }</h4>
                    <IoClose onClick={onClick} className={"text-2xl hover:text-red-600 text-slate-600 cursor-pointer"} />
                </div>
                <div
                    className={"p-2 flex flex-col gap-3"}>
                    { children }
                </div>
            </div>
        </section>
    )
}