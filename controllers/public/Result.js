"use server"
import prisma from "../../helpers/db";
import sendMessage from "../../helpers/SendMessage";
import {
    getCountDegreeByExceptions,
    getDegreeByExceptions,
    PAGINATE_LIMIT,
    PASSING_DEGREE_IN_ELEMENTARY,
    SELECT_DATA_FOR_STUDENT
} from "../../helpers/Global";
import {redirect} from "next/navigation";
import Validate from "../../helpers/Validate";
export async function getPublicResults(slug) {
    const results = await prisma.result.findMany({
        where: {
            type: {
                slug: parseInt(slug),
            },
            isPublished: true,
            NOT: {
                year: {
                    students: {
                        none: {}
                    },
                }
            },
        },
        select: {
            id: true,
            title: true,
            year: true
        },
        orderBy: {
            year: {
                name: 'desc',
            }
        },
        take: 3,
    })

    if(results.length > 0){
        return sendMessage(true, 200, "تم جلب النتائج بنجاح", results)
    }
    return sendMessage(false, 400, "لا توجد نتائج.")
}
export async function getTopStudentsByResultId(id, url) {
    const result = await getResultById({resultId: id, url})

    let types = await prisma.bacType.findMany({
        where: {
            NOT: {
                students: {
                    none: {}
                },
            },
        },
        select: {
            id: true,
            nameAr: true,
            nameFr: true,
            students: {
                select: SELECT_DATA_FOR_STUDENT,
                orderBy: {
                    degree: 'desc',
                },
                take: 1,
            }
        },
    })

    types = types.sort((a, b) => {
        return b.students[0].degree - a.students[0].degree;
    })

    const students = await prisma.student.findMany({
        where: {
            resultId: result.id,
        },
        orderBy: {
            degree: 'desc',
        },
        take: 10,
    })

    return sendMessage(true, 200, "تم جلب الطلاب بنجاح", {students, types})
}
export async function getStudentByNumberAndResultId({resultId, number, url}) {
    const result = await getResultById({resultId, url})

    const student = await prisma.student.findFirst({
        where: {
            number: parseInt(number),
            resultId: result.id,
        },
        select: SELECT_DATA_FOR_STUDENT
    })
    if(student){
        return sendMessage(true, 200, "تم جلب نتيجة الطالب بنجاح", student)
    }
    return redirect(url)
}

export async function getResultStudentByNumber({year, type, category, session, number}) {
    switch (parseInt(category)) {
        case 5: {
            const student = await prisma.student.findFirst({
                where: {
                    year: {
                        name: year
                    },
                    type: {
                        nameAr: type
                    },
                    session: {
                        name: session
                    },
                    typeResult: {
                        slug: parseInt(category)
                    },
                    number: Number(number),
                },
                select: SELECT_DATA_FOR_STUDENT,
            })

            if(student){
                return sendMessage(true, 200,"تم جلب البيانات بنجاح.", student)
            }
            return sendMessage(false, 400,"لا توجد بيانات.")
        }
    }

}

export const getBacTypes =  async () => {
    const types = await prisma.bacType.findMany({
        orderBy: {
            nameAr: 'asc',
        },
    })
    if(types.length > 0){
        return sendMessage(true, 200,"تم جلب البيانات بنجاح.", types)
    }
    return sendMessage(false, 400,"لا توجد بيانات.")
}
export async function getResultStudent({resultId, target, value, page = 0, isTitle, searchBy, searchById}) {

    const validated = Validate.searchResult.safeParse({value})
    if(validated.success){
        if(isTitle){
            if(searchBy === "state"){
                const searchByTitle = await getStateById(searchById)
                switch (target) {
                    case "name":
                        const count = await prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                stateId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                        })
                        const students = await prisma.student.findMany({
                            where: {
                                resultId: Number(resultId),
                                stateId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                            orderBy: {
                                degree: 'desc',
                            },
                            take: PAGINATE_LIMIT,
                            skip: (page * PAGINATE_LIMIT),
                        })
                        if(students.length > 0){
                            if(students.length > 1){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                            }else {
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                            }
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    case "number":
                        if(!isNaN(+value)){
                            const student = await prisma.student.findFirst({
                                where: {
                                    resultId: Number(resultId),
                                    number: Number(value),
                                },
                                select: SELECT_DATA_FOR_STUDENT,
                            })
                            if(student && student.state.id === parseInt(searchById)){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                            } else if(student && student.state.id !== parseInt(searchById)){
                                return sendMessage(false, 400, `رقم الطالب "${value}" لا ينتمي لولاية ${searchByTitle.name}، رجاء تأكد مرة أخرى.`)
                            }
                            return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                        }
                        return sendMessage(false, 400, "رقم الطالب غير صالح")
                }
            } else if(searchBy === "county"){
                const searchByTitle = await getCountyById(searchById)
                switch (target) {
                    case "name":
                        const count = await prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                countyId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                        })
                        const students = await prisma.student.findMany({
                            where: {
                                resultId: Number(resultId),
                                countyId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                            orderBy: {
                                degree: 'desc',
                            },
                            take: PAGINATE_LIMIT,
                            skip: (page * PAGINATE_LIMIT),
                        })
                        if(students.length > 0){
                            if(students.length > 1){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                            }else {
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                            }
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    case "number":
                        if(!isNaN(+value)){
                            const student = await prisma.student.findFirst({
                                where: {
                                    resultId: Number(resultId),
                                    number: Number(value),
                                },
                                select: SELECT_DATA_FOR_STUDENT
                            })
                            if(student && student.county.id === parseInt(searchById)){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                            } else if(student && student.county.id !== parseInt(searchById)){
                                return sendMessage(false, 400, `رقم الطالب "${value}" لا ينتمي لمثاطعة ${searchByTitle.name}، رجاء تأكد مرة أخرى.`)
                            }
                            return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                        }
                        return sendMessage(false, 400, "رقم الطالب غير صالح")
                }
            } else if(searchBy === "school"){
                const searchByTitle = await getSchoolById(searchById)
                switch (target) {
                    case "name":
                        const count = await prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                schoolId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                        })
                        const students = await prisma.student.findMany({
                            where: {
                                resultId: Number(resultId),
                                schoolId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                            orderBy: {
                                degree: 'desc',
                            },
                            take: PAGINATE_LIMIT,
                            skip: (page * PAGINATE_LIMIT),
                        })
                        if(students.length > 0){
                            if(students.length > 1){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                            }else {
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                            }
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    case "number":
                        if(!isNaN(+value)){
                            const student = await prisma.student.findFirst({
                                where: {
                                    resultId: Number(resultId),
                                    number: Number(value),
                                },
                                select: SELECT_DATA_FOR_STUDENT
                            })
                            if(student && student.school.id === parseInt(searchById)){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                            } else if(student && student.school.id !== parseInt(searchById)){
                                return sendMessage(false, 400, `رقم الطالب "${value}" لا ينتمي لمدرسة ${searchByTitle.name}، رجاء تأكد مرة أخرى.`)
                            }
                            return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                        }
                        return sendMessage(false, 400, "رقم الطالب غير صالح")
                }
            } else if(searchBy === "center"){
                const searchByTitle = await getCenterById(searchById)
                switch (target) {
                    case "name":
                        const count = await prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                centerId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                        })
                        const students = await prisma.student.findMany({
                            where: {
                                resultId: Number(resultId),
                                centerId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                            orderBy: {
                                degree: 'desc',
                            },
                            take: PAGINATE_LIMIT,
                            skip: (page * PAGINATE_LIMIT),
                        })
                        if(students.length > 0){
                            if(students.length > 1){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                            }else {
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                            }
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    case "number":
                        if(!isNaN(+value)){
                            const student = await prisma.student.findFirst({
                                where: {
                                    resultId: Number(resultId),
                                    number: Number(value),
                                },
                                select: SELECT_DATA_FOR_STUDENT
                            })
                            if(student && student.center.id === parseInt(searchById)){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                            } else if(student && student.center.id !== parseInt(searchById)){
                                return sendMessage(false, 400, `رقم الطالب "${value}" لا ينتمي لمركز ${searchByTitle.name}، رجاء تأكد مرة أخرى.`)
                            }
                            return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                        }
                        return sendMessage(false, 400, "رقم الطالب غير صالح")
                }
            } else if(searchBy === "type"){
                const searchByTitle = await getTypeById(searchById)
                switch (target) {
                    case "name":
                        const count = await prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                typeId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                        })
                        const students = await prisma.student.findMany({
                            where: {
                                resultId: Number(resultId),
                                typeId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                            orderBy: {
                                degree: 'desc',
                            },
                            take: PAGINATE_LIMIT,
                            skip: (page * PAGINATE_LIMIT),
                        })
                        if(students.length > 0){
                            if(students.length > 1){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                            }else {
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                            }
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    case "number":
                        if(!isNaN(+value)){
                            const student = await prisma.student.findFirst({
                                where: {
                                    resultId: Number(resultId),
                                    number: Number(value),
                                },
                                select: SELECT_DATA_FOR_STUDENT
                            })
                            if(student && student.type.id === parseInt(searchById)){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                            } else if(student && student.type.id !== parseInt(searchById)){
                                return sendMessage(false, 400, `رقم الطالب "${value}" لا ينتمي لشعبة ${searchByTitle.nameAr}، رجاء تأكد مرة أخرى.`)
                            }
                            return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                        }
                        return sendMessage(false, 400, "رقم الطالب غير صالح")
                }
            }
        }else {
            switch (target) {
                case "name":
                    const count = await prisma.student.count({
                        where: {
                            resultId: parseInt(resultId),
                            name: {
                                contains: value,
                            }
                        },
                    })
                    const students = await prisma.student.findMany({
                        where: {
                            resultId: Number(resultId),
                            name: {
                                contains: value,
                            }
                        },
                        select: SELECT_DATA_FOR_STUDENT,
                        orderBy: {
                            degree: 'desc',
                        },
                        take: PAGINATE_LIMIT,
                        skip: (page * PAGINATE_LIMIT),
                    })
                    if(students.length > 0){
                        if(students.length > 1){
                            return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                        }else {
                            return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                        }
                    }
                    return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                case "number":
                    if(!isNaN(+value)){
                        const student = await prisma.student.findFirst({
                            where: {
                                resultId: Number(resultId),
                                number: Number(value),
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                        })
                        if(student){
                            return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    }
                    return sendMessage(false, 400, "رقم الطالب غير صالح")
            }
        }
        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
    }
    return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())

}

export async function getResultById({resultId, url}) {
    if(isNaN(+resultId)) return redirect(url)
    const result = await prisma.result.findUnique({
        where: {
            id: parseInt(resultId)
        },
        select: {
            id: true,
            isPublished: true,
            title: true,
            type: true,
            year: true,
            session: true,
        }
    })
    if(!result || !result.isPublished) return redirect(url)
    return result
}
export async function getTopStudentsByResultIdInElementaryAndInMiddle(resultId, url) {
    const result = await getResultById({resultId, url})
    const students = await prisma.student.findMany({
        where: {
            resultId: result.id,
        },
        select: SELECT_DATA_FOR_STUDENT,
        orderBy: {
            rankingInCountry: 'asc',
        },
        take: 10,
    })
    if(students.length > 0){
        return sendMessage(true, 200, "تم جلب الطلاب بنجاح", students)
    }
    return sendMessage(false, 400, "لا يوجد طلاب")
}

export async function getStudentsDegreeByCategoryName({by, name, resultId, degree}) {
    switch (by) {
        case "state": {
            return await prisma.student.count({
                where: {
                    state: {
                        name: name
                    },
                    resultId: parseInt(resultId),
                    degree: {
                        lt: PASSING_DEGREE_IN_ELEMENTARY,
                        gte: degree,
                    }
                },
            })
        }
        case "county": {
            return await prisma.student.count({
                where: {
                    county: {
                        name: name
                    },
                    resultId: parseInt(resultId),
                    degree: {
                        lt: PASSING_DEGREE_IN_ELEMENTARY,
                        gte: degree,
                    }
                },
            })
        }
        case "school": {
            return await prisma.student.count({
                where: {
                    school: {
                        name: name
                    },
                    resultId: parseInt(resultId),
                    degree: {
                        lt: PASSING_DEGREE_IN_ELEMENTARY,
                        gte: degree,
                    }
                },
            })
        }
        case "center": {
            return await prisma.student.count({
                where: {
                    center: {
                        name: name
                    },
                    resultId: parseInt(resultId),
                    degree: {
                        lt: PASSING_DEGREE_IN_ELEMENTARY,
                        gte: degree,
                    }
                },
            })
        }
    }
}
export async function getSchoolById(id) {

    return await prisma.school.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}
export async function getCenterById(id) {

    return await prisma.center.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}
export async function getStateById(id) {

    return await prisma.state.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}

export async function getTypeById(id) {

    return await prisma.bacType.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}
export async function getCountyById(id) {

    return await prisma.county.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}
export async function getTopStudentsBySchoolId({schoolId, resultId, url}) {
    const result = await getResultById({resultId, url})
    const top = await prisma.student.findMany({
        where: {
            schoolId: parseInt(schoolId),
            resultId: result.id,
        },
        select: SELECT_DATA_FOR_STUDENT,
        orderBy: {
            degree: 'desc',
        },
        take: 10
    })
    if(top.length > 0){
        return sendMessage(true, 200, "تم جلب الطلاب الأوائل بنجاح", top)
    }
    return sendMessage(false, 400, "لا يوجد طلاب أوائل")
}
export async function getStudentsByCenterId({centerId, resultId, url}) {
    const result = await getResultById({resultId, url})
    const top = await prisma.student.findMany({
        where: {
            centerId: parseInt(centerId),
            resultId: result.id,
        },
        select: SELECT_DATA_FOR_STUDENT,
        orderBy: {
            degree: 'desc',
        },
        take: 10
    })
    if(top.length > 0){
        return sendMessage(true, 200, "تم جلب الطلاب الأوائل بنجاح", top)
    }
    return sendMessage(false, 400, "لا يوجد طلاب أوائل")
}
export async function getTopStudentsByCountyId({countyId, resultId, url}) {
    const result = await getResultById({resultId, url})

    const top = await prisma.student.findMany({
        where: {
            countyId: parseInt(countyId),
            resultId: result.id,
        },
        select: SELECT_DATA_FOR_STUDENT,
        orderBy: {
            degree: 'desc',
        },
        take: 10
    })

    return sendMessage(true, 200, "تم جلب الطلاب الأوائل بنجاح", top)
}
export async function getTopStudentsByStateId({stateId, resultId, url}) {
    const result = await getResultById({resultId, url})
    const top = await prisma.student.findMany({
        where: {
            stateId: parseInt(stateId),
            resultId: parseInt(result.id),
        },
        select: SELECT_DATA_FOR_STUDENT,
        orderBy: {
            degree: 'desc',
        },
        take: 10
    })
    if(top.length > 0){
        return sendMessage(true, 200, "تم جلب الطلاب الأوائل بنجاح", top)
    }
    return sendMessage(false, 400, "لا يوجد طلاب أوائل")
}
export async function getTopStudentsByTypeId({typeId, resultId, url}) {
    const result = await getResultById({resultId, url})
    const top = await prisma.student.findMany({
        where: {
            typeId: parseInt(typeId),
            resultId: parseInt(result.id),
        },
        select: SELECT_DATA_FOR_STUDENT,
        orderBy: {
            degree: 'desc',
        },
        take: 10
    })
    if(top.length > 0){
        return sendMessage(true, 200, "تم جلب الطلاب الأوائل بنجاح", top)
    }
    return sendMessage(false, 400, "لا يوجد طلاب أوائل")
}
export async function getCountStudents({nameData, valueId, valueTitle, resultId = null, byCategory = null}) {
    const {data: exceptions, status: statusExceptions} = await getPublicExceptions()
    const slug = await getPublicTypeSlugByResultId(resultId)
    switch (slug) {
        case 1: {
            if(nameData === "states"){
                const admisException = await getDegreeByExceptions({exceptions: {data: exceptions, status: statusExceptions}, ref: valueTitle, resultId})
                const [admis, ajourne] = await prisma.$transaction([
                    prisma.student.count({
                        where: {
                            degree: {
                                gte: PASSING_DEGREE_IN_ELEMENTARY,
                            },
                            resultId: parseInt(resultId),
                            stateId: parseInt(valueId),
                        }

                    }),
                    prisma.student.count({
                        where: {
                            resultId: parseInt(resultId),
                            stateId: parseInt(valueId),
                            degree: {
                                lt: PASSING_DEGREE_IN_ELEMENTARY,
                            },
                        }

                    }),
                ])
                return {admis: (admis + admisException), ajourne: (ajourne - admisException)}
            } else if(nameData === "counties"){
                const admisException = await getDegreeByExceptions({exceptions: {data: exceptions, status: statusExceptions}, ref: valueTitle, resultId})
                const [admis, ajourne] = await prisma.$transaction([
                    prisma.student.count({
                        where: {
                            degree: {
                                gte: PASSING_DEGREE_IN_ELEMENTARY,
                            },
                            resultId: parseInt(resultId),
                            countyId: parseInt(valueId),
                        }

                    }),
                    prisma.student.count({
                        where: {
                            resultId: parseInt(resultId),
                            countyId: parseInt(valueId),
                            degree: {
                                lt: PASSING_DEGREE_IN_ELEMENTARY,
                            },
                        }

                    }),
                ])
                return {admis: (admis + admisException), ajourne: (ajourne - admisException)}
            } else if(nameData === "schools"){
                const admisException = await getDegreeByExceptions({exceptions: {data: exceptions, status: statusExceptions}, ref: valueTitle, resultId})
                const [admis, ajourne] = await prisma.$transaction([
                    prisma.student.count({
                        where: {
                            degree: {
                                gte: PASSING_DEGREE_IN_ELEMENTARY,
                            },
                            resultId: parseInt(resultId),
                            schoolId: parseInt(valueId),
                        }

                    }),
                    prisma.student.count({
                        where: {
                            resultId: parseInt(resultId),
                            schoolId: parseInt(valueId),
                            degree: {
                                lt: PASSING_DEGREE_IN_ELEMENTARY,
                            },
                        }

                    }),
                ])
                return {admis: (admis + admisException), ajourne: (ajourne - admisException)}
            } else if(nameData === "centers"){
                const admisException = await getDegreeByExceptions({exceptions: {data: exceptions, status: statusExceptions}, ref: valueTitle, resultId})
                const [admis, ajourne] = await prisma.$transaction([
                    prisma.student.count({
                        where: {
                            degree: {
                                gte: PASSING_DEGREE_IN_ELEMENTARY,
                            },
                            resultId: parseInt(resultId),
                            centerId: parseInt(valueId),
                        }

                    }),
                    prisma.student.count({
                        where: {
                            resultId: parseInt(resultId),
                            centerId: parseInt(valueId),
                            degree: {
                                lt: PASSING_DEGREE_IN_ELEMENTARY,
                            },
                        }

                    }),
                ])
                return {admis: (admis + admisException), ajourne: (ajourne - admisException)}
            }
        }
        case 2:
        case 5: {
            if(nameData === "states"){
                const [admis, ajourne] = await prisma.$transaction([
                    prisma.student.count({
                        where: {
                            decision: 'Admis',
                            stateId: parseInt(valueId),
                            resultId: parseInt(resultId),
                        }

                    }),
                    prisma.student.count({
                        where: {
                            stateId: parseInt(valueId),
                            resultId: parseInt(resultId),
                            decision: 'Ajourné',
                        }

                    }),
                ])
                return {admis, ajourne}
            } else if(nameData === "counties"){
                const [admis, ajourne] = await prisma.$transaction([
                    prisma.student.count({
                        where: {
                            decision: 'Admis',
                            countyId: parseInt(valueId),
                            resultId: parseInt(resultId),
                        }

                    }),
                    prisma.student.count({
                        where: {
                            countyId: parseInt(valueId),
                            resultId: parseInt(resultId),
                            decision: 'Ajourné',
                        }

                    }),
                ])
                return {admis, ajourne}
            } else if(nameData === "schools"){
                const [admis, ajourne] = await prisma.$transaction([
                    prisma.student.count({
                        where: {
                            decision: 'Admis',
                            schoolId: parseInt(valueId),
                            resultId: parseInt(resultId),
                        }

                    }),
                    prisma.student.count({
                        where: {
                            schoolId: parseInt(valueId),
                            resultId: parseInt(resultId),
                            decision: 'Ajourné',
                        }

                    }),
                ])
                return {admis, ajourne}
            } else if(nameData === "centers"){
                const [admis, ajourne] = await prisma.$transaction([
                    prisma.student.count({
                        where: {
                            decision: 'Admis',
                            centerId: parseInt(valueId),
                            resultId: parseInt(resultId),
                        }

                    }),
                    prisma.student.count({
                        where: {
                            centerId: parseInt(valueId),
                            resultId: parseInt(resultId),
                            decision: 'Ajourné',
                        }

                    }),
                ])
                return {admis, ajourne}
            } else if(nameData === "types"){
                const [admis, ajourne] = await prisma.$transaction([
                    prisma.student.count({
                        where: {
                            decision: 'Admis',
                            typeId: parseInt(valueId),
                            resultId: parseInt(resultId),
                        }

                    }),
                    prisma.student.count({
                        where: {
                            typeId: parseInt(valueId),
                            resultId: parseInt(resultId),
                            decision: 'Ajourné',
                        }

                    }),
                ])
                return {admis, ajourne}
            }
        }
        default: {
            switch (byCategory) {
                case "elementary": {
                    const admisException = await getCountDegreeByExceptions({exceptions: {data: exceptions, status: statusExceptions}, resultId})
                    const [admis, ajourne] = await prisma.$transaction([
                        prisma.student.count({
                            where: {
                                degree: {
                                    gte: PASSING_DEGREE_IN_ELEMENTARY,
                                },
                                resultId: parseInt(resultId),
                            }

                        }),
                        prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                degree: {
                                    lt: PASSING_DEGREE_IN_ELEMENTARY,
                                },
                            }

                        }),
                    ])
                    return {admis: (admis + admisException), ajourne: (ajourne - admisException)}
                }
                case "high": {
                    const [admis, sessionnaire, ajourne] = await prisma.$transaction([
                        prisma.student.count({
                            where: {
                                decision: 'Admis',
                                resultId: parseInt(resultId),
                            }

                        }),
                        prisma.student.count({
                            where: {
                                decision: 'Sessionnaire',
                                resultId: parseInt(resultId),
                            }

                        }),
                        prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                decision: 'Ajourné',
                            }

                        }),
                    ])
                    return {admis, sessionnaire, ajourne}
                }
                case "middle": {
                    const [admis, ajourne] = await prisma.$transaction([
                        prisma.student.count({
                            where: {
                                decision: 'Admis',
                                resultId: parseInt(resultId),
                            }

                        }),
                        prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                decision: 'Ajourné',
                            }

                        }),
                    ])
                    return {admis, ajourne}
                }
            }
        }

    }
}
export async function getStatesByResultId({resultId, url}) {
    const result = await getResultById({resultId, url})

    let states = []

    const newStates = await prisma.state.findMany({
        where: {
            students: {
                some: {
                    resultId: result.id
                }
            },
            NOT: {
                students: {
                    none: {}
                },
            },
        },
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    students: true,
                }
            },
        },
    })

    await Promise.all(newStates.map( async state => {
        states.push({
            ...state,
            counts: await getCountStudents({nameData: "states", valueId: state.id, valueTitle: state.name, resultId})
        })
    }))

    states = states.sort((a, b) => {
        return b._count.students - a._count.students;
    })
    if(states.length > 0){
        return sendMessage(true, 200, "تم جلب الولايات بنجاح", states)
    }
    return sendMessage(false, 400, "لا توجد ولايات")
}
export async function getTypesByResultId({resultId, url}) {
    const result = await getResultById({resultId, url})

    let types = []

    const newTypes = await prisma.bacType.findMany({
        where: {
            students: {
                some: {
                    resultId: result.id
                }
            },
            NOT: {
                students: {
                    none: {}
                },
            },
        },
        select: {
            id: true,
            nameFr: true,
            nameAr: true,
            _count: {
                select: {
                    students: true,
                }
            },
        },
    })

    await Promise.all(newTypes.map( async type => {
        types.push({
            ...type,
            counts: await getCountStudents({nameData: "types", valueId: type.id, valueTitle: type.nameFr, resultId})
        })
    }))

    types = types.sort((a, b) => {
        return b._count.students - a._count.students;
    })
    if(types.length > 0){
        return sendMessage(true, 200, "تم جلب الشعب بنجاح", types)
    }
    return sendMessage(false, 400, "لا توجد شعب")
}
export async function getPublicAllStatesByResultId(resultId, url) {
    const result = await getResultById({resultId, url})
    const states = await prisma.state.findMany({
        where: {
            students: {
                some: {
                    resultId: result.id
                }
            },
            NOT: {
                students: {
                    none: {}
                },
            },
        },
        select: {
            id: true,
            name: true,
        },
    })
    if(states.length > 0){
        return sendMessage(true, 200, "تم جلب الولايات بنجاح", states)
    }
    return sendMessage(false, 400, "لا توجد ولايات")
}
export async function getSchoolsByResultId({resultId, page = 0, url}) {
    const result = await getResultById({resultId, url})

    let schools = []

    const count = await prisma.school.count({
        where: {
            students: {
                some: {
                    resultId: result.id
                }
            }
        },
    })

    const newSchools = await prisma.school.findMany({
        where: {
            students: {
                some: {
                    resultId: result.id
                }
            }
        },
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    students: true,
                }
            },
        },
        take: PAGINATE_LIMIT,
        skip: (page * PAGINATE_LIMIT),
        orderBy: { students: { _count: 'desc'} }
    })



    await Promise.all(newSchools.map( async school => {
        schools.push({
            ...school,
            counts: await getCountStudents({nameData: "schools", valueId: school.id, valueTitle: school.name, resultId})
        })
    }))
    schools = schools.sort((a, b) => {
        return b._count.students - a._count.students;
    })

    return sendMessage(true, 200, "تم جلب المدارس بنجاح", {schools, count: Math.ceil(count / PAGINATE_LIMIT)})
}
export async function getCentersByResultId({resultId, page = 0, url}) {
    const result = await getResultById({resultId, url})

    let centers = []

    const count = await prisma.center.count({
        where: {
            students: {
                some: {
                    resultId: result.id
                }
            }
        },
    })

    const newCenters = await prisma.center.findMany({
        where: {
            students: {
                some: {
                    resultId: result.id
                }
            }
        },
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    students: true,
                }
            },
        },
        take: PAGINATE_LIMIT,
        skip: (page * PAGINATE_LIMIT),
        orderBy: { students: { _count: 'desc'} }
    })



    await Promise.all(newCenters.map( async center => {
        centers.push({
            ...center,
            counts: await getCountStudents({nameData: "centers", valueId: center.id, valueTitle: center.name, resultId})
        })
    }))
    centers = centers.sort((a, b) => {
        return b._count.students - a._count.students;
    })

    return sendMessage(true, 200, "تم جلب المراكز بنجاح", {centers, count: Math.ceil(count / PAGINATE_LIMIT)})
}
export async function getPublicResultStudentBySchoolId({resultId, page = 0, schoolId}) {
    const count = await prisma.student.count({
        where: {
            resultId: parseInt(resultId),
            schoolId: parseInt(schoolId),
        },
    })
    const students = await prisma.student.findMany({
        where: {
            resultId: parseInt(resultId),
            schoolId: parseInt(schoolId),
        },
        select: SELECT_DATA_FOR_STUDENT,
        orderBy: {
            degree: 'desc',
        },
        take: PAGINATE_LIMIT,
        skip: (page * PAGINATE_LIMIT),
    })
    if(students.length > 0){
        return sendMessage(true, 200, "تم جلب الطلاب بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
    }
    return sendMessage(false, 400, "لا يوجد طلاب")
}
export async function getPublicResultStudentByCenterId({resultId, page = 0, centerId}) {
    const count = await prisma.student.count({
        where: {
            resultId: parseInt(resultId),
            centerId: parseInt(centerId),
        },
    })
    const students = await prisma.student.findMany({
        where: {
            resultId: parseInt(resultId),
            centerId: parseInt(centerId),
        },
        select: SELECT_DATA_FOR_STUDENT,
        orderBy: {
            degree: 'desc',
        },
        take: PAGINATE_LIMIT,
        skip: (page * PAGINATE_LIMIT),
    })
    if(students.length > 0){
        return sendMessage(true, 200, "تم جلب الطلاب بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
    }
    return sendMessage(false, 400, "لا يوجد طلاب")
}

export async function getPublicResultStudent({resultId, target, value, page = 0, isTitle, searchBy, searchById}) {

    const validated = Validate.searchResult.safeParse({value})
    if(validated.success){
        if(isTitle){
            if(searchBy === "state"){
                const searchByTitle = await getStateById(searchById)
                switch (target) {
                    case "name":
                        const count = await prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                stateId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                        })
                        const students = await prisma.student.findMany({
                            where: {
                                resultId: Number(resultId),
                                stateId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                            orderBy: {
                                degree: 'desc',
                            },
                            take: PAGINATE_LIMIT,
                            skip: (page * PAGINATE_LIMIT),
                        })
                        if(students.length > 0){
                            if(students.length > 1){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                            }else {
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                            }
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    case "number":
                        if(!isNaN(+value)){
                            const student = await prisma.student.findFirst({
                                where: {
                                    resultId: Number(resultId),
                                    number: Number(value),
                                },
                                select: SELECT_DATA_FOR_STUDENT,
                            })
                            if(student && student.stateId === parseInt(searchById)){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                            } else if(student && student.stateId !== parseInt(searchById)){
                                return sendMessage(false, 400, `رقم الطالب "${value}" لا ينتمي لولاية ${searchByTitle.name}، رجاء تأكد مرة أخرى.`)
                            }
                            return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                        }
                        return sendMessage(false, 400, "رقم الطالب غير صالح")
                }
            } else if(searchBy === "county"){
                const searchByTitle = await getCountyById(searchById)
                switch (target) {
                    case "name":
                        const count = await prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                countyId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                        })
                        const students = await prisma.student.findMany({
                            where: {
                                resultId: Number(resultId),
                                countyId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                            orderBy: {
                                degree: 'desc',
                            },
                            take: PAGINATE_LIMIT,
                            skip: (page * PAGINATE_LIMIT),
                        })
                        if(students.length > 0){
                            if(students.length > 1){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                            }else {
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                            }
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    case "number":
                        if(!isNaN(+value)){
                            const student = await prisma.student.findFirst({
                                where: {
                                    resultId: Number(resultId),
                                    number: Number(value),
                                },
                                select: SELECT_DATA_FOR_STUDENT
                            })
                            console.log(student.countyId)
                            if(student && student.countyId === parseInt(searchById)){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                            } else if(student && student.countyId !== parseInt(searchById)){
                                return sendMessage(false, 400, `رقم الطالب "${value}" لا ينتمي لبلدية ${searchByTitle.name}، رجاء تأكد مرة أخرى.`)
                            }
                            return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                        }
                        return sendMessage(false, 400, "رقم الطالب غير صالح")
                }
            } else if(searchBy === "school"){
                const searchByTitle = await getSchoolById(searchById)
                switch (target) {
                    case "name":
                        const count = await prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                schoolId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                        })
                        const students = await prisma.student.findMany({
                            where: {
                                resultId: Number(resultId),
                                schoolId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                            orderBy: {
                                degree: 'desc',
                            },
                            take: PAGINATE_LIMIT,
                            skip: (page * PAGINATE_LIMIT),
                        })
                        if(students.length > 0){
                            if(students.length > 1){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                            }else {
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                            }
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    case "number":
                        if(!isNaN(+value)){
                            const student = await prisma.student.findFirst({
                                where: {
                                    resultId: Number(resultId),
                                    number: Number(value),
                                },
                                select: SELECT_DATA_FOR_STUDENT
                            })
                            if(student && student.schoolId === parseInt(searchById)){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                            } else if(student && student.schoolId !== parseInt(searchById)){
                                return sendMessage(false, 400, `رقم الطالب "${value}" لا ينتمي لمدرسة ${searchByTitle.name}، رجاء تأكد مرة أخرى.`)
                            }
                            return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                        }
                        return sendMessage(false, 400, "رقم الطالب غير صالح")
                }
            } else if(searchBy === "center"){
                const searchByTitle = await getCenterById(searchById)
                switch (target) {
                    case "name":
                        const count = await prisma.student.count({
                            where: {
                                resultId: parseInt(resultId),
                                centerId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                        })
                        const students = await prisma.student.findMany({
                            where: {
                                resultId: Number(resultId),
                                centerId: parseInt(searchById),
                                name: {
                                    contains: value,
                                }
                            },
                            select: SELECT_DATA_FOR_STUDENT,
                            orderBy: {
                                degree: 'desc',
                            },
                            take: PAGINATE_LIMIT,
                            skip: (page * PAGINATE_LIMIT),
                        })
                        if(students.length > 0){
                            if(students.length > 1){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                            }else {
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                            }
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    case "number":
                        if(!isNaN(+value)){
                            const student = await prisma.student.findFirst({
                                where: {
                                    resultId: Number(resultId),
                                    number: Number(value),
                                },
                                select: SELECT_DATA_FOR_STUDENT
                            })
                            if(student && student.centerId === parseInt(searchById)){
                                return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                            } else if(student && student.centerId !== parseInt(searchById)){
                                return sendMessage(false, 400, `رقم الطالب "${value}" لا ينتمي لمركز ${searchByTitle.name}، رجاء تأكد مرة أخرى.`)
                            }
                            return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                        }
                        return sendMessage(false, 400, "رقم الطالب غير صالح")
                }
            }
        }else {
            switch (target) {
                case "name":
                    const count = await prisma.student.count({
                        where: {
                            resultId: parseInt(resultId),
                            name: {
                                contains: value,
                            }
                        },
                    })
                    const students = await prisma.student.findMany({
                        where: {
                            resultId: Number(resultId),
                            name: {
                                contains: value,
                            }
                        },
                        select: SELECT_DATA_FOR_STUDENT,
                        orderBy: {
                            degree: 'desc',
                        },
                        take: PAGINATE_LIMIT,
                        skip: (page * PAGINATE_LIMIT),
                    })
                    if(students.length > 0){
                        if(students.length > 1){
                            return sendMessage(true, 200, "تم جلب النتيجة بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
                        }else {
                            return sendMessage(true, 200, "تم جلب النتيجة بنجاح", students[0])
                        }
                    }
                    return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                case "number":
                    if(!isNaN(+value)){
                        const student = await prisma.student.findFirst({
                            where: {
                                resultId: Number(resultId),
                                number: Number(value),
                            },
                            select: SELECT_DATA_FOR_STUDENT
                        })
                        if(student){
                            return sendMessage(true, 200, "تم جلب النتيجة بنجاح", student)
                        }
                        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
                    }
                    return sendMessage(false, 400, "رقم الطالب غير صالح")
            }
        }
        return sendMessage(false, 400, `لم نتمكن من العثور على ${value}، رجاء حاول مرة أخرى.`)
    }
    return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())

}
export async function getCountiesByResultId({resultId, page = 0, url}) {
    const result = await getResultById({resultId, url})

    let counties = []

    const count = await prisma.county.count({
        where: {
            students: {
                some: {
                    resultId: result.id
                }
            }
        },
    })

    const newCounties = await prisma.county.findMany({
        where: {
            students: {
                some: {
                    resultId: result.id
                }
            }
        },
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    students: true,
                }
            },
        },
        take: PAGINATE_LIMIT,
        skip: (page * PAGINATE_LIMIT),
        orderBy: { students: { _count: 'desc'} }
    })



    await Promise.all(newCounties.map( async county => {
        counties.push({
            ...county,
            counts: await getCountStudents({nameData: "counties", valueId: county.id, valueTitle: county.name, resultId})
        })
    }))
    counties = counties.sort((a, b) => {
        return b._count.students - a._count.students;
    })

    return sendMessage(true, 200, "تم جلب البلديات بنجاح", {counties, count: Math.ceil(count / PAGINATE_LIMIT)})
}
export async function getPublicAllCountiesByStateIdAndResultId({resultId, stateId, url}) {
    const result = await getResultById({resultId, url})
    const counties = await prisma.county.findMany({
        where: {
            students: {
                some: {
                    resultId: result.id,
                    stateId: parseInt(stateId),
                }
            },
            NOT: {
                students: {
                    none: {}
                },
            },
        },
        select: {
            id: true,
            name: true,
        },
    })
    if(counties.length > 0){
        return sendMessage(true, 200, "تم جلب المقاطعات بنجاح", counties)
    }
    return sendMessage(false, 400, "لا توجد مقاطعات")
}
export async function getPublicAllSchoolsByCountyIdAndResultId({resultId, countyId, url}) {
    const result = await getResultById({resultId, url})
    const schools = await prisma.school.findMany({
        where: {
            students: {
                some: {
                    resultId: result.id,
                    countyId: parseInt(countyId),
                }
            },
            NOT: {
                students: {
                    none: {}
                },
            },
        },
        select: {
            id: true,
            name: true,
        },
    })
    if(schools.length > 0){
        return sendMessage(true, 200, "تم جلب المدارس بنجاح", schools)
    }
    return sendMessage(false, 400, "لا توجد مدارس")
}
export async function getDataForElementaryFilter({resultId, by, stateId, countyId, schoolId, page = 0}) {
    switch (by) {
        case "state": {
            const counties = await prisma.county.findMany({
                where: {
                    students: {
                        some: {
                            resultId: parseInt(resultId),
                            stateId: parseInt(stateId),
                        }
                    },
                    NOT: {
                        students: {
                            none: {}
                        },
                    },
                },
                select: {
                    id: true,
                    name: true,
                }
            })
            if(counties.length > 0){
                return sendMessage(true, 200, "تم جلب المقاطعات بنجاح", counties)
            }
            return sendMessage(false, 400, "لا توجد مقاطعات")
        }
        case "county": {
            const schools = await prisma.school.findMany({
                where: {
                    students: {
                        some: {
                            resultId: parseInt(resultId),
                            countyId: parseInt(countyId),
                            stateId: parseInt(stateId),
                        }
                    },
                    NOT: {
                        students: {
                            none: {}
                        },
                    },
                },
                select: {
                    id: true,
                    name: true,
                }
            })
            if(schools.length > 0){
                return sendMessage(true, 200, "تم جلب المدارس بنجاح", schools)
            }
            return sendMessage(false, 400, "لا توجد مدارس")
        }
        case "school": {
            const count = await prisma.student.count({
                where: {
                    resultId: parseInt(resultId),
                    schoolId: parseInt(schoolId),
                    countyId: parseInt(countyId),
                },
            })
            const students = await prisma.student.findMany({
                where: {
                    resultId: parseInt(resultId),
                    schoolId: parseInt(schoolId),
                },
                select: SELECT_DATA_FOR_STUDENT,
                take: PAGINATE_LIMIT,
                skip: (page * PAGINATE_LIMIT),
                orderBy: {
                    degree: 'desc',
                },
            })
            if(students.length > 0){
                return sendMessage(true, 200, "تم جلب الطلاب بنجاح", {students, count: Math.ceil(count / PAGINATE_LIMIT)})
            }
            return sendMessage(false, 400, "لا توجد طلاب")
        }
    }

}
export async function getPublicTypeSlugByResultId(resultId) {
    const result = await prisma.result.findUnique({
        where: {
            id: parseInt(resultId)
        },
        include: {
            type: true
        }
    })
    return result.type.slug
}
export async function getPublicExceptions(){
    const exceptions = await prisma.exception.findMany({
        where: {
            applied: true
        },
        include: {
            year: true,
            type: true,
            result: true
        },
        orderBy: {
            year: {
                name: 'desc',
            }
        },
    })
    if(exceptions.length > 0){
        return sendMessage(true, 200,"تم جلب الاستناءات بنجاح", exceptions)
    }
    return sendMessage(false, 200,"لا توجد بيانات.")
}
export async function getPublicAllResults({slug, page = 0, byCategory}) {
    let newResults = []
    const results = await prisma.result.findMany({
        where: {
            type: {
                slug: parseInt(slug),
            },
            isPublished: true,
            NOT: {
                year: {
                    students: {
                        none: {}
                    },
                }
            },
        },
        select: {
            id: true,
            title: true,
            year: true,
            type: true,
            session: true,
            _count: {
                select: { students: true },
            },
        },
        orderBy: {
            year: {
                name: 'desc',
            }
        },
        take: PAGINATE_LIMIT,
        skip: (page * PAGINATE_LIMIT),
    })
    await Promise.all(results.map( async result => {
        newResults.push({
            ...result,
            counts: await getCountStudents({byCategory, resultId: result.id})
        })
    }))
    if(results.length > 0){
        return sendMessage(true, 200, "تم جلب النتائج بنجاح", newResults)
    }
    return sendMessage(false, 400, "لا توجد نتائج.")
}