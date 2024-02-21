"use client"
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {paginationActions} from "../../redux/slices/paginationSlice";
import {
    getDataForElementaryFilter,
    getPublicResultStudentByCenterId,
    getPublicResultStudentBySchoolId
} from "../../controllers/public/Result";
import {useState} from "react";
import {TbProgress} from "react-icons/tb";
export default function Pagination({values, isBySchool, isByCenter}){
    const dispatch = useDispatch()
    const pageIndex = useSelector(state => state.pagination.pageIndex)
    const [isLoading, setIsLoading] = useState(false)
    const [ref, setRef] = useState()
    const maxPage = useSelector(state => state.pagination.maxPage)
    const isPagination = useSelector(state => state.pagination.isPagination)
    console.log(pageIndex)
    function handelPagination() {
        if(values.slug === 1){
            setIsLoading(true)
            const {resultId, by, schoolId, stateId, countyId} = values
            getDataForElementaryFilter({resultId, by, schoolId, stateId, countyId, page: pageIndex}).then(({status, data}) => {
                dispatch(paginationActions.setData(data.students))
                setIsLoading(false)
            })
        } else {
            const {resultId, target, value, isTitle, searchBy, searchById} = values
            getResultStudent({resultId, target, page: pageIndex, value, isTitle, searchBy, searchById}).then(({status, data} ) => {
                dispatch(paginationActions.setData(data.students))
            })
        }
    }

    return (
        isPagination &&
        <div className={"flex justify-between items-center"}>
            {
                pageIndex === 0
                    ? <div
                        className={"flex opacity-100 cursor-not-allowed items-center gap-2 bg-stone-50 border rounded-lg text-slate-700 hover:text-slate-600 text-sm p-2 font-medium"}>
                        <GrFormNext className={"text-xl"}/>
                        <span>السابق</span>
                    </div>
                    : <div onClick={ async () => {
                        setRef("prev")
                        dispatch(paginationActions.setDecrementPageIndex((pageIndex - 1)))
                        if(isBySchool){
                            setIsLoading(true)
                            const {resultId, schoolId} = values
                            const {data: students} = await getPublicResultStudentBySchoolId({
                                resultId,
                                schoolId,
                                page: pageIndex
                            })
                            dispatch(paginationActions.setData(students.students))
                            setIsLoading(false)
                        } else if(isByCenter){
                            setIsLoading(true)
                            const {resultId, centerId} = values
                            const {data: students} = await getPublicResultStudentByCenterId({
                                resultId,
                                centerId,
                                page: pageIndex
                            })
                            dispatch(paginationActions.setData(students.students))
                            setIsLoading(false)
                        }else {
                            handelPagination()
                        }

                    }} className={"flex cursor-pointer items-center border-indigo-200 gap-2 bg-indigo-50 border rounded-lg text-indigo-700 hover:text-indigo-600 text-sm p-2 font-medium"}>
                        {
                            isLoading && ref === "prev"
                                ? <TbProgress className={"text-2xl text-indigo-600 animate-spin"} />
                                : <>
                                    <GrFormNext className={"text-xl"}/>
                                    <span>السابق</span>
                                </>
                        }
                    </div>
            }
            <span className={"bg-stone-50 p-2 text-slate-500 text-xs font-medium rounded-lg"}>الصفحة الحالية [{(pageIndex + 1)}]</span>
            {
                maxPage === pageIndex
                    ? <div
                        className={"flex opacity-100 cursor-not-allowed items-center gap-2 bg-stone-50 border rounded-lg text-slate-700 hover:text-slate-600 text-sm p-2 font-medium"}>
                        <span>التالي</span>
                        <GrFormPrevious className={"text-xl"}/>
                    </div>
                    : <div onClick={ async () => {
                        setRef("next")
                        dispatch(paginationActions.setIncrementPageIndex((pageIndex + 1)))
                        if(isBySchool){
                            setIsLoading(true)
                            const {resultId, schoolId} = values
                            const {data: students} = await getPublicResultStudentBySchoolId({
                                resultId,
                                schoolId,
                                page: pageIndex
                            })
                            dispatch(paginationActions.setData(students.students))
                            setIsLoading(false)
                        }else if(isByCenter){
                            setIsLoading(true)
                            const {resultId, centerId} = values
                            const {data: students} = await getPublicResultStudentByCenterId({
                                resultId,
                                centerId,
                                page: pageIndex
                            })
                            dispatch(paginationActions.setData(students.students))
                            setIsLoading(false)
                        }else {
                            handelPagination()
                        }
                    }} className={"flex cursor-pointer border-indigo-200 items-center gap-2 bg-indigo-50 border rounded-lg text-indigo-700 hover:text-indigo-600 text-sm p-2 font-medium"}>
                        {
                            isLoading && ref === "next"
                                ? <TbProgress className={"text-2xl text-indigo-600 animate-spin"} />
                                : <>
                                    <span>التالي</span>
                                    <GrFormPrevious className={"text-xl"}/>
                                </>
                        }
                    </div>
            }
        </div>
    )
}