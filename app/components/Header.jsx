"use client"
import Link from "next/link";
import { GrSun } from "react-icons/gr";
import {useRef, useState} from "react";
import HeaderAuth from "./HeaderAuth";
import {HiShoppingCart} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../redux/slices/cartSlice";
import Cart from "./Cart";

export default function Header ({user}) {
    const [primary, setPrimary] = useState(false)
    const primaryRef = useRef()

    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.cart.isOpen)
    const items = useSelector(state => state.cart.items)

    return (
        <section className={"flex bg-stone-50 border-b justify-between gap-4 py-2 px-4 items-center ring-1 ring-stone-200"}>
            <h1>بلتيهي</h1>
            <nav>
                <ul className={"flex gap-4 text-gray-600 transition items-center list-none"}>
                    <Link
                        className={"relative text-sm hover:font-medium hover:text-indigo-600 transition ease-in-out hover:scale-110 duration-300"}
                        ref={primaryRef}
                        href={"/primary-education"}
                        onClick={() => setPrimary(!primary)}
                    >
                        <li className={"hover:p-2 hover:bg-white hover:rounded-lg hover:border"}>التعليم الأساسي</li>
                        {
                            primary &&
                            <div
                                className={"absolute w-[250px] top-8 right-0 bg-white shadow-md border rounded-lg"}
                                onMouseEnter={() => setPrimary(true)}
                                onMouseLeave={() => setPrimary(false)}
                            >
                                <ul className={"flex p-2 flex-col gap-4"}>
                                    <Link href={"/"}>
                                        <li className={"flex gap-4 rounded-lg hover:bg-stone-50 p-2"}>
                                            <span className={"w-1 rounded-full bg-indigo-600"}></span>
                                            <div className={"flex flex-col gap-2"}>
                                                <h4 className={"text-sm font-medium"}>كنكور</h4>
                                                <p className={"text-xs"}>مسابقة ختم الدروس الابتدائية</p>
                                            </div>
                                        </li>
                                    </Link>
                                    <Link href={"/"}>
                                        <li className={"flex gap-4 rounded-lg hover:bg-stone-50 p-2"}>
                                            <span className={"w-1 rounded-full bg-indigo-600"}></span>
                                            <div className={"flex flex-col gap-2"}>
                                                <h4 className={"text-sm font-medium"}>الكتب المدرسية</h4>
                                                <p className={"text-xs"}>المقررات الدراسية في المدرسة</p>
                                            </div>
                                        </li>
                                    </Link>
                                    <Link href={"/"}>
                                        <li className={"flex gap-4 rounded-lg hover:bg-stone-50 p-2"}>
                                            <span className={"w-1 rounded-full bg-indigo-600"}></span>
                                            <div className={"flex flex-col gap-2"}>
                                                <h4 className={"text-sm font-medium"}>المدارس</h4>
                                                <p className={"text-xs"}>المدارس المشاركة في كنكور</p>
                                            </div>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        }
                    </Link>
                    <Link className={"text-sm hover:font-medium hover:text-indigo-600 transition ease-in-out hover:scale-110 duration-300"} href={"/"}>
                        <li className={"hover:p-2 hover:bg-white hover:rounded-lg hover:border"}>التعليم الإعدادي</li>
                    </Link>
                    <Link className={"text-sm hover:font-medium hover:text-indigo-600 transition ease-in-out hover:scale-110 duration-300"} href={"/"}>
                        <li className={"hover:p-2 hover:bg-white hover:rounded-lg hover:border"}>التعليم الثانوي</li>
                    </Link>
                    <Link className={"text-sm hover:font-medium hover:text-indigo-600 transition ease-in-out hover:scale-110 duration-300"} href={"/"}>
                        <li className={"hover:p-2 hover:bg-white hover:rounded-lg hover:border"}>التعليم الجامعي</li>
                    </Link>
                    <Link className={"text-sm hover:font-medium hover:text-indigo-600 transition ease-in-out hover:scale-110 duration-300"} href={"/books"}>
                        <li className={"hover:p-2 hover:bg-white hover:rounded-lg hover:border"}>المكتبة</li>
                    </Link>
                </ul>
            </nav>
            <div className={"flex gap-4 items-center"}>
                <GrSun className={"text-xl text-slate-600"} />
                {
                    items.length > 0 &&
                    <div
                        onClick={() => dispatch(cartActions.setOpen(true))}
                        className={"flex flex-col items-center gap-1 cursor-pointer"}>
                        <span
                            className={"bg-indigo-50 border border-dashed border-indigo-200 text-indigo-600 text-xs font-medium flex items-center justify-center p-1 rounded-full"}>{ items.length }</span>
                        <HiShoppingCart className={"text-xl text-slate-600"}/>
                    </div>
                }
                <HeaderAuth user={user}/>
            </div>
            {
                isOpen &&
                <Cart/>
            }
        </section>
    )
}