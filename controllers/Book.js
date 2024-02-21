"use server"
import prisma from "../helpers/db";
import upload, {deleteFile, isFileExist} from "../helpers/Upload";
import { AddBookSchema } from "../helpers/Schemas";
import sendMessage from "../helpers/SendMessage";
import useCurrentUser from "./CurrentUser";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export const createBook = async ({ title, numberOfPages, numberOfCopies, publishYear, price, isFree, description, categoryId, tags, publisherId, authors, formData }) => {
    const user = await useCurrentUser()
    const validated = AddBookSchema.safeParse({
        title, numberOfPages: parseInt(numberOfPages), image: formData.get("image"), publishYear: new Date(publishYear),
        publisher: publisherId,
        category: categoryId,
        description,
    })
    if (validated.success) {

        if (!isFree && price === undefined || price?.length === 0 || parseInt(price) < 1) {
            return sendMessage(false, 400, "السعر مطلوب.")
        } else if (!isFree && numberOfCopies === undefined || numberOfCopies?.length === 0 || parseInt(numberOfCopies) < 1) {
            return sendMessage(false, 400, "عدد النسخ مطلوب.")
        } if (authors.length === 0) {
            return sendMessage(false, 400, "المؤلف مطلوب.")
        } else {
            const filename = await upload("books", formData.get("image"))

            const isbn = Math.floor(Math.random() * (1000000 - 1000) + 1000)

            try {
                await prisma.book.create({
                    data: {
                        title,
                        isbn,
                        numberOfPages: parseInt(numberOfPages),
                        numberOfCopies: parseInt(numberOfCopies),
                        publishYear: new Date(publishYear),
                        price,
                        isFree,
                        description,
                        image: filename,
                        categoryId: parseInt(categoryId),
                        userId: parseInt(user.id),
                        publisherId: parseInt(publisherId),
                        authors: {
                            create: authors.map(author => {
                                return {
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
                                return {
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
                revalidatePath("/dash/books")
                return sendMessage(true, 200, "تم إنشاء الكتاب بنجاح")

            } catch (e) {
                return sendMessage(false, 400, "حدث خطأ ما.")
            }
        }

    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }
}

export const updateBook = async ({ id, title, image, numberOfPages, numberOfCopies, publishYear, price, isFree, description, categoryId, tags, publisherId, authors, formData }) => {
    const user = await useCurrentUser()
    const validated = AddBookSchema.safeParse({
        title, numberOfPages: parseInt(numberOfPages), image: formData.get("image"), publishYear: new Date(publishYear),
        publisher: String(publisherId),
        category: String(categoryId),
        description,
    })
    if (validated.success) {

        if (!isFree && price === undefined || price?.length === 0 || parseInt(price) < 1) {
            return sendMessage(false, 400, "السعر مطلوب.")
        } else if (!isFree && numberOfCopies === undefined || numberOfCopies?.length === 0 || parseInt(numberOfCopies) < 1) {
            return sendMessage(false, 400, "عدد النسخ مطلوب.")
        } if (authors.length === 0) {
            return sendMessage(false, 400, "المؤلف مطلوب.")
        } else {

            if(formData.get("image") !== "undefined" && formData.get("image") !== image){
                if(await isFileExist('books', image)){
                    await deleteFile('books', image)
                }

                const filename = await upload("books", formData.get("image"))

                const isbn = Math.floor(Math.random() * (1000000 - 1000) + 1000)

                try {
                    await prisma.book.update({
                        where: {
                          id: parseInt(id)
                        },
                        data: {
                            title,
                            isbn,
                            numberOfPages: parseInt(numberOfPages),
                            numberOfCopies: isFree ? null : parseInt(numberOfCopies),
                            publishYear: new Date(publishYear),
                            price: isFree ? null : price,
                            isFree,
                            description,
                            image: filename,
                            categoryId: parseInt(categoryId),
                            userId: parseInt(user.id),
                            publisherId: parseInt(publisherId),
                            authors: {
                                deleteMany: authors.map(author => {
                                    return  {
                                        authorId: parseInt(author)
                                    }
                                }),
                                create: authors.map(author => {
                                    return {
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
                                deleteMany: tags.map(tag => {
                                    return  {
                                        tagId: parseInt(tag)
                                    }
                                }),
                                create: tags.map(tag => {
                                    return {
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
                    revalidatePath("/dash/books")
                    return sendMessage(true, 200, "تم تحديث الكتاب بنجاح")

                } catch (e) {
                    return sendMessage(false, 400, "حدث خطأ ما.")
                }
            } else {
                const isbn = Math.floor(Math.random() * (1000000 - 1000) + 1000)
                try {
                    await prisma.book.update({
                        where: {
                            id: parseInt(id)
                        },
                        data: {
                            title,
                            isbn,
                            numberOfPages: parseInt(numberOfPages),
                            numberOfCopies: isFree ? null : parseInt(numberOfCopies),
                            publishYear: new Date(publishYear),
                            price: isFree ? null : price,
                            isFree,
                            description,
                            categoryId: parseInt(categoryId),
                            userId: parseInt(user.id),
                            publisherId: parseInt(publisherId),
                            authors: {
                                deleteMany: authors.map(author => {
                                    return  {
                                        authorId: parseInt(author)
                                    }
                                }),
                                create: authors.map(author => {
                                    return {
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
                                deleteMany: tags.map(tag => {
                                    return  {
                                        tagId: parseInt(tag)
                                    }
                                }),
                                create: tags.map(tag => {
                                    return {
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
                    revalidatePath("/dash/books")
                    return sendMessage(true, 200, "تم تحديث الكتاب بنجاح")

                } catch (e) {
                    return sendMessage(false, 400, "حدث خطأ ما.")
                }
            }
        }

    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }
}
export const getBooks = async () => {
    const books = await prisma.book.findMany({
        include: {
            authors: {
                include: {
                    author: true
                }
            },
            publisher: true,
            category: true,
            user: true,
        }
    })

    if (books.length > 0) {
        return sendMessage(true, 200, "تم جلب الكتب بنجاح", books)
    }
    return sendMessage(false, 400, "لا توجد بيانات")

}

export const getBookById = async (id) => {
    const book = await prisma.book.findUnique({
        where: {
          id: parseInt(id)
        },
        include: {
            authors: {
                include: {
                    author: true
                }
            },
            tags: {
                include: {
                    tag: true
                }
            },
            publisher: true,
            category: true,
        }
    })

    if (book) {
        return sendMessage(true, 200, "تم جلب الكتاب بنجاح", book)
    }
    return redirect("/books")

}

export const deleteBook = async (id, image) => {

    if(await isFileExist('books', image)){
        await deleteFile('books', image)
    }

    await prisma.book.delete({
        where: {
            id: parseInt(id)
        },
    })

    revalidatePath("/dash/books")
    return sendMessage(true, 200, "تم حذف الكتاب بنجاح")

}