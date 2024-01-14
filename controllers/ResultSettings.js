"use server"
import prisma from "../helpers/db";
import sendMessage from "../helpers/SendMessage";
import { ResultSettingsSchema} from "../helpers/Schemas";
import {revalidatePath} from "next/cache";
export async function ResultSettings(name, model, slug) {

    const validated =  ResultSettingsSchema.safeParse({ name })
    if (validated.success) {
        switch (model) {
            case "type":
                const existingType= await getTypeByName(name)

                if (existingType) return sendMessage(false, 404, "النوع موجود بالفعل")

                try {

                    await prisma.reslutType.create({
                        data: {
                            name
                        }
                    })
                    revalidatePath("/dash/settings/results")
                    return sendMessage(true, 200, "تم إنشاء النوع بنجاح.")

                } catch (error) {
                    return sendMessage(false, 400, "حدث خطأ ما.")
                }
                break;
            case "year":
                const existingYear = await getYearByName(name)

                if (existingYear) return sendMessage(false, 404, "السنة موجودة بالفعل")

                try {

                    await prisma.year.create({
                        data: {
                            name
                        }
                    })
                    revalidatePath("/dash/settings/results")
                    return sendMessage(true, 200, "تم إنشاء السنة بنجاح.")

                } catch (error) {
                    return sendMessage(false, 400, "حدث خطأ ما.")
                }
                break;
            case "session":
                const existingSession = await getSessionByName(name)

                if (existingSession) return sendMessage(false, 404, "الدورة موجودة بالفعل")

                try {

                    await prisma.session.create({
                        data: {
                            name,
                            slug
                        }
                    })
                    revalidatePath("/dash/settings/results")
                    return sendMessage(true, 200, "تم إنشاء الدورة بنجاح.")

                } catch (error) {
                    return sendMessage(false, 400, "حدث خطأ ما.")
                }
                break;
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}

export async function updateResultSettings(id, name, model, slug) {

    const validated =  ResultSettingsSchema.safeParse({ name })
    if (validated.success) {
        switch (model) {
            case "type":
                await prisma.reslutType.update({
                    where: {
                      id: parseInt(id)
                    },
                    data: {
                        name
                    }
                })
                revalidatePath("/dash/settings/results")
                return sendMessage(true, 200, "تم تحديث النوع بنجاح.")
            case "year":
                await prisma.year.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        name
                    }
                })
                revalidatePath("/dash/settings/results")
                return sendMessage(true, 200, "تم تحديث السنة بنجاح.")
            case "session":
                await prisma.session.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        name,
                        slug
                    }
                })
                revalidatePath("/dash/settings/results")
                return sendMessage(true, 200, "تم تحديث الدورة بنجاح.")
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}

export const getTypes =  async () => {
    const types = await prisma.reslutType.findMany()
    if(types.length > 0){
        return sendMessage(true, 200,"تم جلب البيانات بنجاح.", types)
    }
    return sendMessage(false, 400,"لا توجد بيانات.")
}

export const getYears =  async () => {
    const years = await prisma.year.findMany()
    if(years.length > 0){
        return sendMessage(true, 200,"تم جلب البيانات بنجاح.", years)
    }
    return sendMessage(false, 400,"لا توجد بيانات.")
}

export const getSessions =  async () => {
    const sessions = await prisma.session.findMany()
    if(sessions.length > 0){
        return sendMessage(true, 200,"تم جلب البيانات بنجاح.", sessions)
    }
    return sendMessage(false, 400,"لا توجد بيانات.")
}

export const getTypeByName =  async (name) => {
    const type = await prisma.reslutType.findFirst({ where: { name } })
    return type
}

export const deleteType =  async (id) => {
     await prisma.reslutType.delete({ where: { id: parseInt(id) } })
    revalidatePath("/dash/settings/results")
    return sendMessage(true, 200,"تم حذف البيانات بنجاح.")
}

export const deleteYear=  async (id) => {
    await prisma.year.delete({ where: { id: parseInt(id) } })
    revalidatePath("/dash/settings/results")
    return sendMessage(true, 200,"تم حذف البيانات بنجاح.")
}

export const deleteSession=  async (id) => {
    await prisma.session.delete({ where: { id: parseInt(id) } })
    revalidatePath("/dash/settings/results")
    return sendMessage(true, 200,"تم حذف البيانات بنجاح.")
}

export const getYearByName =  async (name) => {
    const year = await prisma.year.findFirst({ where: { name } })
    return year
}

export const getSessionByName =  async (name) => {
    const session = await prisma.session.findFirst({ where: { name } })
    return session
}