import Edit from "./index";
import {getCategories} from "../../../../../controllers/Category";
import {getGrantById} from "../../../../../controllers/Grant";

export default async function Page({ params }) {
    const { data: grant, status} = await getGrantById(parseInt(params.grantId))
    const { data: colleges, status: collegesStatus, message: collegesMessage } = await getCategories("COLLEGE")
    const { data: phases, status: phasesStatus, message: phasesMessage } = await getCategories("PHASE")
    const { data: specializations, status: specializationsStatus, message: specializationsMessage } = await getCategories("SPECIALIZATION")

    return (
        <Edit
            grant={grant}
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