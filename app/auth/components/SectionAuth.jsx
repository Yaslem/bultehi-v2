"use client"
import Button from "../../components/Button";
import Link from "next/link";
import Social from "./Social";

export default function SectionAuth(
    {
        children,
        title,
        formRef,
        handel,
        isLoading,
        titleSubmit,
        titleButton,
        hrefButton,
        isSocial = true
    }){
    return (
        <section className={"w-[300px] mx-auto mb-5 mt-10 flex flex-col gap-4"}>
            <h1 className={"font-bold text-2xl text-slate-700 text-center"}>{title}</h1>
            <form ref={formRef} onSubmit={handel} className={"flex flex-col gap-3"}>
                <div className={"flex flex-col gap-3 bg-stone-50 border border-dashed rounded-lg p-2"}>
                    { children }
                </div>
                <Button isLoading={isLoading} title={titleSubmit}
                />
            </form>
            {
                isSocial && <Social />
            }
            <Link
                className={"text-sm text-slate-500 flex items-center gap-2 justify-center font-medium text-center"}
                href={hrefButton}>أو<span className={"text-indigo-700 hover:text-indigo-600 transition-all"}>{titleButton}</span>
            </Link>
        </section>
    )
}