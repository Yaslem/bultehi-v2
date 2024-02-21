"use client"
import {FaHashtag} from "react-icons/fa";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function LinkCategories(
    {
        link,
        title,
        icon
    }) {
    const router = useRouter()
    return (
        <Link href={link} className={"flex flex-col hover:border-indigo-600 gap-2 p-2 text-slate-600 text-sm font-medium rounded-lg items-center bg-white cursor-pointer border border-dashed"}>
            { icon }
            <span>{ title }</span>
        </Link>
    )
}