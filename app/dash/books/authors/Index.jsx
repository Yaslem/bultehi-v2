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
import {AuthorSchema} from "../../../../helpers/Schemas";
import Error from "../../../auth/components/Error";
import {DeleteIcon, EditIcon} from "../../../components/ActionsIcon";
import Image from "next/image";
import Nothing from "../../../components/Nothing";
import Table, {Td} from "../../../components/Table";
import {createAuthor, deleteAuthor, updateAuthor} from "../../../../controllers/Author";

export default function Index({ authors, status, message }) {
    const [showAdd, setShowAdd] = useState(false)

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [currentId, setCurrentId] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const formRef = useRef()
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handelCreateAuthor =  async (e) => {

        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  AuthorSchema.safeParse({ name })
        if(validated.success) {
            setError({})
            const { message, status, data } = await createAuthor({name, description: desc})
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

    const handelEditAuthor = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  AuthorSchema.safeParse({ name })
        if(validated.success) {
            setError({})
            const { message, status, data } = await updateAuthor({id: currentId, name, description: desc})
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
    const handelDeleteAuthor = async (id) => {
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const { message, status, data } = await deleteAuthor(id)
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
                showAdd && <CardAdd onClick={() => setShowAdd(false)} title={isEdit ? "تعديل مؤلف" : "إضافة مؤلف"}>
                    <form ref={formRef} onSubmit={isEdit ? handelEditAuthor : handelCreateAuthor} className={"flex flex-col gap-3"}>
                        <Input onChange={(e) => setName(e.target.value)} isError={error?.name} defaultValue={name} type={"text"} name={"name"} label={"الاسم"} placeholder={"اكتب اسم المؤلف"} />
                        {
                            error?.name && <Error message={error?.name._errors.join()} />
                        }
                        <TextArea onChange={(e) => setDesc(e.target.value)} defaultValue={desc} name={"des"} label={"الوصف"} placeholder={"اكتب وصف المؤلف"} />
                        <Button title={isEdit ? "تعديل المؤلف" : "إضافة المؤلف"} isLoading={isLoading} />
                    </form>
                </CardAdd>
            }
            <div className={"flex items-center justify-between gap-4"}>
                <Title title={"المؤلفون"} />
                <Button onClick={() => setShowAdd(true)} title={"إضافة مؤلف"} />
            </div>
            {
                status === "success" &&
                <Table th={["الاسم", "الوصف", "الكتب", "خيارات"]}>
                    {
                        authors.map((author, index) =>
                            <tr key={index} className={"p-2 even:border-y border-dashed"}>
                                <Td value={author.name}/>
                                <Td value={author.description}/>
                                <Td value={author.books.length}/>
                                <Td value={
                                    <div className={"flex justify-center items-center gap-3"}>
                                        <EditIcon onClick={ async () => {
                                            setCurrentId(author.id)
                                            setShowAdd(true)
                                            setName(author.name)
                                            setDesc(author.description)
                                            setIsEdit(true)
                                        }} isLoading={isLoading} currentId={currentId} itemId={author.id} />
                                        <DeleteIcon onClick={ async () => {
                                            setCurrentId(author.id)
                                            await handelDeleteAuthor(author.id)
                                        }} isLoading={isLoading} currentId={currentId} itemId={author.id} />
                                    </div>
                                }/>
                            </tr>
                        )
                    }
                </Table>
            }
            { status === "error" && <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على مؤلفين، يرجى إضافة مؤلفين جدد لعرضهم. (:"} /> }
        </Section>
    )
}