import StateId from "./index";
import {generateIdFromParams} from "../../../../../../helpers/Global";
import {
    getPublicAllCountiesByStateIdAndResultId,
    getPublicTypeSlugByResultId,
    getStateById,
    getTopStudentsByStateId
} from "../../../../../../controllers/public/Result";

export default async function Page({ params }) {

    const stateId = generateIdFromParams(params.stateId)
    const resultId = generateIdFromParams(params.resultId)

    const state = await getStateById(stateId)
    const {data: counties, status: statusCounties} = await getPublicAllCountiesByStateIdAndResultId({resultId, stateId: state.id, url: "/elementary/results"})
    const slug = await getPublicTypeSlugByResultId(resultId)

    const { data, status } = await getTopStudentsByStateId({stateId, resultId, url: "/elementary/results/states"})
    return (
        <StateId slug={slug} counties={{data: counties, status: statusCounties}} currentData={state} students={{data, status}} resultId={resultId} />
    )
}