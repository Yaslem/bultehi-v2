"use client"
export default function ResultsType(){
    return (
        <div>
            <ul className={"flex items-center gap-3"}>
                <li className={"text-xs cursor-pointer text-white p-2 rounded-full min-w-[80px] text-center bg-indigo-700 font-medium"}>بكالوريا</li>
                <li className={"text-xs cursor-pointer text-slate-700 p-2 rounded-full min-w-[80px] text-center bg-stone-50 border font-medium"}>ابريفه</li>
                <li className={"text-xs cursor-pointer text-slate-700 p-2 rounded-full min-w-[80px] text-center bg-stone-50 border font-medium"}>كنكور</li>
                <li className={"text-xs cursor-pointer text-slate-700 p-2 rounded-full min-w-[80px] text-center bg-stone-50 border font-medium"}>الاكتياز</li>
            </ul>
        </div>
    )
}