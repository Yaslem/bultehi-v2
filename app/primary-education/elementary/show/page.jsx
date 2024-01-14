import {FaAward, FaGraduationCap} from "react-icons/fa";
import Link from "next/link";

export default function page(){
    return (
        <section className={"flex flex-col gap-2 w-[350px] bg-stone-50 border-2 border-indigo-400 rounded-lg mx-auto"}>
            <div className={"flex flex-col p-2 gap-2"}>
                <FaGraduationCap className={"text-5xl w-full text-center text-indigo-500"} />
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
            <div className={"flex items-center text-sm font-medium text-gray-500 justify-between p-2"}>
                <div className={"flex flex-col gap-1"}>
                    <label>المدرسة</label>
                    <p className={"text-xs"}>المدرسة</p>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <label>المركز</label>
                    <p className={"text-xs"}>المركز</p>
                </div>
            </div>
            <div className={"flex items-center text-sm font-medium text-gray-500 justify-between p-2"}>
                <div className={"flex flex-col gap-1"}>
                    <label>الولاية</label>
                    <p className={"text-xs"}>الولاية</p>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <label>المقاطعة</label>
                    <p className={"text-xs"}>المقاطعة</p>
                </div>
            </div>
            <div className={"flex items-center text-sm font-medium text-gray-500 justify-between p-2"}>
                <div className={"flex flex-col gap-1"}>
                    <label>الشعبة</label>
                    <p className={"text-xs"}>الشعبة</p>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <label>الدرجة</label>
                    <p className={"text-xs"}>الدرجة</p>
                </div>
            </div>
            <div className={"flex items-center text-sm font-medium text-gray-500 justify-between p-2"}>
                <div className={"flex flex-col gap-1"}>
                    <label>النتيجة</label>
                    <p className={"text-xs"}>النتيجة</p>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <label>السنة</label>
                    <p className={"text-xs"}>السنة</p>
                </div>
            </div>
            <div className={"p-2"}>
                <Link href={"/"}
                      className={"flex text-sm h-10 items-center justify-center p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 font-medium"}
                >عرض النتيجة التفصيلية</Link>
            </div>
        </section>
    )
}