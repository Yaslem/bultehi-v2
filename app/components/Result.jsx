"use client"
import {FaAward, FaGraduationCap} from "react-icons/fa";
import Link from "next/link";
import {IoClose, IoCloudDownloadSharp} from "react-icons/io5";
import {AiFillEye, AiOutlineLike} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {resultActions} from "../../redux/slices/resultSlice";
import JSConfetti from 'js-confetti'
import {useEffect, useRef} from "react";
import {TbFileDownload} from "react-icons/tb";
import {MdDataSaverOn} from "react-icons/md";

const jsConfetti = new JSConfetti()

export default function Result(){
    const canvas = useRef()
    const dispatch = useDispatch()
    jsConfetti.addConfetti({
        confettiNumber: 200,
    }).then(() => {

    })
    return (
        <section className={"fixed z-50 w-full h-full flex top-0 left-0"}>
            <div
                style={{
                    boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                }}
                className={"w-[400px] transition-all border-r-2 border-black/5 flex flex-col gap-4 h-screen overflow-y-auto p-4 bg-white ml-auto"}>
                <div className={"flex items-center justify-between gap-2"}>
                    <p className={"text-sm text-gray-500 font-medium"}>نتيجة الطالب</p>
                    <IoClose
                        onClick={() => dispatch(resultActions.setOpen(false))}
                        className={"text-3xl text-red-500 cursor-pointer hover:text-red-400 font-bold"} />
                </div>
                <div className={"flex mx-auto w-[350px] flex-col gap-2 bg-stone-50 border rounded-lg"}>
                    <div className={"flex flex-col p-2 gap-2"}>
                        <FaGraduationCap className={"text-4xl w-full text-center text-indigo-500"} />
                        <span className={"text-xs w-full text-center font-medium text-indigo-500"}>#2386</span>
                        <h1 className={"text-sm w-full font-bold text-indigo-600 text-center"}>محمد المصطفى الهريم سيد محمد النابقه</h1>
                        <h1 className={"text-sm w-full font-bold text-indigo-600 text-center"}>Mohamed El Moustapha El Herim Sidi Mohamed Nabgha</h1>
                        <hr />
                        <div className={"flex items-center justify-between gap-2 text-xs text-gray-500 font-medium"}>
                            <div className={"flex flex-col items-center gap-2"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaAward />
                                    <span>2827</span>
                                </div>
                                <span>وطنيا</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaAward />
                                    <span>2827</span>
                                </div>
                                <span>وطنيا</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaAward />
                                    <span>2827</span>
                                </div>
                                <span>وطنيا</span>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className={"flex items-center text-sm font-medium text-slate-600 justify-between p-2"}>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex items-center gap-2"}>
                                <label>المدرسة</label>
                                <AiFillEye className={"text-1xl cursor-pointer"} />
                            </div>
                            <p className={"text-xs"}>المدرسة</p>
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex items-center gap-2"}>
                                <label>المركز</label>
                                <AiFillEye className={"text-1xl cursor-pointer"} />
                            </div>
                            <p className={"text-xs"}>المركز</p>
                        </div>
                    </div>
                    <hr />
                    <div className={"flex items-center text-sm font-medium text-gray-500 justify-between p-2"}>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex items-center gap-2"}>
                                <label>الولاية</label>
                                <AiFillEye className={"text-1xl cursor-pointer"} />
                            </div>
                            <p className={"text-xs"}>الولاية</p>
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex items-center gap-2"}>
                                <label>المقاطعة</label>
                                <AiFillEye className={"text-1xl cursor-pointer"} />
                            </div>
                            <p className={"text-xs"}>المقاطعة</p>
                        </div>
                    </div>
                    <hr />
                    <div className={"flex items-center text-sm font-medium text-gray-500 justify-between p-2"}>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex items-center gap-2"}>
                                <label>الشعبة</label>
                                <AiFillEye className={"text-1xl cursor-pointer"} />
                            </div>
                            <p className={"text-xs"}>الشعبة</p>
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex items-center gap-2"}>
                                <label>الدرجة</label>
                                <AiFillEye className={"text-1xl cursor-pointer"} />
                            </div>
                            <p className={"text-xs"}>الدرجة</p>
                        </div>
                    </div>
                    <hr />
                    <div className={"flex items-center text-sm font-medium text-gray-500 justify-between p-2"}>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex items-center gap-2"}>
                                <label>النتيجة</label>
                                <AiFillEye className={"text-1xl cursor-pointer"} />
                            </div>
                            <p className={"text-xs"}>النتيجة</p>
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex items-center gap-2"}>
                                <label>السنة</label>
                                <AiFillEye className={"text-1xl cursor-pointer"} />
                            </div>
                            <p className={"text-xs"}>السنة</p>
                        </div>
                    </div>
                    <div className={"p-2"}>
                        <Link href={"/"}
                              className={"flex text-sm h-10 items-center justify-center p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 font-medium"}
                        >عرض النتيجة التفصيلية</Link>
                    </div>
                </div>
                <div className={"flex items-center justify-center gap-3"}>
                    <div className={"flex flex-col items-center gap-2"}>
                        <span className={"p-2 flex justify-center items-center rounded-full w-10 h-10 cursor-pointer bg-yellow-50 border border-yellow-200"}>
                            <AiOutlineLike className={"text-2xl text-yellow-700 hover:text-yellow-600"} />
                        </span>
                        <p className={"text-sm font-medium text-slate-700"}>828</p>
                    </div>
                    <div className={"flex flex-col items-center gap-2"}>
                        <span className={"p-2 flex justify-center items-center rounded-full w-10 h-10 cursor-pointer bg-yellow-50 border border-yellow-200"}>
                            <IoCloudDownloadSharp className={"text-2xl text-yellow-700 hover:text-yellow-600"} />
                        </span>
                        <p className={"text-sm font-medium text-slate-700"}>828</p>
                    </div>
                    <div className={"flex flex-col items-center gap-2"}>
                        <span className={"p-2 flex justify-center items-center rounded-full w-10 h-10 cursor-pointer bg-yellow-50 border border-yellow-200"}>
                            <MdDataSaverOn className={"text-2xl text-yellow-700 hover:text-yellow-600"} />
                        </span>
                        <p className={"text-sm font-medium text-slate-700"}>828</p>
                    </div>
                </div>
            </div>
            <div onClick={() => dispatch(resultActions.setOpen(false))} className={"bg-black/10 flex-grow"} />
        </section>
    )
}