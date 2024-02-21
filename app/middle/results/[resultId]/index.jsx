"use client"
import ResultsTop from "../../../components/ResultsTop";
import {Search, TopResults, TopStudent} from "../../../components/Results";
export default function ResultId({data, resultId, result}) {
    return (
        <>
            <ResultsTop type={result.type} year={result.year.name} session={result?.session?.name || process.env.TITLE_MIDDLE} />
            <Search resultId={resultId} />
            <TopResults title={"العشرة الأول"}>
                {
                    data.map((student, index) =>
                        <TopStudent key={index} type={null} student={student} index={index} />
                    )
                }
            </TopResults>
        </>
    )
}