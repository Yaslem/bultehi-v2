import States from "./index";
import {generateIdFromParams} from "../../../../../helpers/Global";
import {getStatesByResultId} from "../../../../../controllers/public/Result";

export default async function Page({params}) {
    const resultId = generateIdFromParams(params.resultId)
    const { data, status } = await getStatesByResultId({resultId, url: "/middle/results"})
    return (
        <States data={data} />
    )
}