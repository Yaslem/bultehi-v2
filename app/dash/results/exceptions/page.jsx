import  {getResults, getExceptions} from "../../../../controllers/Result"
import {getTypes, getYears} from "../../../../controllers/ResultSettings";
import Exceptions from "./index";
export default async function Page() {
    const { data, status, message } = await getExceptions()
    const {data: types, status: typesStatus, message: typesMessage} = await getTypes()
    const {data: years, status: yearsStatus, message: yearsMessage} = await getYears()
    const {data: results, status: resultsStatus, message: resultsMessage} = await getResults()
    return (
        <Exceptions exceptionsProps={{
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
        }} resultsProps={{
            data: results,
            status: resultsStatus,
            message: resultsMessage
        }} />
    )
}