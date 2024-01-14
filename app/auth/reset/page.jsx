"use client"
import Toast from "../../components/Toast";
import SectionAuth from "../components/SectionAuth";
import Input from "../../components/Input";
import Error from "../components/Error";
import {useRef, useState} from "react";
import {ResetSchema} from "../../../helpers/Schemas";
import {authReset} from "../../../controllers/Auth";

export default function Page() {

    const formRef = useRef()
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isShow, setIsShow] = useState(false)
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("")

    const handel = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setIsShow(false)
        const validated =  ResetSchema.safeParse({ email })
        if(validated.success){
            setError({})
            const { message, status, data } = await authReset({email})
            if(status === "success"){
                formRef.current.reset()
                setIsLoading(false)
                setMessage(message)
                setStatus(status)
                setIsShow(true)
            }else {
                setMessage(message)
                setStatus(status)
                setIsShow(true)
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
            {
                isShow && <Toast status={status} message={message} isShowT={isShow} />
            }
            <SectionAuth
                handel={handel}
                title={"تغيير كلمة المرور 🔓"}
                formRef={formRef}
                titleSubmit={"إرسال الرابط"}
                isLoading={isLoading}
                titleButton={"تسجيل الدخول"}
                hrefButton={"/auth/login"}
                isSocial={false}
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
            </SectionAuth>
        </>
    )
}