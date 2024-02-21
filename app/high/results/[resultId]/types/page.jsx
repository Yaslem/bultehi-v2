import {generateIdFromParams} from "../../../../../helpers/Global";
import {getTypesByResultId} from "../../../../../controllers/public/Result";
import Types from "./index";

export default async function Page({params}) {
    const resultId = generateIdFromParams(params.resultId)
    const { data, status } = await getTypesByResultId({resultId, url: "/high/results"})
    return (
        <Types data={data} />
    )
}