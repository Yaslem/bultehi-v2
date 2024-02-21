import {generateIdFromParams} from "../../../../../../helpers/Global";
import {getCenterById, getStudentsByCenterId} from "../../../../../../controllers/public/Result";
import CenterId from "./index";

export default async function Page({ params }) {
    const resultId = generateIdFromParams(params.resultId)
    const centerId = generateIdFromParams(params.centerId)
    const center = await getCenterById(centerId)

    const { data, status } = await getStudentsByCenterId({centerId, resultId, url: "/high/results"})
    return (
        <CenterId currentData={center} data={data} resultId={resultId} />
    )
}