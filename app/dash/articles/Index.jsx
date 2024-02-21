"use client"
import Section from "../components/Section";
import Title from "../components/Title";
import LinkBtn from "../../components/Link";
import {usePathname, useRouter} from "next/navigation";
import {BiSolidCategory} from "react-icons/bi";
import {FaHashtag} from "react-icons/fa";
import Table, {Td, Tr} from "../../components/Table";
import LinkCategories from "../../components/LinkCategories";
import {BsPen} from "react-icons/bs";
import {SiAwsorganizations} from "react-icons/si";
import Nothing from "../../components/Nothing";
import {DeleteIcon, EditIcon, ShowIcon} from "../../components/ActionsIcon";
import Link from "next/link";
import {toastActions} from "../../../redux/slices/toastSlice";
import {deleteTag} from "../../../controllers/Tag";
import {deleteArticle} from "../../../controllers/Article";
import {useState} from "react";
import {useDispatch} from "react-redux";

export default function Index({articles, status}) {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(false)
    const [currentId, setCurrentId] = useState("")
    const dispatch = useDispatch()
    const handelDeleteArticle = async (id, image) => {
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const { message, status, data } = await deleteArticle(id, image)
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
                <Title title={"المقالات"}/>
                <LinkBtn link={pathname + "/add"} title={"إضافة مقالة"}/>
            </div>
            <div className={"flex items-center w-full justify-end gap-3"}>
                <LinkCategories link={pathname + "/categories"} title={"التصنيفات"} icon={<BiSolidCategory className={"text-3xl"}/>}/>
                <LinkCategories link={pathname + "/tags"} title={"الوسوم"} icon={<FaHashtag className={"text-3xl"}/>}/>
            </div>
            {
                status === "success" &&
                <Table th={["العنوان", "الكاتب", "التصنيف", "الوسوم", "التعليقات", "التاريخ", "خيارات"]}>
                    {
                        articles.map((article, index) =>
                            <Tr key={index}>
                                <Td value={article.title.length <= 30 ? article.title : article.title.slice(0, 29) + "..."}/>
                                <Td value={article.category.name.length <= 15 ? article.category.name : article.category.name.slice(0, 14) + "..."}/>
                                <Td value={article.user.name.length <= 15 ? article.user.name : article.user.name.slice(0, 14) + "..."}/>
                                <Td value={
                                    <div className={"flex items-center justify-center gap-2"}>
                                        {
                                            article.tags.length <= 1
                                                ? article.tags.map((tag, i) =>
                                                    <span key={i} className={"p-1 bg-indigo-50 text-xs text-indigo-600 border border-dashed border-indigo-200 rounded-lg"}>{tag.tag.name}</span>
                                                )
                                                : <span className={"p-1 bg-indigo-50 text-xs text-indigo-600 border border-dashed border-indigo-200 rounded-lg"}>{article.tags[0].tag.name + " + " + (article.tags.length - 1)}</span>
                                        }
                                    </div>
                                }/>
                                <Td value={0}/>
                                <Td value={`${new Date(article.createdAt).getFullYear()}-${new Date(article.createdAt).getMonth() + 1}-${new Date(article.createdAt).getDate()}`}/>
                                <Td value={
                                    <div className={"flex justify-center items-center gap-3"}>
                                        <Link href={`${pathname}/${article.id}/edit`}>
                                            <EditIcon />
                                        </Link>
                                        <ShowIcon link={"/books/show"} />
                                        <DeleteIcon isLoading={isLoading} currentId={currentId} itemId={article.id} onClick={async () => {
                                            setCurrentId(article.id)
                                            await handelDeleteArticle(article.id, article.image)
                                        }} />
                                    </div>
                                }/>
                            </Tr>
                        )
                    }
                </Table>
            }
            {status === "error" && <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على مقالات، يرجى إضافة مقالات جديدة لعرضها. (:"}/>}
        </Section>
    )
}