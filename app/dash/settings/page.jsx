"use client"
import Title from "../components/Title";
import Section from "../components/Section";
import {FaAward} from "react-icons/fa";
import LinkBtn from "../../components/Link";
import {usePathname} from "next/navigation";

export default function Page(){
    const pathname = usePathname()
    return (
        <Section>
            <div className={"flex items-center justify-between gap-3"}>
                <Title title={"النتائج"} />
            </div>
            <div className={"grid grid-cols-3 gap-4"}>
                <div className={"flex flex-col items-center gap-y-5 border bg-stone-50 p-2 rounded-lg"}>
                    <FaAward className={"text-5xl text-slate-600"} />
                    <div className={"flex flex-col items-center gap-2"}>
                        <h3 className={"text-xl font-bold text-slate-600"}>النتائج</h3>
                        <p className={"text-sm font-medium text-slate-500"}>إضافة نوع أو سنة، بالإضافة إلى التعديل والحذف.</p>
                    </div>
                    <LinkBtn isFull={true} title={"عرض"} link={pathname + "/results"} />
                </div>
            </div>
        </Section>
    )
}