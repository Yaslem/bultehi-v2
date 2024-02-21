"use client"
import Link from "next/link";

export default function NavData({title, url}) {
    return (
        <Link
            className={"relative text-sm hover:font-medium hover:text-indigo-600 transition ease-in-out hover:scale-110 duration-300"}
            href={"/" + url}>
            <li>{title}</li>
        </Link>
    )
}