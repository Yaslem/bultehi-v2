"use client"
import {Search, SectionCard, TopResults, TopStudent} from "../../../../../components/Results";

export default function StateId({data, resultId, currentData}) {
    return (
        <>
            <Search searchBy={"state"} currentData={currentData} isTitle={true} resultId={resultId} />
            <TopResults title={`العشرة الأول في ولاية ${currentData.name}`}>
                {
                    data.map((student, index) =>
                        <TopStudent key={index} type={student.type} student={student} index={index} />
                    )
                }
            </TopResults>
        </>
    )
}