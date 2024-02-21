"use client"
import {IoClose} from "react-icons/io5";
import {useState} from "react";
import HeaderSection from "../../components/HeaderSection";

export default function CardAdd(
    {
        children,
        title,
        onClick
    }) {

    return (
        <section className={"absolute z-50 w-full h-full bg-black/50 top-0 right-0 bottom-0 left-0"}>
            <div className={"flex flex-col gap-3 border bg-white rounded-lg mt-10 w-[400px] mx-auto"}>
                <div className={"shadow-lg"}>
                    <HeaderSection onClick={onClick} title={title} />
                </div>
                <div
                    className={"p-2 flex flex-col gap-3"}>
                    { children }
                </div>
            </div>
        </section>
    )
}