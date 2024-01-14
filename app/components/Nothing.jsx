"use client"
import Image from "next/image";

export default function Nothing(
    {
        title,
        desc
    }) {
    return (
        <div className={"w-full bg-stone-50 border border-dashed rounded-lg p-8 flex items-center justify-between gap-3"}>
            <div className={"flex flex-col gap-6"}>
                <h4 className={"text-5xl text-slate-700 font-bold"}>{ title }</h4>
                <p className={"text-slate-600 text-sm font-medium"}>{ desc }</p>
            </div>
            <div>
                <Image className={"w-56 h-auto"} src={"/uploads/global/nothing.png"} alt={"nothing"} width={100} height={100} />
            </div>
        </div>
    )
}