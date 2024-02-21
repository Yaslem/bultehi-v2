"use client"
import LinkBtn from "./Link";
import {FaUserCog, FaUserTie} from "react-icons/fa";
import Link from "next/link";
import {IoSettingsSharp} from "react-icons/io5";
import {HiOutlineLogout} from "react-icons/hi";
import {useState} from "react";
import {toastActions} from "../../redux/slices/toastSlice";
import {useDispatch} from "react-redux";
import {signOut} from "next-auth/react";
import Image from "next/image";

export default function HeaderAuth( { user } ) {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

    const links = [
        {
            title: "الملف الشخصي",
            icon: <FaUserCog className={"text-xl"}/>,
            href: "/"
        },
        {
            title: "الإعدادات",
            icon: <IoSettingsSharp className={"text-xl"}/>,
            href: "/"
        },
        {
            title: "تسجيل الخروج",
            icon: <HiOutlineLogout className={"text-xl"}/>,
            href: "/"
        }
    ]

    const handel = async () => {
        await signOut()
        dispatch(toastActions.setIsShow(true))
        dispatch(toastActions.setStatus("success"))
        dispatch(toastActions.setMessage("تم تسجيل الخروج بنجاح."))
    }

    return (
        <section>
            {
                !user && <LinkBtn link={"/"} title={"تسجيل الدخول"} />
            }
            {
                user &&
                <div className={"relative"}>
                    {
                        !user.image &&
                        <span onClick={() => setShow(!show)} title={user.name} className={"p-2 cursor-pointer flex items-center justify-center bg-white rounded-full w-10 h-10 border"}>
                            <FaUserTie className={"text-xl text-indigo-700 hover:text-indigo-600"} />
                        </span>
                    }
                    {
                        user.image &&
                        <Image onClick={() => setShow(!show)} title={user.name} className={"cursor-pointer ring-2 ring-indigo-300 hover:ring-indigo-200 object-cover rounded-full w-10 h-10 border"} src={user?.image} alt={"صورة النستخدم"} width={30} height={30} />
                    }
                    {
                        show &&
                        <ul className={"p-2 w-36 absolute left-0 top-12 bg-white shadow-md rounded-lg flex flex-col gap-2 border rounded-tl-[0px] rounded-tr-[0px]"}>
                            {
                                links.map((link, index) =>
                                    <>
                                        {
                                            index === links.length - 1
                                                ? <li onClick={() => handel()} className={"flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600 hover:text-indigo-600"}>
                                                    { link.icon }
                                                    <span className={"text-xs"}>{ link.title }</span>
                                                </li>
                                                : <Link key={index} href={link.href}>
                                                    <li className={"flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-indigo-600"}>
                                                        { link.icon }
                                                        <span className={"text-xs"}>{ link.title }</span>
                                                    </li>
                                                </Link>
                                        }
                                        {
                                            index !== links.length -1 && <hr className={"border h-0 border-dashed"} />
                                        }
                                    </>
                                )
                            }
                        </ul>
                    }
                </div>
            }
        </section>
    )
}