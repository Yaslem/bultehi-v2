"use client"
import Input from "../../components/Input";
import {useEffect, useRef, useState} from "react";
import Toast from "../../components/Toast";
import SectionAuth from "../components/SectionAuth";
import Error from "../components/Error";
import {LoginSchema} from "../../../helpers/Schemas";
import {authLogin} from "../../../controllers/Auth";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {toastActions} from "../../../redux/slices/toastSlice";

export default function Page(){
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()

    const formRef = useRef()
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const urlError = () => {
        setIsLoading(false)
        dispatch(toastActions.setIsShow(true))
        dispatch(toastActions.setStatus("error"))
        dispatch(toastActions.setMessage("البريد المرتبط بهذا الحساب مستخدم بالفعل في حساب آخر."))
    }

    useEffect(() => {
        searchParams.get("error") === "OAuthAccountNotLinked" ? urlError() : ""
    }, [])

    const handel = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  LoginSchema.safeParse({ email, password })
        if(validated.success){
            setError({})
            const { message, status, data } = await authLogin({email, password})
            if(status === "success"){
                formRef.current.reset()
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
                router.push("/dash")
            }else {
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
                setIsLoading(false)
                setError(data)
            }
        }else {
            setIsLoading(false)
            setError(validated.error.format())
        }
    }

    return (
        <>
            <SectionAuth
                handel={handel}
                title={"تسجيل الدخول 🔏"}
                formRef={formRef}
                titleSubmit={"دخول"}
                isLoading={isLoading}
                titleButton={"تسجيل حساب جديد"}
                hrefButton={"/auth/register"}
            >
                <Input
                    name={"email"}
                    label={"البريد الإلكتروني"}
                    type={"email"}
                    placeholder={"بريدك الإلكتروني"}
                    onChange={(e) => setEmail(e.target.value)}
                    isError={error?.email}
                />
                {
                    error?.email && <Error message={error?.email._errors.join()} />
                }
                <Input
                    name={"password"}
                    label={"كلمة المرور"}
                    type={"password"}
                    placeholder={"⁕⁕⁕⁕⁕⁕⁕⁕"}
                    onChange={(e) => setPassword(e.target.value)}
                    isError={error?.password}
                />
                <Link className={"text-xs font-medium hover:text-indigo-600 text-slate-600"} href={"/auth/reset"}>نسيت كلمة المرور</Link>
                {
                    error?.password && <Error message={error?.password._errors.join()} />
                }
            </SectionAuth>
        </>
    )
}