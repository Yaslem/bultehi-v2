"use client"
import Title from "../components/Title";
import Section from "../components/Section";
import LinkCategories from "../../components/LinkCategories";
import {usePathname} from "next/navigation";
import {IoSettingsSharp} from "react-icons/io5";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Table, {Td, Tr} from "../../components/Table";
import Nothing from "../../components/Nothing";
import {useDispatch} from "react-redux";
import CardAdd from "../components/CardAdd";
import Error from "../../components/Error";
import Select, {Option} from "../../components/Select";
import Form from "../../components/Form";
import {toastActions} from "../../../redux/slices/toastSlice";
import Validate from "../../../helpers/Validate";
import {
    createResult,
    deleteResult,
    updateExceptionApplied,
    updateResult, updateResultPublished,
    uploadResults
} from "../../../controllers/Result"
import {DeleteIcon, EditIcon, Switch, UploadIcon} from "../../components/ActionsIcon";
import 'dayjs/locale/ar'
import classNames from "classnames"
import {useEffect, useState} from "react";
import {getDateForHuman, getNumberFormat} from "../../../helpers/Global";
import {AiOutlineException} from "react-icons/ai";

export default function Results({
        resultsProps,
        yearsProps,
        typesProps,
        sessionsProps
    }){

    const results = {
        data: resultsProps.data,
        status: resultsProps.status,
        message: resultsProps.message,
    }

    const sessions = {
        data: sessionsProps.data,
        status: sessionsProps.status,
        message: sessionsProps.message,
    }

    const years = {
        data: yearsProps.data,
        status: yearsProps.status,
        message: yearsProps.message,
    }

    const types = {
        data: typesProps.data,
        status: typesProps.status,
        message: typesProps.message,
    }

    const [showAdd, setShowAdd] = useState(false)
    const dispatch = useDispatch()

    const [title, setTitle] = useState()
    const [file, setFile] = useState()
    const [newFile, setNewFile] = useState()
    const [isNewFile, setIsNewFile] = useState(false)

    const [resultId, setResultId] = useState()
    const [yearId, setYearId] = useState()
    const [typeId, setTypeId] = useState()
    const [sessionId, setSessionId] = useState()

    const [currentId, setCurrentId] = useState("")
    const [action, setAction] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isBac, setIsBac] = useState(false)

    const pathname = usePathname()

    const columns = [
        {
            name: "مسابقة ختم الدروس الثانوية",
            value: "isbn"
        },
        {
            name: "مسابقة ختم الدروس الإعدادية",
            value: "title"
        },
        {
            name: "مسابقة ختم الدورس الابتدائية",
            value: "category"
        }
    ]

    const handelCreateResult = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))

        const validated = isBac ? Validate.createResult.safeParse({title, typeId: parseInt(typeId), yearId: parseInt(yearId), sessionId: parseInt(sessionId), file}) : Validate.createResult.safeParse({title, typeId: parseInt(typeId), yearId: parseInt(yearId), file})

        if(validated.success){
            setError({})
            const formData = new FormData()
            formData.append("fileResult", file)
            const {status, message, data} = await createResult({title, isBac, typeId, sessionId, yearId}, formData)
            if (status === "success"){
                setShowAdd(false)
                setIsEdit(false)
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))

                setTitle(undefined)
                setYearId(undefined)
                setTypeId(undefined)
                setFile(undefined)
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

    const handelUpdateResult = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated = isBac ? Validate.updateResult.safeParse({title, yearId: parseInt(yearId), sessionId: parseInt(sessionId)}) : Validate.updateResult.safeParse({title, yearId: parseInt(yearId)})

        if(validated.success){
            setError({})
            const formData = new FormData()
            formData.append("fileResult", newFile)
            const {status, message, data} = await updateResult(resultId, {title, isBac, file, sessionId, yearId}, formData)
            if (status === "success"){
                setShowAdd(false)
                setIsEdit(false)
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))

                setTitle(undefined)
                setYearId(undefined)
                setTypeId(undefined)
                setFile(undefined)
                setNewFile(undefined)
                setIsNewFile(false)
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
        <Section>
            {
                showAdd &&
                <CardAdd
                    onClick={() => setShowAdd(false)}
                    title={isEdit ? "تعديل النتيجة" : "إضافة نتيجة"}>
                    <Form
                        onSubmit={isEdit ? handelUpdateResult : handelCreateResult} >
                        <Input
                            onChange={(e) => setTitle(e.target.value)}
                            isError={error?.title}
                            defaultValue={title}
                            type={"text"}
                            name={"title"}
                            label={"العنوان"}
                            placeholder={"اكتب عنوان النتيجة"} />
                        {
                            error?.title && <Error message={error?.title._errors.join()} />
                        }
                        {
                            !isEdit &&
                            <>
                                <Select
                                    name={"typeId"}
                                    onChange={(e) => {
                                        setTypeId(e.target.value.toString().split("-").shift())
                                        if(Number(e.target.value.toString().split("-").pop()) === 5) {
                                            setIsBac(true)
                                        } else {
                                            setIsBac(false)
                                        }
                                    }}
                                    label={"النوع"}
                                    defaultValue={typeId}
                                    isError={error?.typeId}>
                                    {
                                        types.data.map((type, index) =>
                                            <Option key={index} value={`${type.id}-${type.slug}`} selected={typeId} title={type.name} />
                                        )
                                    }
                                </Select>
                                {
                                    error?.typeId && <Error message={error?.typeId._errors.join()} />
                                }
                            </>
                        }
                        {
                            isBac &&
                            <Select
                                name={"sessionId"}
                                onChange={(e) => setSessionId(e.target.value)}
                                label={"الدورة"}
                                defaultValue={sessionId}
                                isError={error?.sessionId}>
                                {
                                    sessions.data.map((session, index) =>
                                        <Option key={index} value={session.id} selected={sessionId} title={session.name} />
                                    )
                                }
                            </Select>
                        }
                        {
                            error?.sessionId && <Error message={error?.sessionId._errors.join()} />
                        }
                        <Select
                            name={"yearId"}
                            onChange={(e) => setYearId(e.target.value)}
                            label={"السنة"}
                            defaultValue={yearId}
                            isError={error?.yearId}>
                            {
                                years.data.map((year, index) =>
                                    <Option key={index} value={year.id} selected={yearId} title={year.name} />
                                )
                            }
                        </Select>
                        {
                            error?.yearId && <Error message={error?.yearId._errors.join()} />
                        }
                        {
                            isEdit
                                ? <>
                                    <Switch
                                        title={"ملف جديد؟"}
                                        checked={isNewFile}
                                        onChange={(e) => {
                                            if(e.target.checked){
                                                setIsNewFile(true)
                                            } else {
                                                setIsNewFile(false)
                                            }
                                        }} />
                                    {
                                        isNewFile &&
                                        <>
                                            <Input
                                                onChange={(e) => {
                                                    if(isEdit){
                                                        setNewFile(e.target.files[0])
                                                    }else {
                                                        setFile(e.target.files[0])
                                                    }
                                                }}
                                                isError={error?.file}
                                                type={"file"}
                                                name={"file"} />
                                            {
                                                error?.file && <Error message={error?.file._errors.join()} />
                                            }
                                        </>
                                    }
                                </>
                                : <>
                                    <Input
                                        onChange={(e) => {
                                            if(isEdit){
                                                setNewFile(e.target.files[0])
                                            }else {
                                                setFile(e.target.files[0])
                                            }
                                        }}
                                        isError={error?.file}
                                        type={"file"}
                                        name={"file"}
                                        label={"ملف النتائج"} />
                                    {
                                        error?.file && <Error message={error?.file._errors.join()} />
                                    }
                                </>
                        }
                        <Button title={isEdit ? "تعديل النتيجة" : "إضافة نتيجة"} isLoading={isLoading} />
                    </Form>
                </CardAdd>
            }
            <div className={"flex items-center justify-between gap-3"}>
                <Title title={"النتائج"}/>
                <Button onClick={() => {
                    if(sessions.status === "error" || types.status === "error" || years.status === "error"){
                        setShowAdd(false)
                        dispatch(toastActions.setIsShow(true))
                        dispatch(toastActions.setStatus("error"))
                        dispatch(toastActions.setMessage("تأكّد من إضافة السنوات أو الأنواع أو الدورات."))
                    } else {
                        setShowAdd(true)
                    }

                }} title={"إضافة نتيجة"} />
            </div>
            <div className={"flex justify-between gap-3"}>
                <div className={"flex items-end p-2 bg-white border border-dashed rounded-lg gap-2"}>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor={"type"} className={"text-xs font-medium text-slate-600"}>نوع البحث</label>
                        <select id={"type"}
                                className={"bg-stone-50 p-2 text-sm text-slate-600 font-medium outline-0 focus:ring-2 focus:ring-indigo-600 border rounded-lg"}>
                            {
                                columns.map((column, index) =>
                                    <option key={index} value={column.value}
                                            selected={column.value === "title"}>{column.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <Input
                        name={"name"}
                        label={"البحث"}
                        type={"search"}
                        placeholder={"اكتب ما تبحث عنه.."}
                        onChange={() => {

                        }}
                    />
                    <Button
                        title={"بحث"}
                        isOnlyIcon={true}
                        onClick={() => {

                        }}/>
                </div>
                <div className={"flex items-center w-full justify-end gap-3"}>
                    <LinkCategories
                        link={pathname + "/exceptions"}
                        title={"استثناءات النتائج"}
                        icon={<AiOutlineException className={"text-3xl"}/>}/>
                    <LinkCategories
                        link={pathname + "/settings"}
                        title={"إعدادات النتائج"}
                        icon={<IoSettingsSharp className={"text-3xl"}/>}/>
                </div>
            </div>
            {
                results.status === "success" &&
                <Table th={["العنوان", "السنة", "النوع", "الدورة", "الإجمالي", "آخر تحديث", "حالة النشر","حالة التحميل", "خيارات"]}>
                    {
                        results.data.map((result, index) =>
                            <Tr key={index}>
                                <Td value={result.title} />
                                <Td value={result.year.name} />
                                <Td value={result.type.name} />
                                <Td value={result.session ? result.session.name : "---"} />
                                <Td value={getNumberFormat(result._count.students)} />
                                <Td value={getDateForHuman(result.updatedAt, false)} />
                                <Td value={
                                    <Switch name={result.title} value={result.id} checked={result.isPublished} onChange={ async (e) => {
                                        await updateResultPublished(result.id, e.target.checked)
                                    }} />
                                }/>
                                <Td value={
                                    <span
                                        className={classNames({
                                            "text-xs font-semibold border border-dashed flex items-center justify-center p-2 rounded-lg": true,
                                            "border-green-200 text-green-700 bg-green-50": result.isUploaded,
                                            "border-lime-200 text-lime-700 bg-lime-50": !result.isUploaded,
                                        })}>
                                        {
                                            result.isUploaded
                                                ? "محمّلة"
                                                : "غير محمّلة"
                                        }
                                    </span>
                                } />
                                <Td value={
                                    <div className={"flex items-center justify-center gap-3"}>
                                        <EditIcon onClick={ async () => {
                                            setCurrentId(result.id)
                                            setAction("edit")
                                            setIsLoading(false)
                                            setShowAdd(true)
                                            setResultId(result.id)
                                            setTitle(result.title)
                                            setFile(result.file)
                                            setYearId(result.yearId)
                                            if(result.type.slug === 5){
                                                setIsBac(true)
                                                setSessionId(result.sessionId)
                                            } else {
                                                setIsBac(false)
                                            }
                                            setIsEdit(true)

                                        }} isLoading={isLoading} itemId={result.id} action={action} currentId={currentId} />
                                        <UploadIcon onClick={ async () => {
                                            setIsLoading(true)
                                            setAction("upload")
                                            setCurrentId(result.id)
                                           const { status, message } =  await uploadResults(result.id)

                                            if (status === "success"){
                                                setIsLoading(false)
                                                dispatch(toastActions.setIsShow(true))
                                                dispatch(toastActions.setStatus(status))
                                                dispatch(toastActions.setMessage(message))

                                                setTitle(undefined)
                                                setYearId(undefined)
                                                setTypeId(undefined)
                                                setFile(undefined)
                                            }else {
                                                dispatch(toastActions.setIsShow(true))
                                                dispatch(toastActions.setStatus(status))
                                                dispatch(toastActions.setMessage(message))
                                                setIsLoading(false)
                                            }

                                        }} isLoading={isLoading} action={action} itemId={result.id} currentId={currentId} />
                                        <DeleteIcon onClick={ async () => {
                                            setCurrentId(result.id)
                                            setAction("delete")

                                            setIsLoading(true)
                                            dispatch(toastActions.setIsShow(false))

                                            const { status, message } = await deleteResult(result.id, result.file)

                                            if (status === "success"){
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

                                        }} isLoading={isLoading} action={action} currentId={currentId} itemId={result.id} />
                                    </div>
                                } />
                            </Tr>
                        )
                    }
                </Table>
            }
            {results.status === "error" && <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على نتائج، يرجى إضافة نتائج جديدة لعرضها. (:"}/>}
        </Section>
    )
}