"use client"
import {Search, SectionCard, TopResults, TopStudent} from "../../../../../components/Results";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {paginationActions} from "../../../../../../redux/slices/paginationSlice";

export default function CountyId({students, resultId, currentData, slug, schools}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(paginationActions.setCountyId(currentData.id))
    }, [currentData.id, dispatch]);
    return (
        <>
            <Search schoolsData={schools} slug={slug} searchBy={"county"} currentData={currentData} isTitle={true} resultId={resultId} />
            {
                students.status === "success" &&
                <TopResults title={`الأوائل في مقاطعة ${currentData.name}`}>
                    {
                        students.data.map((student, index) =>
                            <TopStudent key={index} type={student.type} student={student} index={index} />
                        )
                    }
                </TopResults>
            }
        </>
    )
}