"use client"
import {Search, TopResults, TopStudent} from "../../../../../components/Results";

export default function TypeId({data, resultId, currentData}) {
    return (
        <>
            <Search searchBy={"type"} currentData={currentData} isTitle={true} resultId={resultId} />
            <TopResults title={`العشرة الأول في شعبة ${currentData.nameAr}`}>
                {
                    data.map((student, index) =>
                        <TopStudent key={index} type={student.type} student={student} index={index} />
                    )
                }
            </TopResults>
        </>
    )
}