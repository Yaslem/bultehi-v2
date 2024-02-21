"use server"
import prisma from "../helpers/db";
import upload, {deleteFile, isFileExist} from "../helpers/Upload";
import {AddArticleSchema, AddBookSchema} from "../helpers/Schemas";
import sendMessage from "../helpers/SendMessage";
import useCurrentUser from "./CurrentUser";
import {redirect} from "next/navigation";
import fs from 'node:fs/promises';
import {revalidatePath} from "next/cache";

export const uploadImage = async (formData) => {
    const filename = await upload("articles", formData.get("file"))
    return {
        location:`${process.env.BASE_URL}/uploads/articles/${filename}`
    }
}

export const createArticle = async ({title, body, category, tags, commentStatus, status, summary, formData}) => {
    const user = await useCurrentUser()
    const validated =  AddArticleSchema.safeParse({ title, summary, image: formData.get("image"), status, body, comment: commentStatus, category  })
    if(validated.success) {
        const filename = formData.get("image") !== "undefined" ? await upload("articles", formData.get("image")) : undefined
        try {
            await prisma.article.create({
                data: {
                    title,
                    description: body,
                    image: filename,
                    status,
                    commentStatus,
                    summary,
                    userId: parseInt(user.id),
                    categoryId: parseInt(category),
                    tags: {
                        create: tags.map(tag => {
                            return  {
                                assignedBy: user.name,
                                tag: {
                                    connect: {
                                        id: parseInt(tag),
                                    }
                                }
                            }
                        }),
                    },
                }
            })
            return sendMessage(true, 200, "تم إنشاء المقالة بنجاح")

        } catch (e) {
            return sendMessage(false, 400, "حدث خطأ ما.")
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }
}

export const updateArticle = async ({id, title, body, category, image, tags, commentStatus, status, summary, formData}) => {
    const user = await useCurrentUser()

    const validated =  AddArticleSchema.safeParse({ title, summary, image: formData.get("image"), status, body, comment: commentStatus, category: String(category)  })

    if(validated.success) {

        if(formData.get("image") !== "undefined" && formData.get("image") !== image){
            if(await isFileExist('articles', image)){
                await deleteFile('articles', image)
            }
            const filename = await upload("articles", formData.get("image"))

            try {
                await prisma.article.update({
                    where: {
                      id: parseInt(id)
                    },
                    data: {
                        title,
                        description: body,
                        image: filename,
                        status,
                        commentStatus,
                        summary,
                        categoryId: parseInt(category),
                        tags: {
                            deleteMany: tags.map(tag => {
                                return  {
                                    tagId: parseInt(tag)
                                }
                            }),
                            create: tags.map(tag => {
                                return  {
                                    assignedBy: user.name,
                                    tag: {
                                        connect: {
                                            id: parseInt(tag),
                                        }
                                    }
                                }
                            })
                        },
                    }
                })
                return sendMessage(true, 200, "تم تحديث المقالة بنجاح")

            } catch (e) {
                return sendMessage(false, 400, "حدث خطأ ما.")
            }
        } else {
            try {
                await prisma.article.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        title,
                        description: body,
                        status,
                        commentStatus,
                        summary,
                        categoryId: parseInt(category),
                        tags: {
                            deleteMany: tags.map(tag => {
                                return  {
                                    tagId: parseInt(tag)
                                }
                            }),
                            create: tags.map(tag => {
                                return  {
                                    assignedBy: user.name,
                                    tag: {
                                        connect: {
                                            id: parseInt(tag),
                                        }
                                    }
                                }
                            })
                        },
                    }
                })
                return sendMessage(true, 200, "تم تحديث المقالة بنجاح")

            } catch (e) {
                return sendMessage(false, 400, "حدث خطأ ما.")
            }
        }
    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }
}

export const getArticles = async () => {
    const articles = await prisma.article.findMany({
        include: {
            tags: {
                include: {
                    tag: true
                }
            },
            category: true,
            user: true,
        }
    })

    if(articles.length > 0){
        return sendMessage(true, 200, "تم جلب المقالات بنجاح", articles)
    }

    return sendMessage(false, 400, "لا توجد مقالات.")

}

export const getArticleById = async (id) => {
    const article = await prisma.article.findUnique({
        where: {
          id: parseInt(id)
        },
        include: {
            tags: {
                include: {
                    tag: true
                }
            },
            category: true,
            user: true,
        }
    })

    if(article){
        return sendMessage(true, 200, "تم جلب المقالة بنجاح", article)
    }

    return redirect("/dash/articles")

}

export const deleteArticle = async (id, image) => {

    if(await isFileExist('articles', image)){
        await deleteFile('articles', image)
    }

     await prisma.article.delete({
        where: {
            id: parseInt(id)
        },
    })

    revalidatePath("/dash/articles")
    return sendMessage(true, 200, "تم حذف المقالة بنجاح")

}