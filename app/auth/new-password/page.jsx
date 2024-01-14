"use client"
import Toast from "../../components/Toast";
import SectionAuth from "../components/SectionAuth";
import Input from "../../components/Input";
import Error from "../components/Error";
import {useCallback, useEffect, useRef, useState} from "react";
import {NewPasswordSchema} from "../../../helpers/Schemas";
import {authNewPassword} from "../../../controllers/Auth";
import {useSearchParams} from "next/navigation";

export default function Page() {

    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const formRef = useRef()
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [password, setPassword] = useState("")

    const [isShow, setIsShow] = useState(false)
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("")

    const handel = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if(!token){
            setIsLoading(false)
            setMessage("رمز تأكيد الحساب مطلوب.")
            setStatus("error")
            setIsShow(true)
            return;
        }
        const validated =  NewPasswordSchema.safeParse({ password })
        if(validated.success){
            setError({})
            const { message, status, data } = await authNewPassword(password, token)
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
                title={"تعيين كلمة المرور 🔏"}
                formRef={formRef}
                titleSubmit={"تعيين كملة المرور"}
                isLoading={isLoading}
                titleButton={"تسجيل الدخول"}
                hrefButton={"/auth/login"}
                isSocial={false}
            >
                <Input
                    name={"password"}
                    label={"كلمة المرور"}
                    type={"password"}
                    placeholder={"اكتب كلمة المرور الجديدة"}
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