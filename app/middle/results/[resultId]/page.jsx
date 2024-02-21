import ResultId from "./index";
import {getResultById, getTopStudentsByResultIdInElementaryAndInMiddle} from "../../../../controllers/public/Result";
import {generateIdFromParams} from "../../../../helpers/Global";

export default async function Page({ params }){
    const resultId = generateIdFromParams(params.resultId)
    const result = await getResultById({resultId, url: "/middle/results"})
    console.log(result)
    const { data, status } = await getTopStudentsByResultIdInElementaryAndInMiddle(resultId, "/middle/results")
    return (
        <ResultId result={result} resultId={resultId} data={data} />
    )
}