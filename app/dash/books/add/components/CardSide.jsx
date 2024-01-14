"use client"

import classNames from "classnames";
import {FaAngleDown} from "react-icons/fa";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

export default function CardSide(
    {
        title,
        showTab,
        number,
        onClick,
        children
    }) {
    return (
        <div className={classNames({
            "flex flex-col gap-2 font-medium text-slate-600 text-sm hover:text-slate-500 p-2 hover:bg-white rounded-lg transition-all": true,
            "text-slate-500 p-2 bg-white rounded-lg border shadow-lg border-b-2 border-b-indigo-500": showTab === number
        })}>
            <div onClick={onClick} className={"flex items-center cursor-pointer gap-2 justify-between"}>
                <h4>{title}</h4>
                <FaAngleDown className={classNames({
                    "text-xl": true,
                    "rotate-180": showTab === number
                })}/>
            </div>
            { children }
        </div>
    )
}