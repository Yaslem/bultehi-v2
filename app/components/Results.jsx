"use client"
import {usePathname} from "next/navigation";
import {useRef, useState} from "react";
import Link from "next/link";
import {HiOutlineExternalLink} from "react-icons/hi";
import {PiCertificateBold, PiStudentBold} from "react-icons/pi";
import {FaAward, FaChevronDown, FaGraduationCap} from "react-icons/fa";
import {IoStatsChart} from "react-icons/io5";
import {resultActions} from "../../redux/slices/resultSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    generateIdFromSlug,
    generateSlug, getDateForHuman,
    getDecisionStudent,
    getDegreeStudent, getGlobalResultStudent, getGradeStudent, getImageStates,
    getNameStudent, getNumberForHuman, getNumberFormat, getUrlForTypeResults,
} from "../../helpers/Global";
import {BsSearch} from "react-icons/bs";
import Image from "next/image";
import Validate from "../../helpers/Validate";
import Error from "./Error";
import Button from "./Button";
import classNames from "classnames";
import Table, {Td, Tr} from "./Table";
import {paginationActions} from "../../redux/slices/paginationSlice";
import Pagination from "./Pagination";
import {LuUserCheck2, LuUserX2} from "react-icons/lu";
import {LiaBirthdayCakeSolid} from "react-icons/lia";
import Select, {Option} from "./Select";
import {getDataForElementaryFilter, getResultStudent} from "../../controllers/public/Result";
import {MdNumbers} from "react-icons/md";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {Cancel} from "./ActionsIcon";

export default function Results({title, link, isAll, resultsProps}){
    const results = {
        data: resultsProps.data,
        status: resultsProps.status,
        message: resultsProps.message,
    }
    return (
        <div className={"flex flex-col px-4 gap-4"}>
            <Header link={link} isAll={isAll} title={title} />
            <Result results={results} />
        </div>
    )
}

export function Header({title, link, isAll = false}){
    return (
        <div className={"flex justify-between gap-4"}>
            <div className={"flex gap-3"}>
                <div className={"w-1 block rounded-lg bg-gray-500"} />
                <h2 className={"text-lg font-bold text-gray-600"}>{title}</h2>
            </div>
            {
                !isAll &&
                <Link className={"flex gap-2 rounded-lg border border-indigo-200 items-center text-xs font-medium justify-center p-2 bg-indigo-50 text-indigo-700 hover:text-indigo-600"} href={link || "/"}>
                    <span>عرض الكل</span>
                    <HiOutlineExternalLink className={"text-lg"} />
                </Link>
            }
        </div>
    )
}

export function Result({results}){
    const pathName = usePathname()
    return (
        <div>
            <ul className={"flex bg-white hover:bg-zinc-50 cursor-pointer rounded-lg border p-2 flex-col gap-4 pr-4"}>
                {
                    results.data.map((result, index) =>
                        <>
                            <Link href={pathName + "/results/" + generateIdFromSlug({slug: result.title, id: result.id})}>
                                <li key={index} className={"flex gap-4 text-sm font-medium text-indigo-500"}>
                                    <PiCertificateBold className={"text-2xl text-indigo-500"}/>
                                    <span>{result.title} - {result.year.name}</span>
                                </li>
                            </Link>
                            {
                                (results.length - 1) !== index && results.length > 1 &&
                                <hr/>
                            }
                        </>
                    )
                }
            </ul>
        </div>
    )
}

export function TopResults({title, children}) {
    return (
        <div className={"mt-4 flex flex-col gap-4"}>
            <h2 className={"text-slate-600 font-bold text-1xl"}>{title}</h2>
            <div className={"grid grid-cols-3 gap-4"}>
                { children }
            </div>
        </div>
    )
}
export function TopStudent({type, student, index}) {
    const dispatch = useDispatch()
    const exceptions = useSelector(state => state.exception.data)
    return (
        <div key={index} style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
        }}
             className={"border relative bg-white overflow-hidden flex justify-between flex-col gap-2 rounded-lg"}>
            {
                type !== null &&
                <span className={"absolute top-0 text-sm left-0 font-bold p-1 rounded-br-lg text-indigo-700 bg-indigo-50"}>{type.nameFr}</span>
            }
            <div className={"flex items-center p-2 pb-0 gap-2"}>
                <div className={"flex flex-col gap-2 flex-grow"}>
                    <div className={"flex flex-col gap-1"}>
                        {
                            student.name.match(/^[a-z0-9_.,'"!?;:& ]+$/i)
                                ? <h2 dir={"ltr"} className={"font-bold text-left text-base text-slate-700"}>{student.name.length <= 30 ? student.name : student.name.slice(0, 29) + "..."}</h2>
                                : <h2 className={"font-bold text-base text-slate-700"}>{student.name.length <= 30 ? student.name : student.name.slice(0, 29) + "..."}</h2>
                        }
                    </div>
                    <hr className={"border border-dashed"}/>

                </div>
            </div>
            <CardRanking ranking={{
                state: student.rankingInState,
                country: student.rankingInCountry,
                county: student.rankingInCounty,
                school: student.rankingInSchool
            }} />
            <div className={"p-2 flex items-center justify-between bg-stone-50"}>
                <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                    <div className={"flex items-center gap-1"}>
                        <IoStatsChart className={"text-lg"}/>
                        <span>الدرجة</span>
                    </div>
                    <span className={"text-slate-700 font-bold"}>{getDegreeStudent(student.degree)}</span>
                </div>
                <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                    {
                        student.typeResult.slug === 1
                            ? <>
                                <div className={"flex items-center gap-1"}>
                                    <LiaBirthdayCakeSolid className={"text-lg"}/>
                                    <span>العمر</span>
                                </div>
                                <span className={"text-slate-700 font-bold"}>{getDateForHuman(student.birth, true).replace("أعوام", "")}</span>
                            </>
                            : <>
                                <div className={"flex items-center gap-1"}>
                                    <MdNumbers className={"text-lg"}/>
                                    <span>الرقم</span>
                                </div>
                                <Link href={`/${getUrlForTypeResults(student.typeResult.slug)}/results/${generateIdFromSlug({
                                    slug: student.result.title,
                                    id: student.result.id
                                })}/number/${generateIdFromSlug({
                                    slug: student.name,
                                    id: student.number
                                })}`} className={"text-indigo-700 font-bold"}>{student.number}</Link>
                            </>
                    }
                </div>
                <div className={"flex flex-col items-center gap-2 text-xs font-medium text-slate-600"}>
                    <div className={"flex items-center gap-1"}>
                        <FaAward className={"text-lg"}/>
                        <span>النتيجة</span>
                    </div>
                    <span
                        onClick={() => {
                            dispatch(resultActions.setStudent(getGlobalResultStudent({student, exceptions})))
                            dispatch(resultActions.setOpen(true))
                        }}
                        className={"text-white rounded-lg hover:bg-indigo-500 cursor-pointer p-2 bg-indigo-600 font-bold"}>عرض</span>
                </div>
            </div>
        </div>
    )
}

export function CardRanking({ranking, isBorder = false}) {
    return (
        <div className={classNames({
            "flex p-2 bg-white items-center justify-between": true,
            "border-y ": isBorder
        })}>
            <div
                className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                <div className={"flex items-center gap-1"}>
                    <FaAward className={"text-lg"}/>
                    <span>الوطن</span>
                </div>
                <span
                    className={"text-sm text-green-600 font-bold"}>{getNumberForHuman(ranking.country)}</span>
            </div>
            <hr className={"border self-center h-6 border-dashed"}/>
            <div
                className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                <div className={"flex items-center gap-1"}>
                    <FaAward className={"text-lg"}/>
                    <span>الولاية</span>
                </div>
                <span
                    className={"text-sm text-indigo-600 font-bold"}>{getNumberForHuman(ranking.state)}</span>
            </div>
            <hr className={"border self-center h-6 border-dashed"}/>
            <div
                className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                <div className={"flex items-center gap-1"}>
                    <FaAward className={"text-lg"}/>
                    <span>المقاطعة</span>
                </div>
                <span
                    className={"text-sm text-orange-600 font-bold"}>{getNumberForHuman(ranking.county)}</span>
            </div>
            <hr className={"border self-center h-6 border-dashed"}/>
            <div className={"flex flex-col gap-2 items-center text-xs font-medium text-slate-600"}>
                <div className={"flex items-center gap-1"}>
                    <FaAward className={"text-lg"}/>
                    <span>المدرسة</span>
                </div>
                <span
                    className={"text-sm text-cyan-600 font-bold"}>{getNumberForHuman(ranking.school)}</span>
            </div>
        </div>
    )
}

export function Search({resultId, states = [], countiesData = {}, isBySchool = false, isByCenter = false, schoolsData = {}, slug, currentData = {}, isTitle = false, searchBy}) {
    const dispatch = useDispatch()
    const exceptions = useSelector(state => state.exception.data)
    const sectionCard = useRef()
    const stateId = useSelector(state => state.pagination.globals.stateId)
    const countyId = useSelector(state => state.pagination.globals.countyId)
    const schoolId = useSelector(state => state.pagination.globals.schoolId)
    const isPagination = useSelector(state => state.pagination.isPagination)
    const [title, setTitle] = useState("ابحث الآن عن نتيجتك!")
    const students = useSelector(state => state.pagination.data)
    const [message, setMessage] = useState("﴿يَرفَعِ اللَّهُ الَّذينَ آمَنوا مِنكُم وَالَّذينَ أوتُوا العِلمَ دَرَجاتٍ﴾")
    const [value, setValue] = useState("")
    const valueRef = useRef();
    const [target, setTarget] = useState("number")
    const [counties, setCounties] = useState({
        data: countiesData?.data || [],
        status: countiesData?.status || false
    })
    const [schools, setSchools] = useState({
        data: schoolsData?.data || [],
        status: schoolsData?.status || false
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    async function handelSearch(e) {
        e.preventDefault()
        setIsLoading(true)
        const validated = Validate.searchResult.safeParse({value})
        if (validated.success) {
            setError({})
            const {status, data, message} = await getResultStudent({
                resultId,
                target,
                value,
                isTitle,
                searchBy,
                searchById: currentData.id
            })
            if (status === "success") {
                setIsLoading(false)
                if (data?.students?.length > 1) {
                    dispatch(paginationActions.setMaxPage(data.count))
                    dispatch(paginationActions.setData(data.students))
                    if (data.count > 2) {
                        dispatch(paginationActions.setIsPagination(true))
                    } else {
                        dispatch(paginationActions.setIsPagination(false))
                    }
                } else {
                    dispatch(paginationActions.setData([]))
                    sectionCard.current.classList.remove("border-red-200")
                    sectionCard.current.classList.add("border-indigo-300")
                    setTitle("مبارك!")
                    setMessage("﴿يَرفَعِ اللَّهُ الَّذينَ آمَنوا مِنكُم وَالَّذينَ أوتُوا العِلمَ دَرَجاتٍ﴾")
                    dispatch(resultActions.setStudent(getGlobalResultStudent({student: data, exceptions})))

                    setTimeout(() => {
                        dispatch(resultActions.setOpen(true))
                    }, 300)
                }
            }else {
                dispatch(paginationActions.setData([]))
                sectionCard.current.classList.remove("border-indigo-200")
                sectionCard.current.classList.add("border-red-200")
                setTitle("لا توجد نتيجة!")
                setMessage(message)
                setIsLoading(false)
                setError(data)
            }
        }else {
            setIsLoading(false)
            setError(validated.error.format())
        }

    }

    function getValuesForPagination() {
        if(slug === 1){
            return { resultId, slug, by: "school", schoolId, stateId, countyId }
        } else {
            return {resultId, target, value, isTitle, searchBy, searchById: currentData.id
            }
        }
    }

    return (
        <div ref={sectionCard} className={classNames({
            "bg-white overflow-hidden flex flex-col border-2 rounded-lg": true,
            "gap-3": slug !== 1
        })}>
            {
                slug === 1
                    ? <div className={"flex items-center p-2 gap-3"}>
                        {
                            isTitle &&
                            <>
                                <span className={"text-indigo-700 hover:text-indigo-600 text-sm outline-0 font-semibold"}>{currentData.name}</span>
                                <span style={{rotate: "90deg"}}><FaChevronDown className={"text-sm text-slate-500"}/></span>
                            </>
                        }
                        <div className={"grid flex-grow grid-cols-3 p-2 gap-3"}>
                            {
                                states.length > 0 &&
                                <Select
                                    name={"state"}
                                    label={"الولاية"}
                                    labelForOption={"اختر الولاية"}
                                    onChange={async (e) => {
                                        setCounties({
                                            data: [],
                                            status: false
                                        })
                                        dispatch(paginationActions.setData([]))
                                        dispatch(paginationActions.setPageIndex(0))
                                        setSchools({
                                            data: [],
                                            status: false
                                        })
                                        dispatch(paginationActions.setStateId(e.target.value))
                                        dispatch(paginationActions.setIsPagination(false))
                                        const {data, status} = await getDataForElementaryFilter({
                                            resultId,
                                            by: "state",
                                            stateId: e.target.value
                                        })
                                        setCounties({
                                            data,
                                            status
                                        })
                                    }}>
                                    {
                                        states.map((state, index) =>
                                            <Option key={index} value={state.id} title={state.name}/>
                                        )
                                    }
                                </Select>
                            }
                            {
                                counties.status &&
                                <Select
                                    name={"county"}
                                    labelForOption={"اختر المقاطعة"}
                                    label={"المقاطعة"}
                                    onChange={async (e) => {
                                        dispatch(paginationActions.setData([]))
                                        dispatch(paginationActions.setPageIndex(0))
                                        dispatch(paginationActions.setCountyId(e.target.value))
                                        setSchools({
                                            data: [],
                                            status: false
                                        })
                                        dispatch(paginationActions.setIsPagination(false))
                                        const {data, status} = await getDataForElementaryFilter({
                                            resultId,
                                            by: "county",
                                            countyId: e.target.value,
                                            stateId
                                        })
                                        setSchools({
                                            data,
                                            status
                                        })
                                    }}>
                                    {
                                        counties.data.map((county, index) =>
                                            <Option key={index} value={county.id} title={county.name}/>
                                        )
                                    }
                                </Select>
                            }
                            {
                                schools.status &&
                                <Select
                                    name={"school"}
                                    labelForOption={"اختر المدرسة"}
                                    label={"المدرسة"}
                                    onChange={async (e) => {
                                        dispatch(paginationActions.setData([]))
                                        dispatch(paginationActions.setIsPagination(false))
                                        dispatch(paginationActions.setSchoolId(e.target.value))
                                        const {data, status} = await getDataForElementaryFilter({
                                            resultId,
                                            by: "school",
                                            schoolId: e.target.value,
                                            countyId,
                                        })
                                        dispatch(paginationActions.setMaxPage(data.count))
                                        dispatch(paginationActions.setData(data.students))
                                        dispatch(paginationActions.setPageIndex(0))
                                        if (data.count > 2) {
                                            dispatch(paginationActions.setIsPagination(true))
                                        } else {
                                            dispatch(paginationActions.setIsPagination(false))
                                        }
                                    }}>
                                    {
                                        schools.data.map((school, index) =>
                                            <Option key={index} value={school.id} title={school.name}/>
                                        )
                                    }
                                </Select>
                            }
                        </div>
                    </div>
                    : <>
                        <div className={"flex border-b-2 h-14 gap-3"}>
                            {
                                isTitle &&
                                <div className={"p-2 flex gap-3 items-center"}>
                                    <span
                                        className={"text-indigo-700 hover:text-indigo-600 text-sm outline-0 font-semibold"}>{currentData.name || currentData.nameAr}</span>
                                    <span style={{rotate: "90deg"}}>
                                        <FaChevronDown className={"text-sm text-slate-500"}/>
                                    </span>
                                </div>
                            }
                            <div className={"p-2 self-center"}>
                                <BsSearch className={"text-xl text-slate-600"}/>
                            </div>
                            <form onSubmit={handelSearch} className={"flex-grow flex justify-between gap-3"}>
                                <div className={"p-2 self-center flex-grow"}>
                                    <input
                                        ref={valueRef}
                                        onChange={(e) => setValue(e.target.value)}
                                        type={target === "name" ? "text" : "number"}
                                        min={target === "name" ? null : 1}
                                        defaultValue={value}
                                        placeholder={target === "name" ? "اكتب اسم الطالب" : "اكتب رقم الطالب"}
                                        className={"bg-white font-medium text-slate-700 placeholder:text-sm placeholder:font-medium w-full outline-0"}/>
                                </div>
                                <div className={"p-2 flex items-center border-r-2"}>
                                    <ul className={"flex gap-4 items-center list-none"}>
                                        <li className={"text-sm font-medium text-slate-600"}>البحث بـــــــ</li>
                                        <li onClick={() => setTarget("number")} className={classNames({
                                            "text-sm font-semibold cursor-pointer py-1 px-2 border rounded-lg border-dashed": true,
                                            "text-indigo-700 bg-indigo-50 border-indigo-200": target === "number",
                                            "text-slate-600 bg-slate-50 border-slate-200": target !== "number",
                                        })}>الرقم
                                        </li>
                                        <li onClick={() => setTarget("name")} className={classNames({
                                            "text-sm font-semibold cursor-pointer py-1 px-2 border rounded-lg border-dashed": true,
                                            "text-indigo-700 bg-indigo-50 border-indigo-200": target === "name",
                                            "text-slate-600 bg-slate-50 border-slate-200": target !== "name",
                                        })}>الاسم
                                        </li>
                                    </ul>
                                </div>
                                <div className={"p-2 items-center border-r-2 flex gap-3"}>
                                    <Button title={"بحث"} isLoading={isLoading} isOnlyIcon={true}/>
                                    {
                                        (students.length > 0 || value.length > 0) &&
                                        <Cancel onClick={() => {
                                            setValue("")
                                            valueRef.current.value = ""
                                            dispatch(paginationActions.setData([]))
                                        }} />
                                    }
                                </div>
                            </form>
                        </div>
                        {
                            error?.value &&
                            <div className={"px-2"}>
                                <Error status={"error"} message={error?.value._errors.join()}/>
                            </div>
                        }
                    </>
            }
            {
                students.length > 0 &&
                <div className={"p-2 flex flex-col gap-4"}>
                    <Table th={["الرقم", "الاسم", "الولاية", "المقاطعة", "المدرسة", "النتيجة"]}>
                        {
                            students.map((student, index) =>
                                <Tr key={index}>
                                    <Td value={student.number}/>
                                    <Td value={student.name}/>
                                    <Td value={
                                        <Link href={"/"}
                                              className={"text-indigo-700 hover:text-indigo-600"}>{student.state.name}</Link>
                                    }/>
                                    <Td value={
                                        <Link href={"/"}
                                              className={"text-indigo-700 hover:text-indigo-600"}>{student.county.name}</Link>
                                    }/>
                                    <Td value={
                                        <Link href={"/"}
                                              className={"text-indigo-700 hover:text-indigo-600"}>{student.school.name}</Link>
                                    }/>
                                    <Td value={
                                        <span
                                            className={"text-xs p-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg font-medium text-center cursor-pointer"}
                                            onClick={() => {
                                                dispatch(resultActions.setStudent(getGlobalResultStudent({student, exceptions})))
                                                dispatch(resultActions.setOpen(true))
                                            }}>عرض النتيجة</span>
                                    } />
                                </Tr>
                            )
                        }
                    </Table>
                    {
                        isPagination &&
                        <Pagination isByCenter={isByCenter} isBySchool={isBySchool} values={
                            isBySchool
                                ? { resultId, slug, schoolId: currentData.id }
                                : isByCenter
                                    ? { resultId, slug, centerId: currentData.id }
                                    : getValuesForPagination()
                        } />
                    }
                </div>
            }
            {
                students.length === 0 &&
                <div className={classNames({
                    "flex -mt-3 items-center bg-stone-50 pb-4 justify-center flex-col gap-4": true,
                    "border-t mt-2": slug === 1,
                })}>
                    <Image className={"w-60 h-auto"} src={"/uploads/global/notfound.png"} width={100} height={100}
                           alt={"لا يوجد شيء"}/>
                    <div className={"flex items-center justify-center flex-col gap-4"}>
                        <h2 className={"text-2xl font-bold text-slate-700"}>{title}</h2>
                        <p className={"text-sm font-medium text-slate-600"}>{message}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export function SectionCard({data, isState = true, isType}){


    return (
        <div className={"flex flex-col gap-8"}>
            <div className={"grid grid-cols-4 gap-4"}>
                {
                    data.map((item, index) =>
                        <Card isType={isType} key={index} id={item.id} countAll={item._count.students} count={item.counts} isState={isState} index={index} name={item.name || item.nameAr} />
                    )
                }
            </div>
        </div>
    )
}

export function Card(
    {
        index,
        id,
        name,
        isState = false,
        isType = false,
        countAll = 0,
        count = 0,
    }){
    return (
        <div key={index} className={"border flex justify-between gap-2 flex-col bg-white rounded-lg overflow-hidden"}>
            {
                isType
                    ? null
                    : isState
                        ? <Image className={"border-b w-full object-cover h-28"} width={100} height={100} src={getImageStates(name)} />
                        : <Image className={"border-b w-full object-cover h-28"} width={100} height={100} src={"/uploads/global/schools/school.jpg"} />
            }
            <h2 className={"text-xl p-2 my-4 text-gray-700 font-bold text-center"}>{name}</h2>
            <hr />
            <div className={"flex gap-4 items-center p-2 justify-between"}>
                <div className={"flex items-center text-sm text-gray-500 flex-col gap-2"}>
                   <span className={"flex items-center justify-center w-10 h-10 rounded-full border border-indigo-200 bg-indigo-50"}>
                       <PiStudentBold className={"text-lg text-indigo-600"} />
                   </span>
                    {getNumberFormat(countAll)}
                </div>
                <div className={"flex items-center text-sm text-gray-500 flex-col gap-2"}>
                   <span className={"flex items-center justify-center w-10 h-10 rounded-full border border-green-200 bg-green-50"}>
                       <LuUserCheck2 className={"text-lg text-green-600"} />
                   </span>
                    {getNumberFormat(count.admis)}
                </div>
                <div className={"flex items-center text-sm text-gray-500 flex-col gap-2"}>
                   <span className={"flex items-center justify-center w-10 h-10 rounded-full border border-red-200 bg-red-50"}>
                       <LuUserX2 className={"text-lg text-red-600"} />
                   </span>
                    {getNumberFormat(count.ajourne)}
                </div>
            </div>
            <Link
                className={"flex items-center justify-center w-full text-xs p-2 font-medium bg-indigo-700 hover:bg-indigo-600 text-white"}
                href={generateSlug({slug: name, id})}
            >عرض</Link>
        </div>
    )
}

export function ViewResultStudent({student}) {
    const pathName = usePathname()
    const [ids, setIds] = useState([])

    function getDecision(decision) {
        switch (decision) {
            case "ناجح": {
                return <>
                    <span className={"text-xl"}>🎉</span>
                    <span className={"text-2xl text-green-700 font-bold"}>{decision}</span>
                    <span className={"text-xl"}>🎉</span>
                </>
            }
            case "الدورة التكميلية": {
                return <span className={"text-2xl text-yellow-700 font-bold"}>{decision}</span>
            }
            default:
                return <span className={"text-2xl text-slate-700 font-bold"}>{decision}</span>
        }
    }

    return (
        <div className={"flex mx-auto w-[350px] flex-col gap-1 bg-stone-50 border rounded-lg"}>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-col px-2 gap-1"}>
                    <FaGraduationCap className={"text-4xl w-full text-center text-indigo-500"}/>
                    <span
                        className={"text-sm w-full text-center font-semibold text-indigo-500"}>#{student.number} - {student.year.name}</span>
                    <h1 className={"text-xl w-full font-bold text-indigo-600 text-center"}>{student.name}</h1>
                </div>
                <div className={"flex items-center justify-center gap-3"}>
                    { getDecision(student.decision) }
                </div>
                <CardRanking isBorder={true} ranking={{
                    state: student.rankingInState,
                    country: student.rankingInCountry,
                    county: student.rankingInCounty,
                    school: student.rankingInSchool
                }}/>
            </div>
            <div className={"flex items-center text-sm font-medium text-slate-600 justify-between p-2"}>
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex items-center gap-2"}>
                        <label className={"font-semibold text-slate-700"}>المدرسة</label>
                        {
                            ids.includes(`${student.school.id}_${student.school.name}`)
                                ? <AiFillEyeInvisible onClick={() => {
                                    if (ids.includes(`${student.school.id}_${student.school.name}`)) {
                                        setIds(ids.filter(id => id !== `${student.school.id}_${student.school.name}`))
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                                : <AiFillEye onClick={() => {
                                    if (!ids.includes(`${student.school.id}_${student.school.name}`)) {
                                        setIds([...ids, `${student.school.id}_${student.school.name}`])
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                        }
                    </div>
                    <Link href={generateSlug({
                        slug: student.school.name,
                        id: student.school.id
                    })} className={classNames({
                        "text-xs text-indigo-700": true,
                        "blur-sm": ids.includes(`${student.school.id}_${student.school.name}`)
                    })}>{student.school.name}</Link>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex items-center gap-2"}>
                        <label className={"font-semibold text-slate-700"}>المركز</label>
                        {
                            ids.includes(`${student.center.id}_${student.center.name}`)
                                ? <AiFillEyeInvisible onClick={() => {
                                    if (ids.includes(`${student.center.id}_${student.center.name}`)) {
                                        setIds(ids.filter(id => id !== `${student.center.id}_${student.center.name}`))
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                                : <AiFillEye onClick={() => {
                                    if (!ids.includes(`${student.center.id}_${student.center.name}`)) {
                                        setIds([...ids, `${student.center.id}_${student.center.name}`])
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                        }
                    </div>
                    <Link href={"/" + student.center.id} className={classNames({
                        "text-xs text-indigo-700": true,
                        "blur-sm": ids.includes(`${student.center.id}_${student.center.name}`)
                    })}>{student.center.name}</Link>
                </div>
            </div>
            <hr/>
            <div className={"flex items-center text-sm font-medium text-gray-500 justify-between p-2"}>
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex items-center gap-2"}>
                        <label className={"font-semibold text-slate-700"}>الولاية</label>
                        {
                            ids.includes(student.state.name)
                                ? <AiFillEyeInvisible onClick={() => {
                                    if (ids.includes(student.state.name)) {
                                        setIds(ids.filter(id => id !== student.state.name))
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                                : <AiFillEye onClick={() => {
                                    if (!ids.includes(student.state.name)) {
                                        setIds([...ids, student.state.name])
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                        }

                    </div>
                    <Link href={`/${getUrlForTypeResults(student.slug)}/results/${generateSlug({
                        slug: student.result.title,
                        id: student.result.id
                    })}//${generateSlug({slug: student.state.name, id: student.state.id})}`}
                          className={classNames({
                              "text-xs text-indigo-700": true,
                              "blur-sm": ids.includes(student.state.name)
                          })}>{student.state.name}</Link>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex items-center gap-2"}>
                        <label className={"font-semibold text-slate-700"}>المقاطعة</label>
                        {
                            ids.includes(student.county.name)
                                ? <AiFillEyeInvisible onClick={() => {
                                    if (ids.includes(student.county.name)) {
                                        setIds(ids.filter(id => id !== student.county.name))
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                                : <AiFillEye onClick={() => {
                                    if (!ids.includes(student.county.name)) {
                                        setIds([...ids, student.county.name])
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                        }
                    </div>
                    <Link href={"/" + student.county.id} className={classNames({
                        "text-xs text-indigo-700": true,
                        "blur-sm": ids.includes(student.county.name)
                    })}>{student.county.name}</Link>
                </div>
            </div>
            <hr/>
            <div className={"flex items-center text-sm font-medium text-gray-500 justify-between p-2"}>
                <div className={"flex flex-col gap-1"}>
                    {
                        student.grade !== null &&
                        <>
                            <div className={"flex items-center gap-2"}>
                                <label className={"font-semibold text-slate-700"}>المعدل</label>
                                {
                                    ids.includes(student.grade)
                                        ? <AiFillEyeInvisible onClick={() => {
                                            if (ids.includes(student.grade)) {
                                                setIds(ids.filter(id => id !== student.grade))
                                            }
                                        }} className={"text-1xl cursor-pointer"}/>
                                        : <AiFillEye onClick={() => {
                                            if (!ids.includes(student.grade)) {
                                                setIds([...ids, student.grade])
                                            }
                                        }} className={"text-1xl cursor-pointer"}/>
                                }
                            </div>
                            <p className={classNames({
                                "text-xs": true,
                                "blur-sm": ids.includes(student.grade)
                            })}>{student.grade}</p>
                        </>
                    }
                    {
                        student.type !== null
                            ? <>
                                <div className={"flex items-center gap-2"}>
                                    <label className={"font-semibold text-slate-700"}>الشعبة</label>
                                    {
                                        ids.includes(student.type.nameAr)
                                            ? <AiFillEyeInvisible onClick={() => {
                                                if (ids.includes(student.type.nameAr)) {
                                                    setIds(ids.filter(id => id !== student.type.nameAr))
                                                }
                                            }} className={"text-1xl cursor-pointer"}/>
                                            : <AiFillEye onClick={() => {
                                                if (!ids.includes(student.type.nameAr)) {
                                                    setIds([...ids, student.type.nameAr])
                                                }
                                            }} className={"text-1xl cursor-pointer"}/>
                                    }
                                </div>
                                <Link href={"/" + student.type.id} className={classNames({
                                    "text-xs text-indigo-700": true,
                                    "blur-sm": ids.includes(student.type.nameAr)
                                })}>{student.type.nameAr}</Link>
                            </>
                            : <>
                                <div className={"flex items-center gap-2"}>
                                    <label className={"font-semibold text-slate-700"}>المسابقة</label>
                                    {
                                        ids.includes(student.typeResult.name)
                                            ? <AiFillEyeInvisible onClick={() => {
                                                if (ids.includes(student.typeResult.name)) {
                                                    setIds(ids.filter(id => id !== student.typeResult.name))
                                                }
                                            }} className={"text-1xl cursor-pointer"}/>
                                            : <AiFillEye onClick={() => {
                                                if (!ids.includes(student.typeResult.name)) {
                                                    setIds([...ids, student.typeResult.name])
                                                }
                                            }} className={"text-1xl cursor-pointer"}/>
                                    }
                                </div>
                                <Link href={"/" + student.typeResult.id} className={classNames({
                                    "text-xs text-indigo-700": true,
                                    "blur-sm": ids.includes(student.typeResult.name)
                                })}>{student.typeResult.name}</Link>
                            </>
                    }
                </div>
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex items-center gap-2"}>
                        <label className={"font-semibold text-slate-700"}>الدرجة</label>
                        {
                            ids.includes(student.degree)
                                ? <AiFillEyeInvisible onClick={() => {
                                    if (ids.includes(student.degree)) {
                                        setIds(ids.filter(id => id !== student.degree))
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                                : <AiFillEye onClick={() => {
                                    if (!ids.includes(student.degree)) {
                                        setIds([...ids, student.degree])
                                    }
                                }} className={"text-1xl cursor-pointer"}/>
                        }
                    </div>
                    <p className={classNames({
                        "text-xs": true,
                        "blur-sm": ids.includes(student.degree)
                    })}>{student.degree}</p>
                </div>
            </div>
        </div>
    )
}

export function HeaderSection({title, link, isAll = false}) {
    return (
        <div className={"flex justify-between gap-4"}>
            <div className={"flex gap-3"}>
                <div className={"w-1 block rounded-lg bg-gray-500"}/>
                <h2 className={"text-lg font-bold text-gray-600"}>{title}</h2>
            </div>
            {
                !isAll &&
                <Link
                    className={"flex gap-2 rounded-lg items-center text-xs font-medium justify-center p-2 bg-indigo-100 text-indigo-500"}
                    href={link || "/"}>
                    <span>عرض الكل</span>
                    <HiOutlineExternalLink className={"text-lg"}/>
                </Link>
            }
        </div>
    )
}