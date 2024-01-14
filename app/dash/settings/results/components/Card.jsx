"use client"
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import {IoCalendarOutline} from "react-icons/io5";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {toastActions} from "../../../../../redux/slices/toastSlice";
import {ResultSettingsSchema} from "../../../../../helpers/Schemas";
import {
    deleteSession,
    deleteType,
    deleteYear,
    updateResultSettings
} from "../../../../../controllers/ResultSettings";
import {MdEdit, MdTypeSpecimen} from "react-icons/md";
import {WiMoonAltFirstQuarter} from "react-icons/wi";
import {BsTrash3Fill} from "react-icons/bs";
import {TbProgress} from "react-icons/tb";
import Error from "../../../../auth/components/Error";

export default function Card({data, status, message, model, title, handel, isLoading, formRef, children }) {

    const dispatch = useDispatch()
    const [isLoadingEdit, setIsLoadingEdit] = useState(false)
    const [isLoadingD, setIsLoading] = useState(false)
    const [currentId, setCurrentId] = useState()
    const [isEdit, setIsEdit] = useState(false)

    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [placeholder, setPlaceholder] = useState("")

    const formRefEdit = useRef()
    const [error, setError] = useState({})
    const [errorSlug, setErrorSlug] = useState(false)

    const getIcon = () => {
        switch (model) {
            case "type":
                return <MdTypeSpecimen className={"text-2xl"} />
            case "year":
                return <IoCalendarOutline className={"text-2xl"} />
            case "session":
                return <WiMoonAltFirstQuarter className={"text-2xl"} />
                break;
        }
    }

    const getPlaceholder= () => {
        switch (model) {
            case "type":
                return  setPlaceholder("اكتب اسم النوع")
            case "year":
                return  setPlaceholder("اكتب اسم السنة")
            case "session":
                return  setPlaceholder("اكتب اسم الدورة")
                break;
        }
    }

    const deleteItem = async (id) => {

        setIsLoading(true)
        const { message, status, data } = model === "type" ? await deleteType(id) : model === "year" ? await deleteYear(id) : await deleteSession(id)
        if(status === "success"){
            setIsLoading(false)
            dispatch(toastActions.setIsShow(true))
            dispatch(toastActions.setStatus(status))
            dispatch(toastActions.setMessage(message))
        }else {
            dispatch(toastActions.setIsShow(true))
            dispatch(toastActions.setStatus(status))
            dispatch(toastActions.setMessage(message))
            setIsLoading(false)
        }
    }

    const handelEdit =  async (e) => {

        e.preventDefault()
        setIsLoadingEdit(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  ResultSettingsSchema.safeParse({ name })
        if(validated.success) {
            setError({})
            if(model === "session"){
                if(slug.length === 0){
                    setErrorSlug(true)
                    setIsLoadingEdit(false)
                    return false;
                }
            }
            const { message, status, data } = await updateResultSettings(currentId, name, model, slug)
            if(status === "success"){
                formRefEdit.current.reset()
                setIsLoadingEdit(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
                setIsEdit(false)
            }else {
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
                setIsLoading(false)
                setError(data)
            }
        } else {
            setIsLoadingEdit(false)
            setError(validated.error.format())
        }

    }

    return (
        <div className={"flex flex-col gap-3 p-2 bg-stone-50 border border-dashed rounded-lg"}>
            <h3 className={"text-lg font-bold text-slate-700"}>{title}</h3>
            <form ref={isEdit ? formRefEdit : formRef} onSubmit={isEdit ? handelEdit : handel} className={"flex gap-2"}>
                <div className={"flex-grow flex flex-col gap-2"}>
                    {
                        isEdit &&
                        <>
                            {
                                model !== "session" &&
                                <>
                                    <Input
                                        onChange={(e) => setName(e.target.value)}
                                        isError={error?.name}
                                        type={model === "year" ? "number" : "text"}
                                        name={"type"}
                                        defaultValue={name}
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
                                        defaultValue={name}
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
                                        defaultValue={slug}
                                        placeholder={"اكتب الاسم المختصر للدورة"}
                                    />
                                    {
                                        errorSlug && <Error message={"رجاء اكتب الاسم المختصر للدورة"} />
                                    }
                                </>
                            }
                        </>
                    }
                    {
                        !isEdit && children
                    }
                </div>
                <div className={"self-start"}>
                    <Button isOnlyIcon={true} isLoading={isEdit ? isLoadingEdit : isLoading} title={isEdit ? "تحديث" : "إضافة"} />
                </div>
            </form>
            <hr />
            <ul className={"flex flex-col gap-3"}>
                {
                    data.map((d, index) =>
                        <li key={index} className={"flex items-center justify-between gap-2 text-slate-600"}>
                            <div className={"flex items-center gap-2"}>
                                {
                                    getIcon()
                                }
                                <span className={"text-sm font-medium"}>{model === "year" ? `سنة ${d.name}` : d.name}</span>
                            </div>
                            <div className={"flex items-center gap-3"}>
                                <span onClick={async () => {
                                    setName(d.name)
                                    setSlug(d.slug)
                                    setCurrentId(d.id)
                                    getPlaceholder()
                                    setIsEdit(currentId === d.id ? !isEdit : true)
                                }} className={"cursor-pointer p-2 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 border border-dashed border-indigo-200"}>
                                    {
                                        isLoadingEdit && currentId === d.id
                                            ? <TbProgress className={"text-xl text-indigo-600 animate-spin"} />
                                            : <MdEdit className={"text-xl text-indigo-600 hover:text-indigo-500"} />
                                    }
                                </span>
                                <span onClick={async () => {
                                    setCurrentId(d.id)
                                    await deleteItem(d.id)
                                }} className={"cursor-pointer p-2 flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 border border-dashed border-red-200"}>
                                    {
                                        isLoadingD && currentId === d.id
                                            ? <TbProgress className={"text-xl text-red-600 animate-spin"} />
                                            : <BsTrash3Fill className={"text-xl text-red-600 hover:text-red-500"} />
                                    }

                                </span>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}