"use client"
import ResultsTop from "../../../components/ResultsTop";
import {Search, TopResults, TopStudent} from "../../../components/Results";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {exceptionActions} from "../../../../redux/slices/exceptionSlice";
export default function ResultId({data, states, slug, resultId, exceptions, result}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(exceptionActions.setData(exceptions))
    }, [dispatch, exceptions]);
    return (
        <>
            <ResultsTop type={result.type} year={result.year.name} session={result?.session?.name || process.env.TITLE_ELEMENTARY} />
            <Search states={states} slug={slug} resultId={resultId} />
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