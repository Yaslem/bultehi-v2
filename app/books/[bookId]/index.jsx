"use client"
import Section from "../../dash/components/Section";
import Image from "next/image";
import {FaCalendarDays, FaFileWaveform, FaPenClip} from "react-icons/fa6";
import {BiSolidCategory} from "react-icons/bi";
import {RiOrganizationChart} from "react-icons/ri";
import {IoIosPricetags} from "react-icons/io";
import {FaHashtag} from "react-icons/fa";
import {BsCartPlusFill, BsFileEarmarkPost} from "react-icons/bs";
import {ImBooks} from "react-icons/im";
import {useEffect, useRef} from "react";
import ParseHTML from "../../../helpers/ParseHTML";
import {TbFileDownload} from "react-icons/tb";
import Table, {Td} from "../../components/Table";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../../redux/slices/cartSlice";
import {toastActions} from "../../../redux/slices/toastSlice";

export default function BookId({book}) {
    const parser = new DOMParser()
    const description = parser.parseFromString(book.description, "text/html")
    const devRef = useRef()

    const desc = new ParseHTML(description)

    useEffect(() => {
        devRef.current.append(desc.render())
    }, [desc, devRef])

    const dispatch = useDispatch()
    const items = useSelector(state => state.cart.items)

    return (
        <Section>
            <div className={"border rounded-lg flex flex-col overflow-hidden"}>
                <div className={"bg-stone-50 p-3 border-b font-bold text-slate-700 text-base"}> {book.title} </div>
                <div className={"flex gap-4 p-2 pt-4 shadow-inner"}>
                    <Image
                        className={"w-fit border self-center h-60 rounded-lg"}
                        width={100}
                        height={100}
                        src={`/uploads/books/${book.image}`} alt={"صورة الكتاب"}
                    />
                    <ul className={"flex flex-col gap-3 justify-between list-none w-full"}>
                        <li>
                            <h2 className={"text-xl font-semibold text-slate-700"}>{book.title}</h2>
                        </li>
                        <hr/>
                        <li className={"flex items-center gap-6"}>
                            <div className={"flex items-center gap-2"}>
                                <FaHashtag className={"text-2xl text-slate-500"}/>
                                <span
                                    className={"text-sm text-slate-600 font-medium"}>
                                    {book.isbn}
                                </span>
                            </div>
                            <div className={"flex items-center gap-2"}>
                                <IoIosPricetags className={"text-2xl text-slate-500"}/>
                                <span
                                    className={"text-sm text-slate-600 font-medium"}>
                                    {book.isFree ? "مجاني" : book.price + " أوقية"}
                                </span>
                            </div>
                        </li>
                        <hr/>
                        <li className={"flex items-center gap-6"}>
                            <div className={"flex items-center gap-2"}>
                                <RiOrganizationChart className={"text-2xl text-slate-500"}/>
                                <span
                                    className={"text-sm text-indigo-700 hover:text-indigo-600 transition-all font-medium cursor-pointer"}>
                                    {book.publisher.name}
                                </span>
                            </div>
                            <div className={"flex items-center gap-2"}>
                                <BiSolidCategory className={"text-2xl text-slate-500"}/>
                                <span
                                    className={"text-sm text-indigo-700 hover:text-indigo-600 transition-all font-medium cursor-pointer"}>
                                    {book.category.name}
                                </span>
                            </div>
                        </li>
                        <hr/>
                        <li className={"flex items-center gap-6"}>
                            <div className={"flex items-center gap-2"}>
                                <BsFileEarmarkPost className={"text-2xl text-slate-500"}/>
                                <span
                                    className={"text-sm text-slate-600 font-medium"}>
                                    {book.numberOfPages + " صفحة"}
                                </span>
                            </div>
                            <div className={"flex items-center gap-2"}>
                                <ImBooks className={"text-2xl text-slate-500"}/>
                                <span
                                    className={"text-sm text-slate-600 font-medium"}>
                                    {book.numberOfCopies + " نسخة"}
                                </span>
                            </div>
                        </li>
                        <hr/>
                        <li className={"flex items-center gap-6"}>
                            <div className={"flex items-center gap-2"}>
                                <FaCalendarDays className={"text-2xl text-slate-500"}/>
                                <span
                                    className={"text-sm text-slate-600 font-medium"}>
                                    {`${new Date(book.publishYear).getFullYear()}-${new Date(book.publishYear).getMonth() + 1}-${new Date(book.publishYear).getDate()}`}
                                </span>
                            </div>
                            <div className={"flex items-center gap-2"}>
                                <FaFileWaveform className={"text-2xl text-slate-500"}/>
                                <span
                                    className={"text-sm text-slate-600 font-medium"}>
                                    PDF
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={"border rounded-lg flex flex-col overflow-hidden"}>
                <div className={"bg-stone-50 p-3 border-b font-bold text-slate-700 text-base"}>عن الكتاب</div>
                <div ref={devRef} className={"p-2 pt-4 shadow-inner"}/>
            </div>
            <Table th={["التحميل", "عدد التحميلات", "عدد المشاهدات", "حجم الكتاب"]}>
                <tr className={"p-2 text-xs text-gray-700 font-medium"}>
                    <Td value={

                        <>
                            {
                                !book.isFree &&
                                <span
                                    onClick={() => {
                                        if(items.length > 0){
                                            items.map((item, index) => {
                                                if(item.id !== book.id){
                                                    dispatch(cartActions.add(
                                                        {
                                                            id: book.id,
                                                            title: book.title,
                                                            image: book.image,
                                                            priceBook: parseInt(book.price),
                                                            numberOfCopies: parseInt(book.numberOfCopies),
                                                            price: parseInt(book.price),
                                                            copies: 1,

                                                        }))
                                                    dispatch(toastActions.setIsShow(true))
                                                    dispatch(toastActions.setStatus("success"))
                                                    dispatch(toastActions.setMessage("تم إضافة الكتاب بنجاح إلى السلة."))
                                                } else {
                                                    dispatch(toastActions.setIsShow(true))
                                                    dispatch(toastActions.setStatus("error"))
                                                    dispatch(toastActions.setMessage("الكتاب موجود بالفعل في السلة."))
                                                }
                                            })
                                        } else {
                                            dispatch(cartActions.add(
                                                {
                                                    id: book.id,
                                                    title: book.title,
                                                    image: book.image,
                                                    priceBook: parseInt(book.price),
                                                    numberOfCopies: parseInt(book.numberOfCopies),
                                                    price: parseInt(book.price),
                                                    copies: 1,

                                                }))

                                            dispatch(toastActions.setIsShow(true))
                                            dispatch(toastActions.setStatus("success"))
                                            dispatch(toastActions.setMessage("تم إضافة الكتاب بنجاح إلى السلة."))
                                        }
                                    }}
                                    className={"p-2 flex m-auto justify-center items-center rounded-full w-10 h-10 cursor-pointer bg-yellow-50 border border-yellow-200"}>
                                    <BsCartPlusFill className={"text-2xl text-yellow-700 hover:text-yellow-600"}/>
                                </span>
                            }
                            {
                                book.isFree &&
                                <span className={"p-2 flex m-auto justify-center items-center rounded-full w-10 h-10 cursor-pointer bg-yellow-50 border border-yellow-200"}>
                                    <TbFileDownload className={"text-2xl text-yellow-700 hover:text-yellow-600"}/>
                                </span>
                            }
                        </>
                    }/>
                    <Td value={234}/>
                    <Td value={28}/>
                    <Td value={
                        <span dir={"ltr"}>2 MG</span>
                    }/>
                </tr>
            </Table>
        </Section>
    )
}