"use client"
import {Search, SectionCard, TopResults, TopStudent} from "../../../../../components/Results";
import {paginationActions} from "../../../../../../redux/slices/paginationSlice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

export default function StateId({students, resultId, currentData, slug, counties}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(paginationActions.setStateId(currentData.id))
    }, [currentData.id, dispatch]);
    return (
        <>
            <Search slug={slug} countiesData={counties} searchBy={"state"} currentData={currentData} isTitle={true} resultId={resultId} />
            {
                students.status === "success" &&
                <TopResults title={`الأوائل في ولاية ${currentData.name}`}>
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