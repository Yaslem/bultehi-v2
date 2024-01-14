import dynamic from 'next/dynamic'

const HeaderSection = dynamic(() => import("../../components/HeaderSection"), {
    ssr: true,
});
const Pagination = dynamic(() => import("../../../components/Pagination"), {
    ssr: true,
});
const ResultsTop = dynamic(() => import("../../../components/ResultsTop"), {
    ssr: true,
});
const ResultsSearch = dynamic(() => import("../../../components/ResultsSearch"), {
    ssr: true,
});
const ResultTable = dynamic(() => import("../../../components/ResultTable"), {
    ssr: true,
});

export default function Index({isAll}){
    return (
        <div className={"flex flex-col px-4 gap-4"}>
            <HeaderSection isAll={isAll} title={"مسابقة ختم الدروس الأساسية - كنكور"} />
            <hr/>
            <ResultsTop />
            <hr/>
            <ResultsSearch />
            <hr/>
            <ResultTable />
            <Pagination />
        </div>
    )
}