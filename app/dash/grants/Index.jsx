"use client"
import Section from "../components/Section";
import Title from "../components/Title";
import LinkBtn from "../../components/Link";
import {usePathname, useRouter} from "next/navigation";
import {BiSolidCategory} from "react-icons/bi";
import {FaHashtag} from "react-icons/fa";
import LinkCategories from "../../components/LinkCategories";
import Table, {Td, Tr} from "../../components/Table";
import Nothing from "../../components/Nothing";
import Image from "next/image";
import {DeleteIcon, EditIcon, ShowIcon, Switch} from "../../components/ActionsIcon";
import Link from "next/link";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {toastActions} from "../../../redux/slices/toastSlice";
import {deleteGrant, updateGrantPublished} from "../../../controllers/Grant";
import {revalidatePath} from "next/cache";
import {BsStack} from "react-icons/bs";

export default function Index({grants, status}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [currentId, setCurrentId] = useState("")
    const dispatch = useDispatch()

    const handelDeleteGrant = async (id, image) => {
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const { message, status, data } = await deleteGrant(id, image)
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
                <Title title={"المنح"} />
                <LinkBtn link={pathname + "/add"} title={"إضافة منحة"} />
            </div>
            <div className={"flex items-center w-full justify-between gap-3"}>
                <div className={"flex items-center w-full justify-end gap-3"}>
                    <LinkCategories link={pathname + "/colleges"} title={"الكليات"} icon={<BiSolidCategory className={"text-3xl"} />} />
                    <LinkCategories link={pathname + "/phases"} title={"المراحل"} icon={<BsStack className={"text-3xl"} />} />
                    <LinkCategories link={pathname + "/specializations"} title={"التخصصات"} icon={<FaHashtag className={"text-3xl"} />} />
                </div>
            </div>
            {
                status === "success" &&
                <Table th={["العنوان", "الصورة", "الكلية", "المرحلة", "التخصص", "الدولة", "السعر", "الحالة", "خيارات"]}>
                    {
                        grants.map((grant, index) =>
                            <Tr key={index}>
                                <Td value={grant.title.length <= 25 ? grant.title : grant.title.slice(0, 24) + "..."}/>
                                <Td value={<Image className={"border w-full h-16 object-cover rounded-lg"} width={60} height={60} src={`/uploads/grants/${grant.image}`} alt={"صورة المنحة"} />} />
                                <Td value={grant.college.name}/>
                                <Td value={grant.phase.name}/>
                                <Td value={grant.specialization.name}/>
                                <Td value={grant.country}/>
                                <Td value={grant.isFree ? "مجاني" : grant.price}/>
                                <Td value={
                                    <Switch name={grant.title} value={grant.id} checked={grant.isPublished} onChange={ async (e) => {
                                        const {status, message} = await updateGrantPublished(grant.id, e.target.checked)
                                        if(status === "success"){
                                            router.refresh()
                                            dispatch(toastActions.setIsShow(true))
                                            dispatch(toastActions.setStatus(status))
                                            dispatch(toastActions.setMessage(message))

                                        }
                                    }} />
                                }/>
                                <Td value={
                                    <div className={"flex justify-center items-center gap-3"}>
                                        <Link href={`${pathname}/${grant.id}/edit`}>
                                            <EditIcon />
                                        </Link>
                                        <ShowIcon link={"/grants/show"} />
                                        <DeleteIcon isLoading={isLoading} currentId={currentId} itemId={grant.id} onClick={async () => {
                                            setCurrentId(grant.id)
                                            await handelDeleteGrant(grant.id, grant.image)
                                        }} />
                                    </div>
                                }/>
                            </Tr>
                        )
                    }
                </Table>
            }
            {status === "error" && <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على منح، يرجى إضافة منح جديدة لعرضها. (:"}/>}
        </Section>
    )
}