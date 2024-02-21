import ResultId from "./index";
import {
    getPublicAllStatesByResultId,
    getPublicExceptions,
    getPublicTypeSlugByResultId, getResultById,
    getTopStudentsByResultIdInElementaryAndInMiddle
} from "../../../../controllers/public/Result";
import {generateIdFromParams} from "../../../../helpers/Global";
export default async function Page({ params }){
    const resultId = generateIdFromParams(params.resultId)
    const {data: states} = await getPublicAllStatesByResultId(resultId, "/elementary/results")
    const result = await getResultById({resultId, url: "/elementary/results"})
    const { data, status } = await getTopStudentsByResultIdInElementaryAndInMiddle(resultId, "/elementary/results")

    const {data: exceptions, status: statusExceptions} = await getPublicExceptions()
    const slug = await getPublicTypeSlugByResultId(resultId)

    return (
        <ResultId result={result} states={states} slug={slug} exceptions={{
            data: exceptions,
            status: statusExceptions
        }} resultId={resultId} data={data} />
    )
}