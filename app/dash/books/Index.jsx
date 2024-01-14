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
import Table, {Td} from "../../components/Table";
import Nothing from "../../components/Nothing";
import Image from "next/image";
import {DeleteIcon, EditIcon, ShowIcon} from "../../components/ActionsIcon";

export default function Index({books, status}) {
    const pathname = usePathname()
    return (
        <Section>
            <div className={"flex items-center justify-between gap-4"}>
                <Title title={"الكتب"} />
                <LinkBtn link={pathname + "/add"} title={"إضافة كتاب"} />
            </div>
            <div className={"flex items-center w-full justify-end gap-3"}>
                <LinkCategories link={pathname + "/categories"} title={"التصنيفات"} icon={<BiSolidCategory className={"text-3xl"} />} />
                <LinkCategories link={pathname + "/tags"} title={"الوسوم"} icon={<FaHashtag className={"text-3xl"} />} />
                <LinkCategories link={pathname + "/authors"} title={"المؤلفون"} icon={<BsPen className={"text-3xl"} />} />
                <LinkCategories link={pathname + "/publishers"} title={"الناشرون"} icon={<SiAwsorganizations className={"text-3xl"} />} />
            </div>
            {
                status === "success" &&
                <Table th={["العنوان", "الصورة", "الرقم التسلسلي", "التصنيف", "المرلفون", "الناشر", "السعر", "خيارات"]}>
                    {
                        books.map((book, index) =>
                            <tr key={index} className={"p-2 even:bg-stone-50 text-xs text-gray-700 font-medium"}>
                                <Td value={book.title}/>
                                <Td value={<Image className={"border rounded-lg"} width={60} height={60} src={`/uploads/books/${book.image}`} alt={"صورة الكتاب"} />} />
                                <Td value={book.isbn}/>
                                <Td value={book.category.name}/>
                                <Td value={
                                    <div className={"flex items-center gap-2"}>
                                        {
                                            book.authors.map((author, i) =>
                                                <span key={i} className={"p-1 bg-indigo-50 text-indigo-600 border border-dashed border-indigo-200 rounded-lg"}>{author.author.name}</span>
                                            )
                                        }
                                    </div>
                                }/>
                                <Td value={book.publisher.name}/>
                                <Td value={book.isFree ? "مجاني" : book.price}/>
                                <Td value={
                                    <div className={"flex justify-center items-center gap-3"}>
                                        <EditIcon onClick={async () => {
                                            // setCurrentId(tag.id)
                                            // setShowAdd(true)
                                            // setName(tag.name)
                                            // setDesc(tag.description)
                                            // setSlug(tag.slug)
                                            // setIsEdit(true)
                                        }} />
                                        <ShowIcon link={"/books/show"} />
                                        <DeleteIcon onClick={async () => {
                                            // setCurrentId(tag.id)
                                            // await handelDeleteTag(tag.id)
                                        }} />
                                    </div>
                                }/>
                            </tr>
                        )
                    }
                </Table>
            }
            {status === "error" && <Nothing title={"عفوا 😔"}
                                            desc={"المعذرة منك، لم نتمكن من العثور على كتب، يرجى إضافة كتب جديدة لعرضها. (:"}/>}
        </Section>
    )
}