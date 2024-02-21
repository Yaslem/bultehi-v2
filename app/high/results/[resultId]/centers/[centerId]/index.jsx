"use client"
import {Search, TopResults, TopStudent} from "../../../../../components/Results";

export default function CenterId({data, resultId, currentData}) {
    return (
        <>
            <Search searchBy={"center"} currentData={currentData} isTitle={true} resultId={resultId} />
            <TopResults title={`العشرة الأول في مركز ${currentData.name}`}>
                {
                    data.map((student, index) =>
                        <TopStudent key={index} type={student.type} student={student} index={index} />
                    )
                }
            </TopResults>
        </>
    )
}