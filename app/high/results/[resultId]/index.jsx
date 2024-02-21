"use client"
import ResultsTop from "../../../components/ResultsTop";
import {Search, TopResults, TopStudent} from "../../../components/Results";
export default function ResultId({data, resultId, result}) {
    return (
        <>
            <ResultsTop type={result.type} session={result.session.name} year={result.year.name} />
            <Search resultId={resultId} />
            <TopResults title={"الأوائل من كل شعبة"}>
                {
                    data.types.map((type, index) =>
                        <TopStudent key={index} type={type} student={type.students[0]} index={index} />
                    )
                }
            </TopResults>
        </>
    )
}