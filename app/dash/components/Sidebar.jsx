"use client"
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import {BsPostcardHeartFill} from "react-icons/bs";
import {GiSpellBook} from "react-icons/gi";
import {FaUserGraduate, FaUsers} from "react-icons/fa";
import {usePathname} from "next/navigation";
import {IoSettingsSharp} from "react-icons/io5";
const classNames = require('classnames');

export default function Sidebar(){
    const pathname = usePathname()

    const links = [
        {
            title: "الرئيسية",
            icon: <GoHomeFill className={"text-lg"} />,
            href: "/dash",
            isActive: function () {
                return  this.href === pathname
            }
        },
        {
            title: "النتائج",
            icon: <GoHomeFill className={"text-lg"} />,
            href: "/dash/results",
            isActive: function () {
                return  pathname.includes(this.href)
            }
        },
        {
            title: "المقالات",
            icon: <BsPostcardHeartFill className={"text-lg"} />,
            href: "/dash/articles",
            isActive: function () {
                return pathname.includes(this.href)
            }
        },
        {
            title: "المستخدمون",
            icon: <FaUsers className={"text-lg"} />,
            href: "/dash/users",
            isActive: function () {
                return  pathname.includes(this.href)
            }
        },
        {
            title: "المكتبة",
            icon: <GiSpellBook className={"text-lg"} />,
            href: "/dash/books",
            isActive: function () {
                return  pathname.includes(this.href)
            }
        },
        {
            title: "المنح",
            icon: <FaUserGraduate className={"text-lg"} />,
            href: "/dash/grants",
            isActive: function () {
                return  pathname.includes(this.href)
            }
        },
        {
            title: "الإعدادات",
            icon: <IoSettingsSharp className={"text-lg"} />,
            href: "/dash/settings",
            isActive: function () {
                return  this.href.includes(pathname)
            }
        }
    ]

    return (
        <aside className={"w-44 border-l bg-stone-50 ring-1 ring-stone-200"}>
            <ul className={"py-4 pl-2 pr-4 flex flex-col gap-2"}>
                {
                    links.map((link, index) =>
                        <Link key={index} href={link.href}>
                            <li className={classNames({
                                "flex items-center gap-3 p-2 bg-white border rounded-lg text-sm font-medium": true,
                                "text-indigo-600": link.isActive(),
                                "text-slate-600 hover:text-indigo-700": !link.isActive(),
                            })}>
                                { link.icon }
                                <span>{ link.title }</span>
                            </li>
                        </Link>
                    )
                }
            </ul>
        </aside>
    )
}