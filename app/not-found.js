import Link from 'next/link'
import Image from "next/image";
import {Metadata} from "next";

export const metadata = {
    title: "لا توجد نتائج"
}
export default function NotFound() {
    return (
        <div className={"flex flex-col gap-8 items-center mt-8"}>
            <Image className={"w-72 h-auto object-cover"} width={200} height={300} src={"/files/images/not_found.png"} alt={"not found"} />
            <h2 className={"text-6xl font-bold text-gray-700 -mt-8"}>عفوا!</h2>
            <p className={"text-sm text-gray-500 font-medium text-center"}>لم نتمكن من العثور على ما تبحث عنه.</p>
            <Link className={"flex items-center justify-center p-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white font-medium text-xs"} href="/">الذهاب إلى الصفحة الرئيسية</Link>
        </div>
    )
}