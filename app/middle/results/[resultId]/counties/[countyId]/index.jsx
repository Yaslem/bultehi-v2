"use client"
import {Search, TopResults, TopStudent} from "../../../../../components/Results";

export default function CountyId({data, resultId, currentData}) {
    return (
        <>
            <Search searchBy={"county"} currentData={currentData} isTitle={true} resultId={resultId} />
            <TopResults title={`العشرة الأول في مقاطعة ${currentData.name}`}>
                {
                    data.map((student, index) =>
                        <TopStudent key={index} type={student.type} student={student} index={index} />
                    )
                }
            </TopResults>
        </>
    )
}