import StateId from "./index";
import {getStateById, getTopStudentsByStateId} from "../../../../../../controllers/public/Result";
import {generateIdFromParams} from "../../../../../../helpers/Global";

export default async function Page({ params }) {
    const resultId = generateIdFromParams(params.resultId)
    const stateId = generateIdFromParams(params.stateId)

    const state = await getStateById(stateId)

    const { data, status } = await getTopStudentsByStateId({stateId, resultId, url: "/high/results"})
    return (
        <StateId currentData={state} data={data} resultId={resultId} />
    )
}