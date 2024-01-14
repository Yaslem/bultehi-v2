"use client"
import Section from "../components/Section";
import Title from "../components/Title";
import LinkBtn from "../../components/Link";
import {usePathname, useRouter} from "next/navigation";
import {BiSolidCategory} from "react-icons/bi";
import {FaHashtag} from "react-icons/fa";
import Table, {Td} from "../../components/Table";

export default function Index({articles}) {
    const pathname = usePathname()
    const router = useRouter()
    console.log(articles)
    return (
        <Section>
            <div className={"flex items-center justify-between gap-4"}>
                <Title title={"المقالات"} />
                <LinkBtn link={pathname + "/add"} title={"إضافة مقالة"} />
            </div>
            <div className={"flex items-center w-full justify-end gap-3"}>
                <div onClick={() => router.push(pathname + "/categories")} className={"flex flex-col hover:border-indigo-600 gap-2 p-2 text-slate-600 text-sm font-medium rounded-lg items-center bg-stone-50 cursor-pointer border border-dashed"}>
                    <BiSolidCategory className={"text-3xl"} />
                    <span>التصنيفات</span>
                </div>
                <div onClick={() => router.push(pathname + "/tags")} className={"flex flex-col hover:border-indigo-600 gap-2 p-2 text-slate-600 text-sm font-medium rounded-lg items-center bg-stone-50 cursor-pointer border border-dashed"}>
                    <FaHashtag className={"text-3xl"} />
                    <span>الوسوم</span>
                </div>
            </div>
            <Table
                th={["العنوان", "الكاتب", "التصنيف", "الوسوم", "التعليقات", "التاريخ"]}>
                {
                    articles.map((article, index) =>
                        <tr key={index} className={"p-2 even:bg-stone-50 text-xs text-gray-700 font-medium"}>
                            <Td value={article.title}/>
                            <Td value={article.category.name}/>
                            <Td value={article.user.name}/>
                            <Td value={
                                <div className={"flex items-center gap-2"}>
                                    {
                                        article.tags.map((tag, i) =>
                                            <span key={i} className={"p-1 bg-indigo-50 text-indigo-600 border border-dashed border-indigo-200 rounded-lg"}>{tag.tag.name}</span>
                                        )
                                    }
                                </div>
                            }/>
                            <Td value={0}/>
                            <Td value={"---"}/>
                        </tr>
                    )
                }
            </Table>
        </Section>
    )
}