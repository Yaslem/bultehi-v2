"use server"
import prisma from "../helpers/db";
export const getUserById = async (id) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
        return user
    } catch {
        return null
    }
}

export const getUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        return user
    } catch {
        return null
    }
}

export const updateEmailVerified = async (id, email) => {
    try {
        return await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                emailVerified: new Date(),
                email
            }
        })
    } catch {
        return null
    }
}