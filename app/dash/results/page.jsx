import Results from "./index";
import  {getResults} from "../../../controllers/Result"
import {getSessions, getTypes, getYears} from "../../../controllers/ResultSettings";
export default async function Page() {
    const { data, status, message } = await getResults()
    const {data: types, status: typesStatus, message: typesMessage} = await getTypes()
    const {data: years, status: yearsStatus, message: yearsMessage} = await getYears()
    const {data: sessions, status: sessionsStatus, message: sessionsMessage} = await getSessions()
    return (
        <Results resultsProps={{
            data: data,
            status: status,
            message: message
        }} typesProps={{
            data: types,
            status: typesStatus,
            message: typesMessage
        }} yearsProps={{
            data: years,
            status: yearsStatus,
            message: yearsMessage
        }} sessionsProps={{
            data: sessions,
            status: sessionsStatus,
            message: sessionsMessage
        }} />
    )
}