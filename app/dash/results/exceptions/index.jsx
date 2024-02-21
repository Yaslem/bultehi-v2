"use client"
import Title from "../../components/Title";
import Section from "../../components/Section";
import LinkCategories from "../../../components/LinkCategories";
import {usePathname} from "next/navigation";
import {IoSettingsSharp} from "react-icons/io5";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Table, {Td, Tr} from "../../../components/Table";
import Nothing from "../../../components/Nothing";
import {useDispatch} from "react-redux";
import CardAdd from "../../components/CardAdd";
import Error from "../../../components/Error";
import Select, {Option} from "../../../components/Select";
import Form from "../../../components/Form";
import {toastActions} from "../../../../redux/slices/toastSlice";
import Validate from "../../../../helpers/Validate";
import {
    createException,
    createResult,
    deleteException,
    deleteResult, updateException, updateExceptionApplied,
    updateResult,
    uploadResults
} from "../../../../controllers/Result"
import {DeleteIcon, EditIcon, Switch, UploadIcon} from "../../../components/ActionsIcon";
import 'dayjs/locale/ar'
import classNames from "classnames"
import {useEffect, useState} from "react";
import {getDateForHuman, getNumberFormat} from "../../../../helpers/Global";
import {AiOutlineException} from "react-icons/ai";

export default function Exceptions({
        exceptionsProps,
        yearsProps,
        typesProps,
        resultsProps
    }){

    const exceptions = {
        data: exceptionsProps.data,
        status: exceptionsProps.status,
        message: exceptionsProps.message,
    }

    const results = {
        data: resultsProps.data,
        status: resultsProps.status,
        message: resultsProps.message,
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

    const [name, setName] = useState()
    const [value, setValue] = useState()
    const [degree, setDegree] = useState()
    const [ref, setRef] = useState()
    const [applied, setApplied] = useState(false)

    const [exceptionId, setExceptionId] = useState()
    const [resultId, setResultId] = useState()
    const [yearId, setYearId] = useState()
    const [typeId, setTypeId] = useState()

    const [currentId, setCurrentId] = useState("")
    const [action, setAction] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handelCreateException = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))

        const validated = Validate.createException.safeParse({name, value, degree, ref, typeId: parseInt(typeId), yearId: parseInt(yearId), resultId: parseInt(resultId)})

        if(validated.success){
            const {status, message, data} = await createException({name, value, degree, ref, typeId, resultId, yearId})
            if (status === "success"){
                setShowAdd(false)
                setIsEdit(false)
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))

                setName(undefined)
                setValue(undefined)
                setDegree(undefined)
                setRef(undefined)
                setYearId(undefined)
                setTypeId(undefined)
                setResultId(undefined)
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

    const handelUpdateException = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated = Validate.updateException.safeParse({name, value, degree, ref, exceptionId: parseInt(exceptionId), typeId: parseInt(typeId), yearId: parseInt(yearId), resultId: parseInt(resultId)})

        if(validated.success){
            setError({})
            const {status, message, data} = await updateException(exceptionId,{name, value, degree, ref, typeId, resultId, yearId})
            if (status === "success"){
                setShowAdd(false)
                setIsEdit(false)
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))

                setName(undefined)
                setValue(undefined)
                setDegree(undefined)
                setRef(undefined)
                setYearId(undefined)
                setTypeId(undefined)
                setResultId(undefined)
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
                    title={isEdit ? "تعديل الاستثناء" : "إضافة استثناء"}>
                    <Form
                        onSubmit={isEdit ? handelUpdateException : handelCreateException} >
                        <div className={"flex gap-3"}>
                            <Input
                                onChange={(e) => setName(e.target.value)}
                                isError={error?.name}
                                defaultValue={name}
                                type={"text"}
                                name={"name"}
                                label={"الاسم"}
                                placeholder={"اكتب اسم الاستناء"} error={
                                error?.name && <Error message={error?.name._errors.join()} />
                            } />
                            <Input
                                onChange={(e) => setRef(e.target.value)}
                                isError={error?.ref}
                                defaultValue={ref}
                                type={"text"}
                                name={"ref"}
                                label={"المرجع"}
                                placeholder={"اكتب المرجع"} error={
                                error?.ref && <Error message={error?.ref._errors.join()} />
                            } />
                        </div>
                        <div className={"flex gap-3"}>
                            <Input
                                onChange={(e) => setDegree(e.target.value)}
                                isError={error?.degree}
                                defaultValue={degree}
                                type={"text"}
                                name={"degree"}
                                label={"الدرجة"}
                                placeholder={"اكتب الدرجة"} error={
                                error?.degree && <Error message={error?.degree._errors.join()} />
                            } />
                            <Input
                                onChange={(e) => setValue(e.target.value)}
                                isError={error?.value}
                                defaultValue={value}
                                type={"text"}
                                name={"value"}
                                label={"القيمة"}
                                placeholder={"اكتب القيمة"} error={
                                error?.value && <Error message={error?.value._errors.join()} />
                            } />
                        </div>
                        <Select
                            name={"resultId"}
                            onChange={(e) => setResultId(e.target.value)}
                            label={"النتيجة"}
                            defaultValue={resultId}
                            isError={error?.resultId} error={
                            error?.resultId && <Error message={error?.resultId._errors.join()} />
                        }>
                            {
                                results.data.map((result, index) =>
                                    <Option key={index} value={result.id} selected={yearId} title={result.title} />
                                )
                            }
                        </Select>
                        <div className={"flex gap-3"}>
                            <Select
                                name={"typeId"}
                                onChange={(e) => {
                                    setTypeId(e.target.value)
                                }}
                                label={"النوع"}
                                defaultValue={typeId}
                                isError={error?.typeId} error={
                                error?.typeId && <Error message={error?.typeId._errors.join()} />
                            }>
                                {
                                    types.data.map((type, index) =>
                                        <Option key={index} value={type.id} selected={typeId} title={type.name} />
                                    )
                                }
                            </Select>
                            <Select
                                name={"yearId"}
                                onChange={(e) => setYearId(e.target.value)}
                                label={"السنة"}
                                defaultValue={yearId}
                                isError={error?.yearId} error={
                                error?.yearId && <Error message={error?.yearId._errors.join()} />
                            }>
                                {
                                    years.data.map((year, index) =>
                                        <Option key={index} value={year.id} selected={yearId} title={year.name} />
                                    )
                                }
                            </Select>
                        </div>
                        <Button title={isEdit ? "تعديل الاستثناء" : "إضافة استثناء"} isLoading={isLoading} />
                    </Form>
                </CardAdd>
            }
            <div className={"flex items-center justify-between gap-3"}>
                <Title title={"الاستنثاءات"}/>
                <Button onClick={() => {
                    if(results.status === "error" || types.status === "error" || years.status === "error"){
                        setShowAdd(false)
                        dispatch(toastActions.setIsShow(true))
                        dispatch(toastActions.setStatus("error"))
                        dispatch(toastActions.setMessage("تأكّد من إضافة السنوات أو الأنواع أو النتائج."))
                    } else {
                        setShowAdd(true)
                    }

                }} title={"إضافة استثناء"} />
            </div>
            {
                exceptions.status === "success" &&
                <Table th={["الاسم", "المرجع", "الدرجة", "القيمة", "الحالة", "النتيجة", "السنة", "النوع", "خيارات"]}>
                    {
                        exceptions.data.map((exception, index) =>
                            <Tr key={index}>
                                <Td value={exception.name} />
                                <Td value={exception.ref} />
                                <Td value={exception.degree} />
                                <Td value={exception.value} />
                                <Td value={
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name={"applied"}
                                            value={""}
                                            checked={exception.applied}
                                            className="sr-only peer"
                                            onChange={ async (e) => {
                                                 await updateExceptionApplied(exception.id, e.target.checked)
                                            }}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                    </label>
                                }/>
                                <Td value={exception.result.title}/>
                                <Td value={exception.year.name}/>
                                <Td value={exception.type.name}/>
                                <Td value={
                                    <div className={"flex items-center justify-center gap-3"}>
                                        <EditIcon onClick={async () => {
                                            setCurrentId(exception.id)
                                            setExceptionId(exception.id)
                                            setAction("edit")
                                            setIsLoading(false)
                                            setShowAdd(true)
                                            setName(exception.name)
                                            setValue(exception.value)
                                            setRef(exception.ref)
                                            setDegree(exception.degree)
                                            setExceptionId(exception.id)
                                            setYearId(exception.yearId)
                                            setTypeId(exception.typeId)
                                            setResultId(exception.resultId)
                                            setIsEdit(true)

                                        }} isLoading={isLoading} itemId={exception.id} action={action} currentId={currentId} />
                                        <DeleteIcon onClick={ async () => {
                                            setCurrentId(exception.id)
                                            setAction("delete")

                                            setIsLoading(true)
                                            dispatch(toastActions.setIsShow(false))

                                            const { status, message } = await deleteException(exception.id)

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

                                        }} isLoading={isLoading} action={action} currentId={currentId} itemId={exception.id} />
                                    </div>
                                } />
                            </Tr>
                        )
                    }
                </Table>
            }
            {exceptions.status === "error" && <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على استثناءات، يرجى إضافة استثناء جديد لعرضه. (:"}/>}
        </Section>
    )
}