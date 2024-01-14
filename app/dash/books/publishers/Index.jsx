"use client"
import Section from "../../components/Section";
import Title from "../../components/Title";
import Button from "../../../components/Button";
import CardAdd from "../../components/CardAdd";
import {useRef, useState} from "react";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import {useDispatch} from "react-redux";
import {toastActions} from "../../../../redux/slices/toastSlice";
import {AuthorSchema, PublisherSchema} from "../../../../helpers/Schemas";
import Error from "../../../auth/components/Error";
import {DeleteIcon, EditIcon} from "../../../components/ActionsIcon";
import Image from "next/image";
import Nothing from "../../../components/Nothing";
import Table, {Td} from "../../../components/Table";
import {createAuthor, deleteAuthor, updateAuthor} from "../../../../controllers/Author";
import {createPublisher, deletePublisher, updatePublisher} from "../../../../controllers/Publisher";

export default function Index({ publishers, status, message }) {
    const [showAdd, setShowAdd] = useState(false)

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [currentId, setCurrentId] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const formRef = useRef()
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handelCreatePublisher =  async (e) => {

        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  PublisherSchema.safeParse({ name })
        if(validated.success) {
            setError({})
            const { message, status, data } = await createPublisher({name, description: desc})
            if(status === "success"){
                formRef.current.reset()
                setShowAdd(false)
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
                setName("")
                setDesc("")
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

    const handelEditPublisher = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  AuthorSchema.safeParse({ name })
        if(validated.success) {
            setError({})
            const { message, status, data } = await updatePublisher({id: currentId, name, description: desc})
            if(status === "success"){
                formRef.current.reset()
                setShowAdd(false)
                setIsEdit(false)
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
                setName("")
                setDesc("")
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
    const handelDeletePublisher = async (id) => {
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const { message, status, data } = await deletePublisher(id)
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

    return (
        <Section>
            {
                showAdd && <CardAdd onClick={() => setShowAdd(false)} title={isEdit ? "تعديل ناشر" : "إضافة ناشر"}>
                    <form ref={formRef} onSubmit={isEdit ? handelEditPublisher : handelCreatePublisher} className={"flex flex-col gap-3"}>
                        <Input onChange={(e) => setName(e.target.value)} isError={error?.name} defaultValue={name} type={"text"} name={"name"} label={"الاسم"} placeholder={"اكتب اسم الناشر"} />
                        {
                            error?.name && <Error message={error?.name._errors.join()} />
                        }
                        <TextArea onChange={(e) => setDesc(e.target.value)} defaultValue={desc} name={"des"} label={"الوصف"} placeholder={"اكتب وصف الناشر"} />
                        <Button title={isEdit ? "تعديل الناشر" : "إضافة الناشر"} isLoading={isLoading} />
                    </form>
                </CardAdd>
            }
            <div className={"flex items-center justify-between gap-4"}>
                <Title title={"الناشرون"} />
                <Button onClick={() => setShowAdd(true)} title={"إضافة ناشر"} />
            </div>
            {
                status === "success" &&
                <Table th={["الاسم", "الوصف", "الكتب", "خيارات"]}>
                    {
                        publishers.map((publisher, index) =>
                            <tr key={index} className={"p-2 even:border-y border-dashed"}>
                                <Td value={publisher.name}/>
                                <Td value={publisher.description}/>
                                <Td value={publisher.books.length}/>
                                <Td value={
                                    <div className={"flex justify-center items-center gap-3"}>
                                        <EditIcon onClick={ async () => {
                                            setCurrentId(publisher.id)
                                            setShowAdd(true)
                                            setName(publisher.name)
                                            setDesc(publisher.description)
                                            setIsEdit(true)
                                        }} isLoading={isLoading} currentId={currentId} itemId={publisher.id} />
                                        <DeleteIcon onClick={ async () => {
                                            setCurrentId(publisher.id)
                                            await handelDeletePublisher(publisher.id)
                                        }} isLoading={isLoading} currentId={currentId} itemId={publisher.id} />
                                    </div>
                                }/>
                            </tr>
                        )
                    }
                </Table>
            }
            { status === "error" && <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على ناشرين، يرجى إضافة ناشرين جدد لعرضهم. (:"} /> }
        </Section>
    )
}