"use server"
import prisma from "../helpers/db";
import upload, {deleteFile, isFileExist} from "../helpers/Upload";
import sendMessage from "../helpers/SendMessage";
import {revalidatePath} from "next/cache";
import Validate from "../helpers/Validate";
import excelToJson from 'convert-excel-to-json'
import GetUnique from "./helpres/getUnique";
import {csvToJSON} from "../helpers/Global";
const fs = require('fs')

export async function getResults(){
    const results = await prisma.result.findMany({
        select: {
            id: true,
            title: true,
            isPublished: true,
            isUploaded: true,
            file: true,
            yearId: true,
            typeId: true,
            sessionId: true,
            updatedAt: true,
            _count: {
                select: { students: true },
            },
            year: true,
            type: true,
            session: true
        },
        orderBy: {
            year: {
                name: 'desc',
            }
        },
    })
    if(results.length > 0){
        return sendMessage(true, 200,"تم جلب النتائج بنجاح", results)
    }
    return sendMessage(false, 200,"لا توجد بيانات.")
}
export async function getExceptions(){
    const exceptions = await prisma.exception.findMany({
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
export async function uploadResults(id){
    const result = await prisma.result.findUnique({
        where: { id: parseInt(id) },
        include: {
            type: true
        },
    })
    if(result){
        const data = excelToJson({
            sourceFile: `public/uploads/results/${result.file}`,
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        });
        const results = new GetUnique({
            results: data.results,
            states: data.states,
            counties: data.counties,
            schools: data.schools,
            centers: data.centers,
            types: data.types,
            yearId: result.yearId,
            typeId: result.typeId,
            sessionId: result.sessionId,
            slug: result.type.slug,
            resultId: result.id
        })
        await results.processor()

        if(results.allIsReady){
            await prisma.result.update({
                where: { id: parseInt(id) },
                data: {
                    isUploaded: true,
                    updatedAt: new Date()
                }
            })
            revalidatePath("/dash/results")
            return sendMessage(true, 200,"تم رفع النتائج بنجاح")
        } else {
            return sendMessage(false, 400,"حدث خطأ ما أثناء رفع النتائج.")
        }
    }
    return sendMessage(false, 400,"ملف النتائج غير موجود")
}

export async function getResultByTitle(title, yearId){
    return await prisma.result.findFirst({ where: { title, yearId } })
}

export async function getExceptionByName(name, yearId){
    return await prisma.exception.findFirst({ where: { name, yearId } })
}
export async function getExceptionById(id){
    return await prisma.exception.findFirst({ where: { id: parseInt(id) } })
}
export async function deleteResult(id, file){

    if(await isFileExist('results', file)){
        await deleteFile('results', file)
    }
    console.log("id is:", id)
    await prisma.result.delete({
        where: {
            id: parseInt(id)
        }
    })
    revalidatePath("/dash/results")
    return sendMessage(true, 200,"تم حذف النتائج بنجاح")
}
export async function deleteException(id){

    await prisma.exception.delete({
        where: {
            id: parseInt(id)
        }
    })
    revalidatePath("/dash/results/exceptions")
    return sendMessage(true, 200,"تم حذف الاستنثاء بنجاح")
}

export async function getResultById(id){
    const result = await prisma.result.findUnique({
        where: { id: parseInt(id) },
        include: {
            year: true,
            type: true,
            session: true
        }
    })
    return sendMessage(true, 200,"تم جلب النتيجة بنجاح", result)
}

export async function createStates(states){
    try {
        await Promise.all(states.map(async (state, index) => {
            if(index > 0){
                const stateExisting = await prisma.state.findFirst({ where: {name: state?.state}})
                if(!stateExisting){
                    await prisma.state.create({
                        data: {
                            name: state?.state?.replaceAll("ـ", ""),
                        },
                    })
                }
            }
        }))
        return true
    } catch (e) {
        console.log("error at states, and it is:", e)
        return false
    }
}


export async function createTypes(types){
    try {
        await Promise.all(types.map(async (type, index) => {
            const existingType = await prisma.bacType.findFirst({
                where: {
                    nameFr: type.nameFr,
                }})
            if(!existingType) {
                await prisma.bacType.create({
                    data: {
                        nameFr: type.nameFr,
                        nameAr: type.nameAr,
                    },
                })
            } else {
                await prisma.bacType.update({
                    where: {
                        id: existingType.id
                    },
                    data: {
                        nameFr: type.nameFr,
                        nameAr: type.nameAr,
                    },
                })
            }

        }))
        return true
    } catch (e) {
        console.log("error at types, and it is:", e)
        return false
    }
}

export async function createSchools(schools){
    try {
        await Promise.all(schools.map(async (school, index) => {
            if(index > 0){
                const schoolExisting = await prisma.school.findFirst({ where: {name: school?.school}})
                if(!schoolExisting){
                    await prisma.school.create({
                        data: {
                            name: school?.school?.replaceAll("ـ", ""),
                        },
                    })
                }
            }
        }))
        return true
    } catch (e) {
        console.log("error at schools, and it is:", e)
        return false
    }
}

export async function createCenters(centers){
    try {
        await Promise.all(centers.map(async (center, index) => {
            if(index > 0){
                const centerExisting = await prisma.center.findFirst({ where: {name: center?.center}})
                if(!centerExisting){
                    await prisma.center.create({
                        data: {
                            name: center?.center?.replaceAll("ـ", ""),
                        },
                    })
                }
            }
        }))
        return true
    } catch (e) {
        console.log("error at centers, and it is:", e)
        return false
    }
}

export async function createStudents({students}){
    console.log("count students is:", students.length)
    try {
        await prisma.student.createMany({
            data: students,
            // skipDuplicates: true
        })
        return true
    } catch (e) {
        console.log("error at students, and it is:", e)
        return false
    }
}

export async function getCategoriesForStudents({result}) {
    const [state, county, school, center, type] = await prisma.$transaction([
        prisma.state.findFirst({
            where: {
                name: result?.state?.replaceAll("ـ", ""),
            },
        }),
        prisma.county.findFirst({
            where: {
                name: result?.county?.replaceAll("ـ", ""),
            },
        }),
        prisma.school.findFirst({
            where: {
                name: result?.school?.replaceAll("ـ", ""),
            },
        }),
        prisma.center.findFirst({
            where: {
                name: result?.center?.replaceAll("ـ", ""),
            },
        }),
        prisma.bacType.findFirst({
            where: {
                nameFr: result.type,
            },
        }),
    ])
    return {state, county, school, center, type}
}

export async function getUnknown() {
    return await prisma.unknown.findFirst({
        where: {
            nameFr: "unknown"
        },
    })
}
export async function getStateByName(name){
    return await prisma.state.findFirst({
        where: {
            name,
        },
    })
}

export async function getCountyByName(name){
    return await prisma.county.findFirst({
        where: {
            name,
        },
    })
}

export async function getSchoolByName(name){
    return await prisma.school.findFirst({
        where: {
            name,
        },
    })
}

export async function getCenterByName(name){
    return await prisma.center.findFirst({
        where: {
            name,
        },
    })
}

export async function getTypeByName(nameFr){
    return await prisma.bacType.findFirst({
        where: {
            nameFr: nameFr
        }
    })
}

export async function createCounties(counties){
    try {
        await Promise.all(counties.map(async (county, index) => {
            if(index > 0){
                const countyExisting = await prisma.county.findFirst({ where: {name: county?.county}})
                if(!countyExisting){
                    await prisma.county.create({
                        data: {
                            name: county?.county?.replaceAll("ـ", ""),
                        },
                    })
                }
            }
        }))
        return true
    } catch (e) {
        console.log("error at counties, and it is:", e)
        return false
    }
}

export async function createResult(data, formData) {
    const validated = !data.isBac ?  Validate.createResult.safeParse({title: data.title, typeId: parseInt(data.typeId), yearId: parseInt(data.yearId), file: formData.get("fileResult")}) : Validate.createResult.safeParse({title: data.title, typeId: parseInt(data.typeId), yearId: parseInt(data.yearId), sessionId: parseInt(data.sessionId), file: formData.get("fileResult")})
    const existingResult = await getResultByTitle(data.title, parseInt(data.yearId))
    if(existingResult) return sendMessage(false, 400, "النتيجة موجودة بالفعل.")
    if(validated.success){
        if(data.isBac){
            const session = await prisma.session.findUnique({where: { id: parseInt(data.sessionId) }})
            const fileName = await upload("results", formData.get("fileResult"), data.isBac, session.slug)
            await prisma.result.create({
                data: {
                    title: data.title,
                    file: fileName,
                    yearId: parseInt(data.yearId),
                    sessionId: parseInt(data.sessionId),
                    typeId: parseInt(data.typeId),
                }
            })
        } else {
            const fileName = await upload("results", formData.get("fileResult"))
            await prisma.result.create({
                data: {
                    title: data.title,
                    file: fileName,
                    yearId: parseInt(data.yearId),
                    sessionId: null,
                    typeId: parseInt(data.typeId),
                }
            })
        }

        revalidatePath("/dash/results")
        return sendMessage(true, 200, "تم إضافة النتيجة بنجاح")
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}
export async function createException(data) {
    const validated = Validate.createException.safeParse({name: data.name, value: data.value, degree: data.degree, ref: data.ref, typeId: parseInt(data.typeId), yearId: parseInt(data.yearId), resultId: parseInt(data.resultId)})
    const existingException = await getExceptionByName(data.name, parseInt(data.yearId))
    if(existingException) return sendMessage(false, 400, "الاستثناء موجود بالفعل.")
    if(validated.success){
        await prisma.exception.create({
            data: {
                name: data.name,
                value: data.value,
                degree: data.degree,
                ref: data.ref,
                yearId: parseInt(data.yearId),
                resultId: parseInt(data.resultId),
                typeId: parseInt(data.typeId),
            }
        })
        revalidatePath("/dash/results/exceptions")
        return sendMessage(true, 200, "تم إضافة الاستثناء بنجاح")
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}
export async function updateException(id, data) {
    const validated = Validate.updateException.safeParse({name: data.name, value: data.value, degree: data.degree, ref: data.ref, exceptionId: parseInt(id), typeId: parseInt(data.typeId), yearId: parseInt(data.yearId), resultId: parseInt(data.resultId)})
    const existingException = await getExceptionById(id)
    if(existingException && existingException.id !== parseInt(id)) return sendMessage(false, 400, "الاستثناء موجود بالفعل.")
    if(validated.success){
        await prisma.exception.update({
            where: {
              id: parseInt(id)
            },
            data: {
                name: data.name,
                value: data.value,
                degree: data.degree,
                ref: data.ref,
                yearId: parseInt(data.yearId),
                resultId: parseInt(data.resultId),
                typeId: parseInt(data.typeId),
            }
        })
        revalidatePath("/dash/results/exceptions")
        return sendMessage(true, 200, "تم تحديث الاستثناء بنجاح")
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}
export async function updateExceptionApplied(id, value) {
    await prisma.exception.update({
        where: {
          id: parseInt(id)
        },
        data: {
            applied: value,
        }
    })
    revalidatePath("/dash/results/exceptions")
    return sendMessage(true, 200, "تم تحديث حالة الاستثناء بنجاح")

}
export async function updateResultPublished(id, value) {
    await prisma.result.update({
        where: {
            id: parseInt(id)
        },
        data: {
            isPublished: value,
        }
    })
    revalidatePath("/dash/results")
    return sendMessage(true, 200, "تم تحديث حالة نشر النتائج بنجاح")

}
export async function updateResult(id, data, formData) {
    const validated = !data.isBac ? Validate.updateResult.safeParse({title: data.title, typeId: parseInt(data.typeId), yearId: parseInt(data.yearId)}) : Validate.updateResult.safeParse({title: data.title, typeId: parseInt(data.typeId), yearId: parseInt(data.yearId), sessionId: parseInt(data.sessionId)})
    const existingResult = await getResultByTitle(data.title, parseInt(data.yearId))
    if(existingResult && existingResult.id !== parseInt(id)) return sendMessage(false, 400, "النتيجة موجودة بالفعل.")
    if(validated.success){
        if(formData.get("fileResult") !== "undefined"){
            if(await isFileExist('results', data.file)){
                await deleteFile('results', data.file)
            }
            if(data.isBac) {
                const session = await prisma.session.findUnique({where: { id: parseInt(data.sessionId) }})
                const fileName = await upload("results", formData.get("fileResult"), data.isBac, session.slug)
                await prisma.result.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        title: data.title,
                        file: fileName,
                        yearId: parseInt(data.yearId),
                        sessionId: parseInt(data.sessionId),
                    }
                })
            } else {
                const fileName = await upload("results", formData.get("fileResult"))
                await prisma.result.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        title: data.title,
                        file: fileName,
                        yearId: parseInt(data.yearId),
                        sessionId: null,
                    }
                })
            }

            revalidatePath("/dash/results")
            return sendMessage(true, 200, "تم تحديث النتيجة بنجاح")
        } else {
            await prisma.result.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title: data.title,
                    yearId: parseInt(data.yearId),
                    sessionId: !data.isBac ? null : parseInt(data.sessionId),
                }
            })
            revalidatePath("/dash/results")
            return sendMessage(true, 200, "تم تحديث النتيجة بنجاح")
        }

    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}
