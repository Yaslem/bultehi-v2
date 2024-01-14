"use server"
import prisma from "../helpers/db";
import sendMessage from "../helpers/SendMessage";
import {TagSchema} from "../helpers/Schemas";
import {revalidatePath} from "next/cache";
import useCurrentUser from "./CurrentUser";
export async function createTag({name, slug, type, description}) {
    const user = await useCurrentUser()
    const validated =  TagSchema.safeParse({ name })
    if (validated.success) {
        const existingTag = await getTagByName(name, type)
        if (existingTag) return sendMessage(false, 400, "الوسم موجود بالفعل")

        try {
            await prisma.tag.create({
                data: {
                    name, slug, type, description,
                    userId: parseInt(user.id)
                }
            })
            revalidatePath("/dash/articles/categories")
            return sendMessage(true, 200, "تم إضافة الوسم بنجاح.")

        } catch (e) {
            return sendMessage(false, 400, "حدث خطأ ما")
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}

export async function updateTag({id, name, slug, type, description}) {
    const user = await useCurrentUser()
    const validated =  TagSchema.safeParse({ name })
    if (validated.success) {
        const existingTag = await getTagByName(name, type)
        if (existingTag && existingTag.id !== id) return sendMessage(false, 400, "الوسم موجود بالفعل")

        try {
            await prisma.tag.update({
                where: {
                  id: parseInt(id)
                },
                data: {
                    name, slug, description
                }
            })
            revalidatePath("/dash/articles/categories")
            return sendMessage(true, 200, "تم تحديث الوسم بنجاح.")

        } catch (e) {
            return sendMessage(false, 400, "حدث خطأ ما")
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}
export const getTagByName = async (name, type) => {
    const user = await useCurrentUser()
    const tag = await prisma.tag.findFirst({ where: { name, type, userId: parseInt(user.id) } })

    return tag
}

export const getTags = async (type) => {
    const tags = await prisma.tag.findMany({
        where: {
            type: type
        },
        include: {
            articles: true
        }
    })

    if(tags.length > 0){
        return sendMessage(true, 200, "تم جلب الوسوم بنجاح", tags)
    }
    return sendMessage(false, 400, "لا توجد بيانات")


}

export const deleteTag = async (id) => {
    await prisma.tag.delete({
        where: {
            id: parseInt(id)
        }
    })
    revalidatePath("/dash/articles/categories")
    return sendMessage(true, 200, "تم حذف الوسم بنجاح")
}