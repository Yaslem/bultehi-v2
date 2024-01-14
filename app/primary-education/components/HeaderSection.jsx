"use client"
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

export default function HeaderSection({title, link, isAll = false}){
    return (
        <div className={"flex justify-between gap-4"}>
            <div className={"flex gap-3"}>
                <div className={"w-1 block rounded-lg bg-gray-500"} />
                <h2 className={"text-lg font-bold text-gray-600"}>{title}</h2>
            </div>
            {
                !isAll &&
                <Link className={"flex gap-2 rounded-lg items-center text-xs font-medium justify-center p-2 bg-indigo-100 text-indigo-500"} href={link || "/"}>
                    <span>عرض الكل</span>
                    <HiOutlineExternalLink className={"text-lg"} />
                </Link>
            }
        </div>
    )
}