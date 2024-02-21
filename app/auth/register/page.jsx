"use client"
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import {useRef, useState} from "react";
import Error from "../../components/Error";
import {authRegister} from "../../../controllers/Auth";
import {useRouter} from "next/navigation";
import { RegisterSchema} from "../../../helpers/Schemas";
import Toast from "../../components/Toast";
import SectionAuth from "../components/SectionAuth";

export default function Page(){

    const router = useRouter()



    const formRef = useRef()
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isShow, setIsShow] = useState(false)
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("")


    const handel = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setIsShow(false)
        const validate =  RegisterSchema.safeParse({ name, email, password })
        if(validate.success){
            setError({})
            const { message, status, data } = await authRegister({name, email, password})
            if(status === "success"){
                formRef.current.reset()
                setIsLoading(false)
                setMessage(message)
                setStatus(status)
                setIsShow(true)
                if(!isShow) router.push("/auth/login")
            }else {
                setMessage(message)
                setStatus(status)
                setIsShow(true)
                setIsLoading(false)
                setError(data)
            }
        }else {
            setIsLoading(false)
            setError(validate.error.format())
        }
    }


    return (
        <>
            {
                isShow && <Toast status={status} message={message} isShowT={isShow} />
            }
            <SectionAuth
                handel={handel}
                title={"تسجيل حساب جديد 🔒"}
                formRef={formRef}
                titleSubmit={"تسجيل الحساب"}
                isLoading={isLoading}
                titleButton={"تسجيل الدخول"}
                hrefButton={"/auth/login"}
            >
                <Input
                    name={"name"} label={"الاسم"}
                    type={"name"}
                    placeholder={"اسمك الكامل"}
                    onChange={(e) => setName(e.target.value)}
                    isError={error?.name}
                />
                {
                    error?.name && <Error message={error?.name._errors.join()} />
                }
                <Input
                    name={"email"} label={"البريد الإلكتروني"}
                    type={"email"}
                    placeholder={"بريدك الإلكتروني"}
                    onChange={(e) => setEmail(e.target.value)}
                    isError={error?.email}
                />
                {
                    error?.email && <Error message={error?.email._errors.join()} />
                }
                <Input
                    name={"password"} label={"كلمة المرور"}
                    type={"password"}
                    placeholder={"⁕⁕⁕⁕⁕⁕⁕⁕"}
                    onChange={(e) => setPassword(e.target.value)}
                    isError={error?.password}
                />
                {
                    error?.password && <Error message={error?.password._errors.join()} />
                }
            </SectionAuth>
        </>
    )
}