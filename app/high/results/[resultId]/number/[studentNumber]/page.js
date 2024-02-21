import {generateIdFromParams} from "../../../../../../helpers/Global";
import StudentNumber from "./index";
import {getStudentByNumberAndResultId} from "../../../../../../controllers/public/Result";

export default async function Page({params}){
    const resultId = generateIdFromParams(params.resultId)
    const number = generateIdFromParams(params.studentNumber)
    const {data: student} = await getStudentByNumberAndResultId({resultId, number, url: "/high/results"})
    return <StudentNumber student={student} />
}