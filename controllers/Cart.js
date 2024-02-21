"use server"
import prisma from "../helpers/db";
import sendMessage from "../helpers/SendMessage";
import {revalidatePath} from "next/cache";
import useCurrentUser from "./CurrentUser";

export async function addItem(bookId, price) {
    const user = await useCurrentUser()
    const existingItem = await getItemByBookId(bookId)
    if (existingItem) return sendMessage(false, 400, "العنصر موجود بالفعل")

    try {
        const item = await prisma.cart.create({
            data: {
                priceAll: parseInt(price),
                bookId: parseInt(bookId),
                userId: parseInt(user.id)
            }
        })
        return {
            data: item
        }

    } catch (e) {
        return sendMessage(false, 400, "حدث خطأ ما")
    }

}

export const getItemByBookId = async (id) => {
    return await prisma.cart.findFirst({where: {bookId: parseInt(id), cancelled: false}})
}

export const getItems = async () => {
    const items = await prisma.cart.findMany({
        where: {
            cancelled: false
        },
        include: {
            user: true,
            book: true
        }
    })

    if(items.length > 0){
        return sendMessage(true, 200, "تم جلب سلة المشتريات بنجاح", items)
    }
    return sendMessage(false, 400, "لا توجد بيانات")

}

export const deleteItem = async (id) => {
    try {
        await prisma.cart.update({
            where: {
                id: parseInt(id)
            },
            data: {
                cancelled: true
            }
        })

        return sendMessage(true, 200, "تم حذف العنصر بنجاح")

    } catch (e) {
        return sendMessage(false, 400, "يوجد خطأ ما.")
    }
}

export const addCopyItem = async (id, price) => {
    const item = await prisma.cart.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            book: true
        }
    })

    try {
        if(item.quantity >= 1 && item.quantity < item.book.numberOfCopies){
            await prisma.cart.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    quantity: parseInt(item.quantity) + 1,
                    priceAll: parseInt(item.priceAll) + parseInt(price),
                }
            })
            return sendMessage(true, 200, "تم إضافة العنصر بنجاح")
        }
    } catch (e) {
        console.log(e)
        return sendMessage(false, 400, "يوجد خطأ ما.")
    }
}
export const deleteCopyItem = async (id, price) => {
    const item = await prisma.cart.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            book: true
        }
    })
    try {
        if(item.quantity > 1 && item.quantity <= item.book.numberOfCopies){
            await prisma.cart.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    quantity: parseInt(item.quantity) - 1,
                    priceAll: parseInt(item.priceAll) - parseInt(price),
                }
            })
            return sendMessage(false, 200, "تم حذف العنصر بنجاح")
        } else {
            return sendMessage(false, 400, "يوجد خطأ في عدد الكمية المطلوبة.")
        }
    } catch (e) {
        return sendMessage(false, 400, "يوجد خطأ ما.")
    }
}
export const deleteItems = async () => {
    try {
        await prisma.cart.updateMany({
            data: {
                cancelled: true
            }
        })

        return sendMessage(true, 200, "تم حذف جميع العنصر بنجاح")

    } catch (e) {
        return sendMessage(false, 400, "يوجد خطأ ما")
    }

}