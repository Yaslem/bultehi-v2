import Counties from "./index";
import {generateIdFromParams} from "../../../../../helpers/Global";
import {getCountiesByResultId} from "../../../../../controllers/public/Result";

export default async function Page({params}) {
    const resultId = generateIdFromParams(params.resultId)
    const { data, status } = await getCountiesByResultId({resultId, url: "/middle/results"})
    return (
        <Counties status={status} data={data.counties} />
    )
}