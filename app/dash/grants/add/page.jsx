import Index from "./Index";
import {getCategories} from "../../../../controllers/Category";

export default async function Page() {
    const { data: colleges, status: collegesStatus, message: collegesMessage } = await getCategories("COLLEGE")
    const { data: phases, status: phasesStatus, message: phasesMessage } = await getCategories("PHASE")
    const { data: specializations, status: specializationsStatus, message: specializationsMessage } = await getCategories("SPECIALIZATION")

    return (
        <Index
            collegesProps={{
            data: colleges,
            status: collegesStatus,
            message: collegesMessage
        }} specializationsProps={{
            data: specializations,
            status: specializationsStatus,
            message: specializationsMessage
        }} phasesProps={{
            data: phases,
            status: phasesStatus,
            message: phasesMessage
        }} />
    )
}