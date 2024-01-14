"use server"
import prisma from "../helpers/db";
import sendMessage from "../helpers/SendMessage";
import {AuthorSchema} from "../helpers/Schemas";
import {revalidatePath} from "next/cache";
import useCurrentUser from "./CurrentUser";

export async function createAuthor({name, description}) {
    const user = await useCurrentUser()
    const validated =  AuthorSchema.safeParse({ name })
    if (validated.success) {
        const existingAuthor = await getAuthorByName(name)
        if (existingAuthor) return sendMessage(false, 400, "المؤلف موجود بالفعل")

        try {
            await prisma.author.create({
                data: {
                    name, description,
                    userId: parseInt(user.id)
                }
            })
            revalidatePath("/dash/books/authors")
            return sendMessage(true, 200, "تم إضافة المؤلف بنجاح.")

        } catch (e) {
            return sendMessage(false, 400, "حدث خطأ ما")
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}

export async function updateAuthor({id, name, description}) {
    const user = await useCurrentUser()
    const validated =  AuthorSchema.safeParse({ name })
    if (validated.success) {
        const existingAuthor = await getAuthorByName(name)
        if (existingAuthor && existingAuthor.id !== id) return sendMessage(false, 400, "المؤلف موجود بالفعل")

        try {
            await prisma.author.update({
                where: {
                  id: parseInt(id)
                },
                data: {
                    name, description
                }
            })
            revalidatePath("/dash/books/authors")
            return sendMessage(true, 200, "تم تحديث المؤلف بنجاح.")

        } catch (e) {
            return sendMessage(false, 400, "حدث خطأ ما")
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }

}
export const getAuthorByName = async (name) => {
    const user = await useCurrentUser()
    return await prisma.author.findFirst({where: {name, userId: parseInt(user.id)}})
}

export const getAuthors = async () => {
    const authors = await prisma.author.findMany({
        include: {
            books: true
        }
    })
    if(authors.length > 0){
        return sendMessage(true, 200, "تم جلب المؤلفين بنجاح", authors)
    }
    return sendMessage(false, 400, "لا توجد بيانات")


}

export const deleteAuthor = async (id) => {
    await prisma.author.delete({
        where: {
            id: parseInt(id)
        }
    })
    revalidatePath("/dash/books/authors")
    return sendMessage(true, 200, "تم حذف المؤلف بنجاح")
}