"use client"
import {TbProgress} from "react-icons/tb";
const classNames = require('classnames');

export default function Button(
    {
        title = "null",
        isLoading = false,
        isOnlyIcon = false,
        onClick
    }){
    return (
        <button
            onClick={onClick}
            className={classNames({
            "rounded-lg text-xs p-2 font-medium bg-indigo-700 hover:bg-indigo-600 text-white transition-all outline-0 ring-1 border ring-stone-200": true,
            "flex items-center justify-center gap-3": isLoading
        })} disabled={isLoading}>
            {
                isLoading
                    ? <>
                        <TbProgress className={"text-2xl animate-spin"} />
                        {
                            !isOnlyIcon &&
                            <span className={"text-xs"}>تجري المعالجة...</span>
                        }
                    </>
                    : title
            }
        </button>
    )
}