import {generateIdFromParams} from "../../../../../../helpers/Global";
import CountyId from "./index";
import {getCountyById, getTopStudentsByCountyId} from "../../../../../../controllers/public/Result";

export default async function Page({ params }) {
    const resultId = generateIdFromParams(params.resultId)
    const countyId = generateIdFromParams(params.countyId)
    const county = await getCountyById(countyId)

    const { data, status } = await getTopStudentsByCountyId({countyId, resultId, url: "/high/results"})
    return (
        <CountyId currentData={county} data={data} resultId={resultId} />
    )
}