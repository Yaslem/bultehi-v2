
import {generateIdFromParams} from "../../../../../../helpers/Global";
import {
    getCenterById,
    getPublicResultStudentByCenterId,
    getPublicTypeSlugByResultId, getStudentsByCenterId,
} from "../../../../../../controllers/public/Result";
import CenterId from "./index";

export default async function Page({ params }) {
    const resultId = generateIdFromParams(params.resultId)
    const center = await getCenterById(generateIdFromParams(params.centerId))
    const {data: students, message} = await getPublicResultStudentByCenterId({
        resultId,
        centerId: center.id
    })
    const slug = await getPublicTypeSlugByResultId(resultId)
    const { data, status } = await getStudentsByCenterId({centerId: generateIdFromParams(params.centerId), resultId, url: "/elementary/results/centers"})
    return (
        <CenterId students={students} slug={slug} currentData={center} data={data} resultId={resultId} />
    )
}