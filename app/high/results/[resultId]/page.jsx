import ResultId from "./index";
import {getResultById, getTopStudentsByResultId} from "../../../../controllers/public/Result";
import {generateIdFromParams} from "../../../../helpers/Global";

export default async function Page({ params }){
    const resultId = generateIdFromParams(params.resultId)
    const result = await getResultById({resultId, url: "/high/results"})
    const { data, status } = await getTopStudentsByResultId(resultId, "/high/results")
    return (
        <ResultId result={result} resultId={resultId} data={data} />
    )
}