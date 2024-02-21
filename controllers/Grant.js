"use server"
import prisma from "../helpers/db";
import upload, {deleteFile, isFileExist} from "../helpers/Upload";
import {AddBookSchema, AddGrantSchema} from "../helpers/Schemas";
import sendMessage from "../helpers/SendMessage";
import useCurrentUser from "./CurrentUser";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {DEFAULT_IMAGE_FOR_GRANT} from "../helpers/Global";

export const createGrant = async (formData) => {
    const user = await useCurrentUser()
    const title = formData.get("title")
    const image = formData.get("image")
    const price = JSON.parse(formData.get("price"))
    const country = formData.get("country")
    const description = formData.get("description")
    const collegeId = JSON.parse(formData.get("college"))
    const phaseId = JSON.parse(formData.get("phase"))
    const specializationId = JSON.parse(formData.get("specialization"))
    const isFree = JSON.parse(formData.get("isFree"))
    const validated = AddGrantSchema.safeParse({title, country, description, phase: phaseId, college: collegeId, specialization: specializationId, isFree})
    if (validated.success) {
        if(DEFAULT_IMAGE_FOR_GRANT === image){
            try {
                await prisma.grant.create({
                    data: {
                        title, price, image, phaseId, isFree, description, country, collegeId, specializationId,
                        userId: parseInt(user.id),
                    }
                })
                revalidatePath("/dash/grants")
                return sendMessage(true, 200, "تم إنشاء المنحة بنجاح")

            } catch (e) {
                return sendMessage(false, 400, "حدث خطأ ما.")
            }
        } else {
            const filename = await upload("grants", image)
            try {
                await prisma.grant.create({
                    data: {
                        title, price, phaseId, image: filename, isFree, description, country, collegeId, specializationId,
                        userId: parseInt(user.id),
                    }
                })
                revalidatePath("/dash/grants")
                return sendMessage(true, 200, "تم إنشاء المنحة بنجاح")

            } catch (e) {
                return sendMessage(false, 400, "حدث خطأ ما.")
            }
        }


    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }
}

export async function updateGrantPublished(id, value) {
    await prisma.grant.update({
        where: {
            id: parseInt(id)
        },
        data: {
            isPublished: value,
        }
    })
    return sendMessage(true, 200, "تم تحديث حالة المنحة بنجاح")

}
export const updateGrant = async (formData) => {
    const id = JSON.parse(formData.get("id"))
    const title = formData.get("title")
    const image = formData.get("image")
    const newImage = formData.get("newImage")
    const price = JSON.parse(formData.get("price"))
    const country = formData.get("country")
    const description = formData.get("description")
    const collegeId = JSON.parse(formData.get("college"))
    const phaseId = JSON.parse(formData.get("phase"))
    const specializationId = JSON.parse(formData.get("specialization"))
    const isFree = JSON.parse(formData.get("isFree"))
    const validated = AddGrantSchema.safeParse({title, phase: phaseId, country, description, college: collegeId, specialization: specializationId, isFree})
    if (validated.success) {
        if (!isFree && price === undefined || price === 0 || price < 1) {
            return sendMessage(false, 400, "السعر مطلوب.")
        }  else {

            if(newImage !== "undefined" && newImage !== image){
                if(image !== DEFAULT_IMAGE_FOR_GRANT){
                    if(await isFileExist('grants', image)){
                        await deleteFile('grants', image)
                    }
                }
                const filename = await upload("grants", newImage)

                try {
                    await prisma.grant.update({
                        where: {id},
                        data: {title, phaseId, image: filename, country, description, isFree, price, collegeId, specializationId}
                    })
                    revalidatePath("/dash/grants")
                    return sendMessage(true, 200, "تم تحديث المنحة بنجاح")

                } catch (e) {
                    console.log(e)
                    return sendMessage(false, 400, "حدث خطأ ما.")
                }
            } else {
                try {
                    await prisma.grant.update({
                        where: {id},
                        data: {title, phaseId, country, description, isFree, price, collegeId, specializationId}
                    })
                    revalidatePath("/dash/grants")
                    return sendMessage(true, 200, "تم تحديث المنحة بنجاح")

                } catch (e) {
                    console.log(e)
                    return sendMessage(false, 400, "حدث خطأ ما.")
                }
            }
        }

    } else {
        return sendMessage(false, 400, "بعض البيانات مطلوبة.", validated.error.format())
    }
}
export const getGrants = async () => {
    const grants = await prisma.grant.findMany({
        include: {
            college: true,
            specialization: true,
            phase: true,
            user: true,
        }
    })

    if (grants.length > 0) {
        return sendMessage(true, 200, "تم جلب المنح بنجاح", grants)
    }
    return sendMessage(false, 400, "لا توجد بيانات")

}

export const getGrantById = async (id) => {
    const grant = await prisma.grant.findUnique({
        where: {
          id: parseInt(id)
        },
        include: {
            college: true,
            specialization: true,
        }
    })

    if (grant) {
        return sendMessage(true, 200, "تم جلب المنحة بنجاح", grant)
    }
    return redirect("/grants")

}

export const deleteGrant = async (id, image) => {

    if(await isFileExist('grants', image)){
        await deleteFile('grants', image)
    }

    await prisma.grant.delete({
        where: {
            id: parseInt(id)
        },
    })

    revalidatePath("/dash/grants")
    return sendMessage(true, 200, "تم حذف المنحة بنجاح")

}