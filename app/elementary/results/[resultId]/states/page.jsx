import States from "./index";
import {getStatesByResultId} from "../../../../../controllers/public/Result";
import {generateIdFromParams} from "../../../../../helpers/Global";

export default async function Page({params}) {
    const resultId = generateIdFromParams(params.resultId)
    const { data, status } = await getStatesByResultId({resultId, url: "/elementary/results"})
    return (
        <States status={status} data={data} />
    )
}