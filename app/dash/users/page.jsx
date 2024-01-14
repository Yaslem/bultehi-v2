import Section from "../components/Section";
import Title from "../components/Title";
import ResultTable from "../../components/ResultTable";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Link from "next/link";
import ResultsType from "../components/ResultsType";

export default function page(){
    return (
        <Section>
            <div className={"flex items-center justify-between gap-3"}>
                <Title title={"المستخدمون"} />
                <Link href={"/"} className={"flex items-center border transition-all gap-2 p-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white font-medium"}>
                    <span className={"text-sm"}>إضافة مستخدم</span>
                </Link>
            </div>
            <div className={"grid grid-cols-3 p-2 border border-dashed bg-stone-50 rounded-lg gap-4"}>
                <Input
                    type={"text"}
                    label={"الاسم"}
                    name={"name"}
                    placeholder={"الاسم"}
                    onChange={null}
                />
                <Select name={"state"} label={"الولاية"}  />
                <Select name={"role"} label={"النوع"}  />
            </div>
            <ResultsType />
            <ResultTable isUsers={true} />
        </Section>
    )
}