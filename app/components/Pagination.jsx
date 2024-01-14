"use client"
import Link from "next/link";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

export default function Pagination(){
    return (
        <div className={"flex justify-between items-center"}>
            <Link className={"flex items-center gap-4 bg-stone-50 border rounded-lg text-gray-500 text-sm p-2 font-medium"} href={"/"}>
                <GrFormNext className={"text-xl"} />
                <span>السابق</span>
            </Link>
            <ul className={"flex items-center gap-3"}>
                <li className={"w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-medium bg-stone-50 cursor-pointer hover:border hover:text-gray-500"}>1</li>
                <li className={"w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-medium bg-stone-50 cursor-pointer hover:border hover:text-gray-500"}>2</li>
                <li className={"w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-medium bg-stone-50 cursor-pointer hover:border hover:text-gray-500"}>3</li>
            </ul>
            <Link className={"flex items-center gap-4 bg-indigo-50 border rounded-lg text-indigo-600 hover:text-indigo-500 text-sm p-2 font-medium"} href={"/"}>
                <span>التالي</span>
                <GrFormPrevious className={"text-xl"} />
            </Link>
        </div>
    )
}