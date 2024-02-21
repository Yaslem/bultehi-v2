import {generateIdFromParams} from "../../../../../helpers/Global";
import {getCentersByResultId} from "../../../../../controllers/public/Result";
import Centers from "./index";

export default async function Page({params}) {
    const resultId = generateIdFromParams(params.resultId)
    const { data, status } = await getCentersByResultId({resultId, url: "/elementary/results"})
    return (
        <Centers status={status} data={data.centers} />
    )
}