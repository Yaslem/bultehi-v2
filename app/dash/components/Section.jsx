"use client"
import Title from "./Title";

export default function Section({children}){
    return (
        <section className={"flex flex-col p-5 gap-5"}>
            {children}
        </section>
    )
}