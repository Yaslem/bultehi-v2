"use server"
import prisma from "../helpers/db";
import sendMessage from "../helpers/SendMessage";
import {AuthorSchema, PublisherSchema} from "../helpers/Schemas";
import {revalidatePath} from "next/cache";
import useCurrentUser from "./CurrentUser";

export async function createPublisher({name, description}) {
    const user = await useCurrentUser()
    const validated =  PublisherSchema.safeParse({ name })
    if (validated.success) {
        const existingPublisher = await getPublisherByName(name)
        if (existingPublisher) return sendMessage(false, 400, "الناشر موجود بالفعل")

        try {
            await prisma.publisher.create({
                data: {
                    name, description,
                    userId: parseInt(user.id)
                }
            })
            revalidatePath("/dash/books/publishers")
            return sendMessage(true, 200, "تم إضافة الناشر بنجاح.")

        } catch (e) {
            return sendMessage(false, 400, "حدث خطأ ما")
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}

export async function updatePublisher({id, name, description}) {
    const user = await useCurrentUser()
    const validated =  AuthorSchema.safeParse({ name })
    if (validated.success) {
        const existingPublisher = await getPublisherByName(name)
        if (existingPublisher && existingPublisher.id !== id) return sendMessage(false, 400, "الناشر موجود بالفعل")

        try {
            await prisma.publisher.update({
                where: {
                  id: parseInt(id)
                },
                data: {
                    name, description
                }
            })
            revalidatePath("/dash/books/publishers")
            return sendMessage(true, 200, "تم تحديث الناشر بنجاح.")

        } catch (e) {
            console.log(e)
            return sendMessage(false, 400, "حدث خطأ ما")
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}
export const getPublisherByName = async (name) => {
    const user = await useCurrentUser()
    return await prisma.publisher.findFirst({where: {name, userId: parseInt(user.id)}})
}

export const getPublishers = async () => {
    const publishers = await prisma.publisher.findMany({
        include: {
            books: true
        }
    })
    if(publishers.length > 0){
        return sendMessage(true, 200, "تم جلب الناشرين بنجاح", publishers)
    }
    return sendMessage(false, 400, "لا توجد بيانات")


}

export const deletePublisher = async (id) => {
    await prisma.publisher.delete({
        where: {
            id: parseInt(id)
        }
    })
    revalidatePath("/dash/books/publishers")
    return sendMessage(true, 200, "تم حذف الناشر بنجاح")
}