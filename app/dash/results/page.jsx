import Title from "../components/Title";
import Section from "../components/Section";
import ResultTable from "../../components/ResultTable";
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import ResultsSearch from "../../components/ResultsSearch";
import ResultsType from "../components/ResultsType";

export default function page(){
    return (
        <Section>
            <div className={"flex items-center justify-between gap-3"}>
                <Title title={"النتائج"} />
                <Link href={"/"} className={"flex items-center border transition-all gap-2 p-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white font-medium"}>
                    <span className={"text-sm"}>إضافة نتائج</span>
                </Link>
            </div>
            <ResultsType />
            <div>
                <ResultsSearch />
            </div>
            <div>
                <ResultTable />
            </div>
        </Section>
    )
}