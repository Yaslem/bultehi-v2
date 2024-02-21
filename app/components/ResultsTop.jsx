"use client"
import {LuSchool2} from "react-icons/lu";
import {usePathname} from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

export default function ResultsTop({session, year, type}){
    const pathName = usePathname()
    return (
        <div className={"flex items-center justify-between gap-4"}>
            <div className={"flex flex-col gap-4"}>
                <span className={"p-2 text-center bg-indigo-700 cursor-not-allowed hover:bg-indigo-600 text-sm font-medium text-white rounded-lg"}>{session}</span>
                <span className={"p-2 text-center bg-indigo-700 cursor-not-allowed hover:bg-indigo-600 text-sm font-medium text-white rounded-lg"}>سنة {year}</span>
            </div>
            <div className={classNames({
                "grid gap-4": true,
                "grid-cols-5": type.slug === 5,
                "grid-cols-4": type.slug !== 5,
            })}>
                {
                    type.slug === 5 &&
                    <Link href={pathName + "/types"} className={"flex bg-teal-50 border-teal-200 cursor-pointer items-center p-2 flex-col gap-4 border rounded-lg"}>
                        <LuSchool2 className={"text-5xl text-teal-700 hover:text-teal-600"} />
                        <span className={"text-sm font-medium text-teal-700 hover:text-teal-600"}>الشّعب</span>
                    </Link>
                }
                <Link href={pathName + "/states"} className={"flex bg-indigo-50 border-indigo-200 cursor-pointer items-center p-2 flex-col gap-4 border rounded-lg"}>
                    <LuSchool2 className={"text-5xl text-indigo-700 hover:text-indigo-600"} />
                    <span className={"text-sm font-medium text-indigo-700 hover:text-indigo-600"}>الولايات</span>
                </Link>
                <Link href={pathName + "/counties"} className={"flex bg-amber-50 border-amber-200 cursor-pointer items-center p-2 flex-col gap-4 border rounded-lg"}>
                    <LuSchool2 className={"text-5xl text-amber-700 hover:text-amber-600"} />
                    <span className={"text-sm font-medium text-amber-700 hover:text-amber-600"}>المقاطعات</span>
                </Link>
                <Link href={pathName + "/schools"} className={"flex bg-green-50 border-green-200 cursor-pointer items-center p-2 flex-col gap-4 border rounded-lg"}>
                    <LuSchool2 className={"text-5xl text-green-700 hover:text-green-600"} />
                    <span className={"text-sm font-medium text-green-700 hover:text-green-600"}>المدارس</span>
                </Link>
                <Link href={pathName + "/centers"} className={"flex bg-sky-50 border-sky-200 cursor-pointer items-center p-2 flex-col gap-4 border rounded-lg"}>
                    <LuSchool2 className={"text-5xl text-sky-700 hover:text-sky-600"} />
                    <span className={"text-sm font-medium text-sky-700 hover:text-sky-600"}>المراكز</span>
                </Link>
            </div>
        </div>
    )
}