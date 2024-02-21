import {generateIdFromParams} from "../../../../../../helpers/Global";
import CountyId from "./index";
import {
    getCountyById,
    getPublicAllSchoolsByCountyIdAndResultId,
    getPublicTypeSlugByResultId, getTopStudentsByCountyId
} from "../../../../../../controllers/public/Result";

export default async function Page({ params }) {
    const countyId = generateIdFromParams(params.countyId)
    const resultId = generateIdFromParams(params.resultId)
    const county = await getCountyById(countyId)
    const {data: schools, status: statusSchools} = await getPublicAllSchoolsByCountyIdAndResultId({resultId, countyId: county.id, url: "/elementary/results/counties"})
    const slug = await getPublicTypeSlugByResultId(resultId)
    const { data, status } = await getTopStudentsByCountyId({countyId, resultId, url: "/elementary/results/counties"})
    return (
        <CountyId slug={slug} schools={{data: schools, status: statusSchools}} students={{data, status}} currentData={county} resultId={resultId} />
    )
}