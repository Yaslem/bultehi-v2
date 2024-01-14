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
import {CategorySchema} from "../../../../helpers/Schemas";
import {createCategory, deleteCategory, updateCategory} from "../../../../controllers/Category";
import Error from "../../../auth/components/Error";
import {DeleteIcon, EditIcon} from "../../../components/ActionsIcon";
import Image from "next/image";
import Nothing from "../../../components/Nothing";
import Table, {Td} from "../../../components/Table";

export default function Index({ categories, status, message }) {
    const [showAdd, setShowAdd] = useState(false)

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [desc, setDesc] = useState("")
    const [currentId, setCurrentId] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const formRef = useRef()
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handelCreateCategory =  async (e) => {

        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  CategorySchema.safeParse({ name })
        if(validated.success) {
            setError({})
            const { message, status, data } = await createCategory({name, slug, type: "BOOK", description: desc})
            if(status === "success"){
                formRef.current.reset()
                setShowAdd(false)
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
                setName("")
                setSlug("")
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

    const handelEditCategory = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  CategorySchema.safeParse({ name })
        if(validated.success) {
            setError({})
            const { message, status, data } = await updateCategory({id: currentId, name, slug, type: "BOOK", description: desc})
            if(status === "success"){
                formRef.current.reset()
                setShowAdd(false)
                setIsEdit(false)
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))
                setName("")
                setSlug("")
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
    const handelDeleteCategory = async (id) => {
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const { message, status, data } = await deleteCategory(id)
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
                showAdd && <CardAdd onClick={() => setShowAdd(false)} title={isEdit ? "تعديل تصنيف" : "إضافة تصنيف"}>
                    <form ref={formRef} onSubmit={isEdit ? handelEditCategory : handelCreateCategory} className={"flex flex-col gap-3"}>
                        <Input onChange={(e) => setName(e.target.value)} isError={error?.name} defaultValue={name} type={"text"} name={"name"} label={"الاسم"} placeholder={"اكتب اسم التصنيف"} />
                        {
                            error?.name && <Error message={error?.name._errors.join()} />
                        }
                        <Input onChange={(e) => setSlug(e.target.value)} type={"text"} defaultValue={slug} name={"slug"} label={"الاسم اللطيف"} placeholder={"اكتب الاسم اللطيف"} />
                        <TextArea onChange={(e) => setDesc(e.target.value)} defaultValue={desc} name={"des"} label={"الوصف"} placeholder={"اكتب وصف التصنيف"} />
                        <Button title={isEdit ? "تعديل التصنيف" : "إضافة تصنيف"} isLoading={isLoading} />
                    </form>
                </CardAdd>
            }
            <div className={"flex items-center justify-between gap-4"}>
                <Title title={"التصنيفات"} />
                <Button onClick={() => setShowAdd(true)} title={"إضافة تصنيف"} />
            </div>
            {
                status === "success" &&
                <Table th={["الاسم", "الاسم اللطيف", "الوصف", "المقالات", "خيارات"]}>
                    {
                        categories.map((category, index) =>
                            <tr key={index} className={"p-2 even:border-y border-dashed"}>
                                <Td value={category.name}/>
                                <Td value={category.slug}/>
                                <Td value={category.description}/>
                                <Td value={category.articles.length}/>
                                <Td value={
                                    <div className={"flex justify-center items-center gap-3"}>
                                        <EditIcon onClick={ async () => {
                                            setCurrentId(category.id)
                                            setShowAdd(true)
                                            setName(category.name)
                                            setDesc(category.description)
                                            setSlug(category.slug)
                                            setIsEdit(true)
                                        }} isLoading={isLoading} currentId={currentId} itemId={category.id} />
                                        <DeleteIcon onClick={ async () => {
                                            setCurrentId(category.id)
                                            await handelDeleteCategory(category.id)
                                        }} isLoading={isLoading} currentId={currentId} itemId={category.id} />
                                    </div>
                                }/>
                            </tr>
                        )
                    }
                </Table>
            }
            { status === "error" && <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على بيانات، يرجى إضافة تصنيفات جديدة لعرضها. (:"} /> }
        </Section>
    )
}