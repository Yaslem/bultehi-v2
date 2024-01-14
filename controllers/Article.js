"use server"
import prisma from "../helpers/db";
import upload from "../helpers/Upload";
import {AddArticleSchema, AddBookSchema} from "../helpers/Schemas";
import sendMessage from "../helpers/SendMessage";
import useCurrentUser from "./CurrentUser";
export const uploadImage = async (formData) => {
    const filename = await upload("articles", formData.get("file"))
    return {
        location:`${process.env.BASE_URL}/uploads/articles/${filename}`
    }
}

export const createArticle = async (
    {
        title, numberOfCopies, numberOfPages, price, formData, publishYear, publisher, authors, category, tags, description, isFree, errorSome
    }) => {
    const user = await useCurrentUser()
    console.log("server")
    const validated =  AddBookSchema.safeParse({
        title, numberOfCopies: parseInt(numberOfCopies), numberOfPages: parseInt(numberOfPages), price: parseInt(price), image: formData, publishYear: new Date(publishYear), publisher, authors, category, tags, description,
    })
    if(validated.success) {
        if (!isFree && errorSome.length === 0){
            const isbn = Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000
            const filename = await upload("books", formData.get("image"))
            try {
                await prisma.book.create({
                    data: {
                        title,
                        description: description,
                        image: filename,
                        userId: parseInt(user.id),
                        categoryId: parseInt(category),
                        publisherId: parseInt(publisher),
                        isbn,
                        numberOfPages,
                        numberOfCopies,
                        publishYear,
                        price: isFree ? undefined : price,
                        isFree,
                        authors: {
                            create: authors.map(author => {
                                return  {
                                    assignedBy: user.name,
                                    author: {
                                        connect: {
                                            id: parseInt(author),
                                        }
                                    }
                                }
                            }),
                        },
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
                return sendMessage(true, 200, "تم إنشاء الكتاب بنجاح")

            } catch (e) {
                return sendMessage(false, 400, "حدث خطأ ما.")
            }
        }
        return sendMessage(false, 400, "بعض البيانات مطلوبة.")
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

    return sendMessage(true, 200, "تم جلب المقالات بنجاح", articles)

}