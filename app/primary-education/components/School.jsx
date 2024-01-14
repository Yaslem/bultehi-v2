
import {PiStudentBold} from "react-icons/pi";
import {FaCheck} from "react-icons/fa6";
import {ImBlocked} from "react-icons/im";
import Link from "next/link";

export default function School(){
    return (
        <div className={"border rounded-lg overflow-hidden"}>
            <div className={"bg-red-100 h-20"} />
            <div className={"w-16 h-16 -mt-8 mx-auto rounded-full bg-red-400"} />
            <h2 className={"text-xl p-2 my-4 text-gray-700 font-bold text-center"}>اسم المدرسة</h2>
            <hr />
            <div className={"flex gap-4 items-center p-2 justify-between"}>
                <div className={"flex items-center text-sm text-gray-500 flex-col gap-2"}>
                               <span className={"flex items-center justify-center w-10 h-10 rounded-full border border-indigo-200 bg-indigo-50"}>
                                   <PiStudentBold className={"text-lg text-indigo-600"} />
                               </span>
                    202
                </div>
                <div className={"flex items-center text-sm text-gray-500 flex-col gap-2"}>
                               <span className={"flex items-center justify-center w-10 h-10 rounded-full border border-green-200 bg-green-50"}>
                                   <FaCheck className={"text-lg text-green-600"} />
                               </span>
                    344
                </div>
                <div className={"flex items-center text-sm text-gray-500 flex-col gap-2"}>
                               <span className={"flex items-center justify-center w-10 h-10 rounded-full border border-red-200 bg-red-50"}>
                                   <ImBlocked className={"text-lg text-red-600"} />
                               </span>
                    500
                </div>
            </div>
            <Link
                className={"flex items-center justify-center w-full text-xs p-2 font-medium bg-indigo-700 hover:bg-indigo-600 text-white"}
                href={"/"}
            >عرض</Link>
        </div>
    )
}