"use client"
import Link from "next/link";
const classNames = require('classnames');

export default function LinkBtn({title, link, isFull = false}){
    return (
        <Link
            className={classNames({
                "rounded-lg text-xs p-2 text-center font-medium bg-blue-700 hover:bg-blue-600 text-white ring-1 border ring-stone-200": true,
                "w-full": isFull,
                "w-fit": !isFull,
            })}
            href={link}>{title}</Link>
    )
}