"use client"
import Section from "../components/Section";
import Title from "../components/Title";
import LinkBtn from "../../components/Link";
import {usePathname, useRouter} from "next/navigation";
import {BiSolidCategory} from "react-icons/bi";
import {FaHashtag, FaPenFancy} from "react-icons/fa";
import LinkCategories from "../../components/LinkCategories";
import {SiAwsorganizations} from "react-icons/si";
import {BsPen} from "react-icons/bs";
import Table, {Td, Tr} from "../../components/Table";
import Nothing from "../../components/Nothing";
import Image from "next/image";
import {DeleteIcon, EditIcon, ShowIcon} from "../../components/ActionsIcon";
import Link from "next/link";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {toastActions} from "../../../redux/slices/toastSlice";
import {deleteArticle} from "../../../controllers/Article";
import {deleteBook} from "../../../controllers/Book";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Index({books, status}) {
    const pathname = usePathname()

    const [isLoading, setIsLoading] = useState(false)
    const [currentId, setCurrentId] = useState("")
    const dispatch = useDispatch()

    const columns = [
        {
            name: "الرقم التسلسلي",
            value: "isbn"
        },
        {
            name: "العنوان",
            value: "title"
        },
        {
            name: "التصنيف",
            value: "category"
        },
        {
            name: "المؤلف",
            value: "author"
        },
        {
            name: "الناشر",
            value: "publisher"
        }
    ]
    const handelDeleteBook = async (id, image) => {
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const { message, status, data } = await deleteBook(id, image)
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
            <div className={"flex items-center justify-between gap-4"}>
                <Title title={"الكتب"} />
                <LinkBtn link={pathname + "/add"} title={"إضافة كتاب"} />
            </div>
            <div className={"flex items-center w-full justify-between gap-3"}>
                <div className={"flex items-end p-2 bg-white border border-dashed rounded-lg gap-2"}>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor={"type"} className={"text-xs font-medium text-slate-600"}>نوع البحث</label>
                        <select id={"type"} className={"bg-stone-50 p-2 text-sm text-slate-600 font-medium outline-0 focus:ring-2 focus:ring-indigo-600 border rounded-lg"}>
                            {
                                columns.map((column, index) =>
                                    <option key={index} value={column.value} selected={column.value === "title"}>{column.name}</option>
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

                    }} />
                </div>
                <div className={"flex items-center w-full justify-end gap-3"}>
                    <LinkCategories link={pathname + "/categories"} title={"التصنيفات"} icon={<BiSolidCategory className={"text-3xl"} />} />
                    <LinkCategories link={pathname + "/tags"} title={"الوسوم"} icon={<FaHashtag className={"text-3xl"} />} />
                    <LinkCategories link={pathname + "/authors"} title={"المؤلفون"} icon={<BsPen className={"text-3xl"} />} />
                    <LinkCategories link={pathname + "/publishers"} title={"الناشرون"} icon={<SiAwsorganizations className={"text-3xl"} />} />
                </div>
            </div>
            {
                status === "success" &&
                <Table th={["الرقم التسلسلي", "العنوان", "الصورة", "التصنيف", "المؤلفون", "الناشر", "السعر", "خيارات"]}>
                    {
                        books.map((book, index) =>
                            <Tr key={index}>
                                <Td value={book.isbn}/>
                                <Td value={book.title.length <= 25 ? book.title : book.title.slice(0, 24) + "..."}/>
                                <Td value={<Image className={"border rounded-lg"} width={60} height={60} src={`/uploads/books/${book.image}`} alt={"صورة الكتاب"} />} />
                                <Td value={book.category.name}/>
                                <Td value={
                                    <div className={"flex items-center justify-center gap-2"}>
                                        {
                                            book.authors.length <= 1
                                                ? book.authors.map((author, i) =>
                                                    <span key={i} className={"p-1 bg-indigo-50 text-xs text-indigo-600 border border-dashed border-indigo-200 rounded-lg"}>{author.author.name}</span>
                                                )
                                                : <span className={"p-1 bg-indigo-50 text-xs text-indigo-600 border border-dashed border-indigo-200 rounded-lg"}>{book.authors[0].author.name + " + " + (book.authors.length - 1)}</span>
                                        }
                                    </div>
                                }/>
                                <Td value={book.publisher.name}/>
                                <Td value={book.isFree ? "مجاني" : book.price}/>
                                <Td value={
                                    <div className={"flex justify-center items-center gap-3"}>
                                        <Link href={`${pathname}/${book.id}/edit`}>
                                            <EditIcon />
                                        </Link>
                                        <ShowIcon link={"/books/show"} />
                                        <DeleteIcon isLoading={isLoading} currentId={currentId} itemId={book.id} onClick={async () => {
                                            setCurrentId(book.id)
                                            await handelDeleteBook(book.id, book.image)
                                        }} />
                                    </div>
                                }/>
                            </Tr>
                        )
                    }
                </Table>
            }
            {status === "error" && <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على كتب، يرجى إضافة كتب جديدة لعرضها. (:"}/>}
        </Section>
    )
}