"use client"
import Section from "../dash/components/Section";
import Title from "../dash/components/Title";
import Image from "next/image";
import {BiSolidCategory} from "react-icons/bi";
import {FaPenClip} from "react-icons/fa6";
import Link from "next/link";
import HeaderSection from "../primary-education/components/HeaderSection";
import {TbFileDownload} from "react-icons/tb";
import {AiOutlineLike} from "react-icons/ai";
import {MdChromeReaderMode} from "react-icons/md";
import LinkBtn from "../components/Link";

export default function Index({books}) {
    return (
        <Section>
            <Title title={"المكتبة"}/>
            <div className={"grid grid-cols-4 gap-4"}>
                {
                    books.map((book, index) =>
                        <div key={index} className={"shadow rounded-lg border p-2 flex flex-col gap-4"}>
                            <Image
                                className={"w-fit border self-center h-60 rounded-lg"}
                                width={100}
                                height={100}
                                src={`/uploads/books/${book.image}`} alt={"صورة الكتاب"}
                            />
                            <h1 className={"text-gray-600 text-xl font-bold text-center"}>{book.title}</h1>
                            <p className={"text-sm text-center font-medium text-slate-500"}>{book.authors.length > 1 ? `${book.authors[0].author.name} و ${book.authors.length - 1} آخرين` : book.authors[0].author.name}</p>
                            <span className={"font-bold text-sm text-center text-indigo-500"}>{ book.isFree ? "مجاني" : book.price + " أوقية" }</span>
                            <hr/>
                            {/*<div className={"flex justify-between gap-2"}>*/}
                            {/*    <span*/}
                            {/*        className={"p-2 flex justify-center items-center rounded-full w-10 h-10 cursor-pointer bg-yellow-50 border border-yellow-200"}>*/}
                            {/*        <TbFileDownload className={"text-2xl text-yellow-700 hover:text-yellow-600"}/>*/}
                            {/*    </span>*/}
                            {/*        <span*/}
                            {/*            className={"p-2 flex justify-center items-center rounded-full w-10 h-10 cursor-pointer bg-red-50 border border-red-200"}>*/}
                            {/*        <AiOutlineLike className={"text-2xl text-red-700 hover:text-red-600"}/>*/}
                            {/*    </span>*/}
                            {/*        <span*/}
                            {/*            className={"p-2 flex justify-center items-center rounded-full w-10 h-10 cursor-pointer bg-green-50 border border-green-200"}>*/}
                            {/*        <MdChromeReaderMode className={"text-2xl text-green-700 hover:text-green-600"}/>*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                            <LinkBtn link={`/books/${book.id}`} title={"عرض الكتاب"} isFull={true} />
                        </div>
                    )
                }
            </div>
        </Section>
    )
}