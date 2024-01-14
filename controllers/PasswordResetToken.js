"use server"


import prisma from "../helpers/db";


export const getPasswordResetTokenByToken = async (token) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findUnique({ where: { token } })
        return passwordResetToken
    } catch {
        return null
    }
}

export const getPasswordResetTokenByEmail = async (email) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findFirst({ where: { email } })
        return passwordResetToken
    } catch {
        return null
    }
}

export const deletePasswordResetToken = async (id) => {
    try {
         await prisma.passwordResetToken.delete({ where: { id: parseInt(id) } })
        return;
    } catch {
        return null
    }
}

export const createPasswordResetToken = async (email, token, expires) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.create({data: {email, token, expires}});
        return passwordResetToken
    } catch {
        return null
    }
}
