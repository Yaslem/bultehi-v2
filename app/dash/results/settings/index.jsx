"use client"
import Input from "../../../components/Input";
import {useDispatch} from "react-redux";
import {useRef, useState} from "react";
import Card from "./Card";
import Error from "../../../components/Error";
import {ResultSettingsSchema} from "../../../../helpers/Schemas";
import {ResultSettings} from "../../../../controllers/ResultSettings";
import {toastActions} from "../../../../redux/slices/toastSlice";

export default function Settings({title, model, placeholder, data, status, message}) {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [nameFr, setNameFr] = useState("")
    const [slug, setSlug] = useState("")

    const formRef = useRef()
    const [error, setError] = useState({})
    const [errorSlug, setErrorSlug] = useState(false)
    const [errorNameFr, setErrorNameFr] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handel =  async (e) => {

        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  ResultSettingsSchema.safeParse({ name })
        if(validated.success) {
            setError({})
            if(model === "session" || model === "type"){
                if(slug.length === 0){
                    setErrorSlug(true)
                    setIsLoading(false)
                    return false;
                }
            }
            if(model === "unknown"){
                if(nameFr.length === 0){
                    setErrorNameFr(true)
                    setIsLoading(false)
                    return false;
                }
            }
            const { message, status, data } = await ResultSettings({name, nameFr, model, slug})
            if(status === "success"){
                formRef.current.reset()
                setIsLoading(false)
                setErrorNameFr(false)
                setErrorSlug(false)
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
                model === "year" &&
                <>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        isError={error?.name}
                        type={"number"}
                        name={"year"}
                        placeholder={placeholder}
                    />
                    {
                        error?.name && <Error message={error?.name._errors.join()} />
                    }
                </>
            }
            {
                model !== "year" &&
                <>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        isError={error?.name}
                        type={"text"}
                        name={model === "type" ? "type" : model === "unknown" ? "unknown" : "session"}
                        placeholder={placeholder}
                    />
                    {
                        error?.name && <Error message={error?.name._errors.join()} />
                    }
                    {
                        model === "unknown"
                            ? <>
                                <Input
                                    onChange={(e) => setNameFr(e.target.value)}
                                    isError={errorNameFr}
                                    type={"text"}
                                    name={"nameFr"}
                                    placeholder={`اكتب الاسم بالإنكليزية`}
                                />
                                {
                                    errorNameFr && <Error message={`اكتب الاسم بالإنكليزية`} />
                                }
                            </>
                            : <Input
                                onChange={(e) => setSlug(e.target.value)}
                                isError={errorSlug}
                                type={"text"}
                                name={"slug"}
                                placeholder={`اكتب الرقم المختصر ${model === "type" ? "للنوع" : "للدورة"}`}
                            />
                    }
                    {
                        errorSlug && <Error message={`رجاء اكتب الرقم المختصر ${model === "type" ? "للنوع" : "للدورة"}`} />
                    }
                </>
            }
        </Card>
    )
}