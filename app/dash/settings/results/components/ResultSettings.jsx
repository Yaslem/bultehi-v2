"use client"
import Input from "../../../../components/Input";
import {useDispatch} from "react-redux";
import {useRef, useState} from "react";
import {toastActions} from "../../../../../redux/slices/toastSlice";
import {ResultSettingsSchema} from "../../../../../helpers/Schemas";
import {ResultSettings} from "../../../../../controllers/ResultSettings";
import Card from "./Card";
import Error from "../../../../components/Error";

export default function ResultSetting({title, model, placeholder, data, status, message}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")

    const formRef = useRef()
    const [error, setError] = useState({})
    const [errorSlug, setErrorSlug] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handel =  async (e) => {

        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  ResultSettingsSchema.safeParse({ name })
        if(validated.success) {
            setError({})
            if(model === "session"){
                if(slug.length === 0){
                    setErrorSlug(true)
                    setIsLoading(false)
                    return false;
                }
            }
            const { message, status, data } = await ResultSettings(name, model, slug)
            if(status === "success"){
                formRef.current.reset()
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
            }else {
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
                setIsLoading(false)
                setError(data)
            }
        } else {
            setIsLoading(false)
            setError(validated.error.format())
        }

    }
    return (
        <Card data={data} status={status} message={message} model={model} formRef={formRef} title={title} isLoading={isLoading} handel={handel}>
            {
                model !== "session" &&
                <>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        isError={error?.name}
                        type={model === "year" ? "number" : "text"}
                        name={"type"}
                        placeholder={placeholder}
                    />
                    {
                        error?.name && <Error message={error?.name._errors.join()} />
                    }
                </>
            }
            {
                model === "session" &&
                <>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        isError={error?.name}
                        type={"text"}
                        name={"type"}
                        placeholder={placeholder}
                    />
                    {
                        error?.name && <Error message={error?.name._errors.join()} />
                    }
                    <Input
                        onChange={(e) => setSlug(e.target.value)}
                        isError={errorSlug}
                        type={"text"}
                        name={"type"}
                        placeholder={"اكتب الاسم المختصر للدورة"}
                    />
                    {
                        errorSlug && <Error message={"رجاء اكتب الاسم المختصر للدورة"} />
                    }
                </>
            }
        </Card>
    )
}