import SchoolId from "./index";
import {generateIdFromParams} from "../../../../../../helpers/Global";
import {
    getSchoolById,
    getTopStudentsBySchoolId
} from "../../../../../../controllers/public/Result";

export default async function Page({ params }) {
    const resultId = generateIdFromParams(params.resultId)
    const schoolId = generateIdFromParams(params.schoolId)
    const school = await getSchoolById(schoolId)

    const { data, status } = await getTopStudentsBySchoolId({schoolId, resultId, url: "/middle/results"})
    return (
        <SchoolId currentData={school} data={data} resultId={resultId} />
    )
}