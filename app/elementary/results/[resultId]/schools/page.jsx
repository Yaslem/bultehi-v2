import {generateIdFromParams} from "../../../../../helpers/Global";
import Schools from "./index";
import {getSchoolsByResultId} from "../../../../../controllers/public/Result";

export default async function Page({params}) {
    const resultId = generateIdFromParams(params.resultId)
    const { data, status } = await getSchoolsByResultId({resultId, url: "/high/results"})
    return (
        <Schools status={status} data={data.schools} />
    )
}