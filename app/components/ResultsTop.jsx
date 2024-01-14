"use client"
import {LuSchool2} from "react-icons/lu";

export default function ResultsTop(){
    return (
        <div className={"flex items-center justify-between gap-4"}>
            <div className={"flex flex-col gap-4"}>
                <span className={"p-2 text-center bg-indigo-700 cursor-pointer hover:bg-indigo-600 text-sm font-medium text-white rounded-lg"}>نتائج سنة 1444</span>
                <select className={"p-2 bg-stone-50 cursor-pointer border text-gray-600 hover:text-gray-500 text-sm font-medium rounded-lg"}>
                    <option>نتائج سنة 1444</option>
                    <option>نتائج سنة 1443</option>
                    <option>نتائج سنة 1442</option>
                </select>
            </div>
            <div className={"grid grid-cols-4 gap-4"}>
                <div className={"flex bg-green-50 border-green-100 cursor-pointer items-center p-2 flex-col gap-4 border rounded-lg"}>
                    <LuSchool2 className={"text-5xl text-green-700 hover:text-green-600"} />
                    <span className={"text-sm font-medium text-green-700 hover:text-green-600"}>المدارس</span>
                </div>
                <div className={"flex bg-yellow-50 border-yellow-100 cursor-pointer items-center p-2 flex-col gap-4 border rounded-lg"}>
                    <LuSchool2 className={"text-5xl text-yellow-700 hover:text-yellow-600"} />
                    <span className={"text-sm font-medium text-yellow-700 hover:text-yellow-600"}>المراكز</span>
                </div>
                <div className={"flex bg-indigo-50 border-indigo-100 cursor-pointer items-center p-2 flex-col gap-4 border rounded-lg"}>
                    <LuSchool2 className={"text-5xl text-indigo-700 hover:text-indigo-600"} />
                    <span className={"text-sm font-medium text-indigo-700 hover:text-indigo-600"}>الولايات</span>
                </div>
                <div className={"flex bg-amber-50 border-amber-100 cursor-pointer items-center p-2 flex-col gap-4 border rounded-lg"}>
                    <LuSchool2 className={"text-5xl text-amber-700 hover:text-amber-600"} />
                    <span className={"text-sm font-medium text-amber-700 hover:text-amber-600"}>المقاطعات</span>
                </div>
            </div>
        </div>
    )
}