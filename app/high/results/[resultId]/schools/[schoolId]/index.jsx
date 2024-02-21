"use client"
import {Search, TopResults, TopStudent} from "../../../../../components/Results";

export default function SchoolId({data, resultId, currentData}) {
    return (
        <>
            <Search searchBy={"school"} currentData={currentData} isTitle={true} resultId={resultId} />
            <TopResults title={`العشرة الأول في مدرسة ${currentData.name}`}>
                {
                    data.map((student, index) =>
                        <TopStudent key={index} type={student.type} student={student} index={index} />
                    )
                }
            </TopResults>
        </>
    )
}