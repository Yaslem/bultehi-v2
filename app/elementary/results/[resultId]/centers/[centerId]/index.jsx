"use client"
import {Search, TopResults, TopStudent} from "../../../../../components/Results";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {paginationActions} from "../../../../../../redux/slices/paginationSlice";

export default function CenterId({data, students, slug, resultId, currentData}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(paginationActions.setMaxPage(students.count))
        dispatch(paginationActions.setData(students.students))
        dispatch(paginationActions.setPageIndex(0))
        if (students.count > 2) {
            dispatch(paginationActions.setIsPagination(true))
        } else {
            dispatch(paginationActions.setIsPagination(false))
        }
    }, [students.count, students.students, dispatch]);
    return (
        <>
            <Search isBySchool={true} slug={slug} currentData={currentData} isTitle={true} resultId={resultId} />
            <TopResults title={`الأوائل في مركز ${currentData.name}`}>
                {
                    data.map((student, index) =>
                        <TopStudent key={index} type={student.type} student={student} index={index} />
                    )
                }
            </TopResults>
        </>
    )
}