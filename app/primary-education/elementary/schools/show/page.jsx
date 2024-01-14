"use client"
import {FaCheck} from "react-icons/fa6";
import {ImBlocked} from "react-icons/im";
import {MdClass} from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import {FaAward, FaTransgender} from "react-icons/fa";
import ResultTable from "../../../../components/ResultTable";
import {IoCalendar} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {resultActions} from "../../../../../redux/slices/resultSlice";
import Result from "../../../../components/Result";

export default function Page(){
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.result.isOpen)
    const name = "المدرسة"
    return (
        <section className={"p-2 flex flex-col gap-4"}>
            <div style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;"
            }} className={"flex items-center p-4 border rounded-lg gap-4"}>
                <span className={"w-20 h-20 bg-red-400 rounded-full"}/>
                <div className={"flex flex-grow flex-col gap-2"}>
                    <div className={"flex items-center justify-between gap-4"}>
                        <h1 className={"text-lg font-bold text-slate-700"}>اسم المدرسة</h1>
                        <div className={"flex items-center gap-2 text-xs text-slate-600 font-medium"}>
                            <div  className={"flex gap-1 overflow-hidden bg-green-50 rounded-lg"}>
                                <div className={"flex items-center p-2 gap-2"}>
                                    <FaCheck className={"text-lg text-green-600"} />
                                    <p>الناجحون</p>
                                </div>
                                <div className={"p-2 bg-green-100 flex items-center justify-center"}>634</div>
                            </div>
                            <div  className={"flex gap-1 overflow-hidden bg-red-50 rounded-lg"}>
                                <div className={"flex items-center p-2 gap-2"}>
                                    <FaCheck className={"text-lg text-red-600"} />
                                    <p>الراسبون</p>
                                </div>
                                <div className={"p-2 bg-red-100 flex items-center justify-center"}>634</div>
                            </div>
                        </div>
                    </div>
                    <hr className={"border border-dashed"} />
                    <div className={"flex text-sm justify-between gap-4"}>
                        <div className={"flex flex-col items-center gap-2 font-medium"}>
                            <div className={"flex items-center gap-2 text-slate-500"}>
                                <MdClass className={"text-xl"} />
                                <span>الفصل</span>
                            </div>
                            <span className={"font-bold text-lg text-slate-600"}>9 A</span>
                        </div>
                        <hr className={"border self-center h-12 border-dashed"} />
                        <div className={"flex flex-col items-center gap-2 font-medium"}>
                            <div className={"flex items-center gap-2 text-slate-500"}>
                                <SiGoogleanalytics className={"text-xl"} />
                                <span>نسبة النجاح</span>
                            </div>
                            <span className={"font-bold text-lg text-slate-600"}>85%</span>
                        </div>
                        <hr className={"border self-center h-12 border-dashed"} />
                        <div className={"flex flex-col items-center gap-2 font-medium"}>
                            <div className={"flex items-center gap-2 text-slate-500"}>
                                <FaAward className={"text-xl"}/>
                                <span>الترتيب و.ط</span>
                            </div>
                            <span className={"font-bold text-lg text-slate-600"}>23</span>
                        </div>
                        <hr className={"border self-center h-12 border-dashed"} />
                        <div className={"flex flex-col items-center gap-2 font-medium"}>
                            <div className={"flex items-center gap-2 text-slate-500"}>
                                <FaAward className={"text-xl"}/>
                                <span>الترتيب و.لا</span>
                            </div>
                            <span className={"font-bold text-lg text-slate-600"}>5</span>
                        </div>
                        <hr className={"border self-center h-12 border-dashed"} />
                        <div className={"flex flex-col items-center gap-2 font-medium"}>
                            <div className={"flex items-center gap-2 text-slate-500"}>
                                <FaAward className={"text-xl"}/>
                                <span>الترتيب م</span>
                            </div>
                            <span className={"font-bold text-lg text-slate-600"}>1</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"mt-4 flex flex-col gap-4"}>
                <h2 className={"text-slate-500 font-bold text-2xl"}>طلاب المدرسة</h2>
                <div className={"grid grid-cols-3 gap-4"}>
                    <div style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                    }}
                         className={"border overflow-hidden flex flex-col gap-2 rounded-lg"}>
                        <div className={"flex items-center p-2 gap-2"}>
                            <div className={"flex flex-col gap-2 flex-grow"}>
                                <div className={"flex flex-col gap-1"}>
                                    <h2 className={"font-bold text-base text-slate-700"}>يسلم أحمد ناجم</h2>
                                    <h2 className={"font-bold text-base text-slate-700"}>YESLEM AHMED NAJEM</h2>
                                </div>
                                <hr className={"border border-dashed"} />
                                <div className={"flex items-center justify-between"}>
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ط</span>
                                        </div>
                                        <span className={"text-base text-green-600 font-bold"}>1</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ل</span>
                                        </div>
                                        <span className={"text-base text-indigo-600 font-bold"}>12</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب م</span>
                                        </div>
                                        <span className={"text-base text-cyan-600 font-bold"}>11</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"p-2 flex items-center justify-between bg-stone-50"}>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaTransgender className={"text-lg"} />
                                    <span>الجنس</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>ذكر</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <IoCalendar className={"text-lg"} />
                                    <span>الميلاد</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>27 يونيو 2002</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaAward className={"text-lg"}/>
                                    <span>النتيجة</span>
                                </div>
                                <span
                                    onClick={() => dispatch(resultActions.setOpen(true))}
                                    className={"text-white rounded-lg hover:bg-indigo-500 cursor-pointer p-2 bg-indigo-600 font-bold"}>عرض</span>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                    }}
                         className={"border overflow-hidden flex flex-col gap-2 rounded-lg"}>
                        <div className={"flex items-center p-2 gap-2"}>
                            <div className={"flex flex-col gap-2 flex-grow"}>
                                <div className={"flex flex-col gap-1"}>
                                    <h2 className={"font-bold text-base text-slate-700"}>يسلم أحمد ناجم</h2>
                                    <h2 className={"font-bold text-base text-slate-700"}>YESLEM AHMED NAJEM</h2>
                                </div>
                                <hr className={"border border-dashed"} />
                                <div className={"flex items-center justify-between"}>
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ط</span>
                                        </div>
                                        <span className={"text-base text-green-600 font-bold"}>1</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ل</span>
                                        </div>
                                        <span className={"text-base text-indigo-600 font-bold"}>12</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب م</span>
                                        </div>
                                        <span className={"text-base text-cyan-600 font-bold"}>11</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"p-2 flex items-center justify-between bg-stone-50"}>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaTransgender className={"text-lg"} />
                                    <span>الجنس</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>ذكر</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <IoCalendar className={"text-lg"} />
                                    <span>الميلاد</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>27 يونيو 2002</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaAward className={"text-lg"}/>
                                    <span>النتيجة</span>
                                </div>
                                <span className={"text-white rounded-lg hover:bg-indigo-500 cursor-pointer p-2 bg-indigo-600 font-bold"}>عرض</span>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                    }}
                         className={"border overflow-hidden flex flex-col gap-2 rounded-lg"}>
                        <div className={"flex items-center p-2 gap-2"}>
                            <div className={"flex flex-col gap-2 flex-grow"}>
                                <div className={"flex flex-col gap-1"}>
                                    <h2 className={"font-bold text-base text-slate-700"}>يسلم أحمد ناجم</h2>
                                    <h2 className={"font-bold text-base text-slate-700"}>YESLEM AHMED NAJEM</h2>
                                </div>
                                <hr className={"border border-dashed"} />
                                <div className={"flex items-center justify-between"}>
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ط</span>
                                        </div>
                                        <span className={"text-base text-green-600 font-bold"}>1</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ل</span>
                                        </div>
                                        <span className={"text-base text-indigo-600 font-bold"}>12</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب م</span>
                                        </div>
                                        <span className={"text-base text-cyan-600 font-bold"}>11</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"p-2 flex items-center justify-between bg-stone-50"}>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaTransgender className={"text-lg"} />
                                    <span>الجنس</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>ذكر</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <IoCalendar className={"text-lg"} />
                                    <span>الميلاد</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>27 يونيو 2002</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaAward className={"text-lg"}/>
                                    <span>النتيجة</span>
                                </div>
                                <span className={"text-white rounded-lg hover:bg-indigo-500 cursor-pointer p-2 bg-indigo-600 font-bold"}>عرض</span>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                    }}
                         className={"border overflow-hidden flex flex-col gap-2 rounded-lg"}>
                        <div className={"flex items-center p-2 gap-2"}>
                            <div className={"flex flex-col gap-2 flex-grow"}>
                                <div className={"flex flex-col gap-1"}>
                                    <h2 className={"font-bold text-base text-slate-700"}>يسلم أحمد ناجم</h2>
                                    <h2 className={"font-bold text-base text-slate-700"}>YESLEM AHMED NAJEM</h2>
                                </div>
                                <hr className={"border border-dashed"} />
                                <div className={"flex items-center justify-between"}>
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ط</span>
                                        </div>
                                        <span className={"text-base text-green-600 font-bold"}>1</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ل</span>
                                        </div>
                                        <span className={"text-base text-indigo-600 font-bold"}>12</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب م</span>
                                        </div>
                                        <span className={"text-base text-cyan-600 font-bold"}>11</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"p-2 flex items-center justify-between bg-stone-50"}>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaTransgender className={"text-lg"} />
                                    <span>الجنس</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>ذكر</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <IoCalendar className={"text-lg"} />
                                    <span>الميلاد</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>27 يونيو 2002</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaAward className={"text-lg"}/>
                                    <span>النتيجة</span>
                                </div>
                                <span className={"text-white rounded-lg hover:bg-indigo-500 cursor-pointer p-2 bg-indigo-600 font-bold"}>عرض</span>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                    }}
                         className={"border overflow-hidden flex flex-col gap-2 rounded-lg"}>
                        <div className={"flex items-center p-2 gap-2"}>
                            <div className={"flex flex-col gap-2 flex-grow"}>
                                <div className={"flex flex-col gap-1"}>
                                    <h2 className={"font-bold text-base text-slate-700"}>يسلم أحمد ناجم</h2>
                                    <h2 className={"font-bold text-base text-slate-700"}>YESLEM AHMED NAJEM</h2>
                                </div>
                                <hr className={"border border-dashed"} />
                                <div className={"flex items-center justify-between"}>
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ط</span>
                                        </div>
                                        <span className={"text-base text-green-600 font-bold"}>1</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب و.ل</span>
                                        </div>
                                        <span className={"text-base text-indigo-600 font-bold"}>12</span>
                                    </div>
                                    <hr className={"border self-center h-6 border-dashed"} />
                                    <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                                        <div className={"flex items-center gap-1"}>
                                            <FaAward className={"text-lg"}/>
                                            <span>الترتيب م</span>
                                        </div>
                                        <span className={"text-base text-cyan-600 font-bold"}>11</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"p-2 flex items-center justify-between bg-stone-50"}>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaTransgender className={"text-lg"} />
                                    <span>الجنس</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>ذكر</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <IoCalendar className={"text-lg"} />
                                    <span>الميلاد</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>27 يونيو 2002</span>
                            </div>
                            <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                                <div className={"flex items-center gap-1"}>
                                    <FaAward className={"text-lg"}/>
                                    <span>النتيجة</span>
                                </div>
                                <span className={"text-white rounded-lg hover:bg-indigo-500 cursor-pointer p-2 bg-indigo-600 font-bold"}>عرض</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isOpen &&
                <Result />
            }
        </section>
    )
}