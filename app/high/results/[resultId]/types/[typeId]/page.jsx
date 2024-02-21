import {
    getTopStudentsByTypeId,
    getTypeById
} from "../../../../../../controllers/public/Result";
import {generateIdFromParams} from "../../../../../../helpers/Global";
import TypeId from "./index";

export default async function Page({ params }) {
    const resultId = generateIdFromParams(params.resultId)
    const typeId = generateIdFromParams(params.typeId)

    const state = await getTypeById(typeId)

    const { data, status } = await getTopStudentsByTypeId({typeId, resultId, url: "/high/results"})
    return (
        <TypeId currentData={state} data={data} resultId={resultId} />
    )
}