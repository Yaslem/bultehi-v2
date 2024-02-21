"use client"
import Link from "next/link";
import { GrSun } from "react-icons/gr";
import {useEffect, useRef, useState} from "react";
import HeaderAuth from "./HeaderAuth";
import {HiShoppingCart} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../redux/slices/cartSlice";
import Cart from "./Cart";
import {getItems} from "../../controllers/Cart";
import NavData from "./navData";

export default function Header ({user}) {
    const [primary, setPrimary] = useState(false)
    const primaryRef = useRef()

    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.cart.isOpen)
    const items = useSelector(state => state.cart.items)
    
    
    useEffect( () => {
        async function getCartItems() {
            const { status, data } = await getItems()
            
            if(status === "success"){
                dispatch(cartActions.setItems(data))
            }
        }
        getCartItems()
    }, [dispatch]);


    return (
        <section
            style={{
                boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
            }}
            className={"flex bg-white border-b justify-between gap-4 py-2 px-4 items-center"}>
            <h1>{process.env.SITE_TITLE}</h1>
            <nav>
                <ul className={"flex gap-4 text-gray-600 transition items-center list-none"}>
                    <NavData title={"التعليم الأساسي"} url={"elementary"} />
                    <NavData title={"التعليم الإعدادي"} url={"middle"} />
                    <NavData title={"التعليم الثانوي"} url={"high"} />
                    <NavData title={"التعليم الجامعي"} url={"university"} />
                    <NavData title={"المكتبة"} url={"books"} />
                </ul>
            </nav>
            <div className={"flex gap-4 items-center"}>
                <GrSun className={"text-xl text-slate-600"}/>
                {
                    items.length > 0 &&
                    <div
                        onClick={() => dispatch(cartActions.setOpen(true))}
                        className={"flex flex-col items-center gap-1 cursor-pointer"}>
                        <span
                            className={"bg-indigo-50 border border-dashed border-indigo-200 text-indigo-600 text-xs font-medium flex items-center justify-center p-1 rounded-full"}>{items.length}</span>
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