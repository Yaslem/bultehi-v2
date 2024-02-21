"use client"

import Toast from "../../components/Toast";
import SectionAuth from "../components/SectionAuth";
import {useCallback, useEffect, useRef, useState} from "react";
import {BeatLoader} from "react-spinners";
import Button from "../../components/Button";
import Social from "../components/Social";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {LoginSchema} from "../../../helpers/Schemas";
import {authLogin, authVerification} from "../../../controllers/Auth";
import Error from "../../components/Error";

export default function Page(){

    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const [isLoading, setIsLoading] = useState(true)
    const [isShow, setIsShow] = useState(false)
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("")

    const handel = useCallback( async () => {
        if(!token){
            setIsLoading(false)
            setMessage("رمز تأكيد الحساب مطلوب.")
            return;
        }
        const { message, status, data } = await  authVerification(token)

        if(status === "success"){
            setIsLoading(false)
            setMessage(message)
            setStatus(status)
            setIsShow(true)
        }else {
            setIsLoading(false)
            setMessage(message)
            setStatus(status)
            setIsShow(true)
        }

    }, [token])

    useEffect(  () => {
         handel()
    }, [token])

    return (
        <>
            {
                isShow && <Toast status={status} message={message} isShowT={isShow} />
            }
            <section className={"w-[300px] mx-auto mb-5 mt-10 flex flex-col gap-4"}>
                <h1 className={"font-bold text-2xl text-slate-700 text-center"}>الدخول 🔏</h1>
                <div className={"bg-stone-50 rounded-lg p-2 border border-dashed flex flex-col gap-y-4"}>
                    <p className={"text-xs text-center text-slate-600 font-medium"}>تأكيد حسابك</p>
                    {
                        isLoading &&
                        <div className={"flex items-center justify-center w-full"}>
                            <BeatLoader size={15} color={"#4338ca"} />
                        </div>
                    }

                    {
                        message && <Error status={status} message={message} />
                    }
                </div>

                <Link
                    className={"text-sm text-slate-500 flex items-center gap-2 justify-center font-medium text-center"}
                    href={"auth/login"}>الذهاب<span className={"text-indigo-700 hover:text-indigo-600 transition-all"}>لتسجيل الدخول</span>
                </Link>
            </section>
        </>
    )
}