
import {generateIdFromParams} from "../../../../../../helpers/Global";
import SchoolId from "./index";
import {
    getPublicResultStudentBySchoolId,
    getPublicTypeSlugByResultId,
    getSchoolById,
    getStudentsBySchoolId
} from "../../../../../../controllers/public/Result";

export default async function Page({ params }) {
    const resultId = generateIdFromParams(params.resultId)
    const school = await getSchoolById(generateIdFromParams(params.schoolId))
    const {data: students, message} = await getPublicResultStudentBySchoolId({
        resultId,
        schoolId: school.id
    })
    const slug = await getPublicTypeSlugByResultId(resultId)
    const { data, status } = await getStudentsBySchoolId({schoolId: generateIdFromParams(params.schoolId), resultId, url: "/elementary/results/schools"})
    return (
        <SchoolId students={students} slug={slug} currentData={school} data={data} resultId={resultId} />
    )
}