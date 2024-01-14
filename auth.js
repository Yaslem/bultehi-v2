import NextAuth from "next-auth"
import authConfig from "./auth.config";
import prisma from "./helpers/db";
import { PrismaAdapter } from "@auth/prisma-adapter"
import {getUserById} from "./controllers/User";
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: '/auth/login',
        // signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    events : {
        async linkAccount( { user}){
            await prisma.user.update({
                where: {
                    id: parseInt(user.id)
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {

        async signIn({ user, account }) {

            if(account.provider !== "credentials") return true

            const existingUser = await getUserById(user.id)

            if(!existingUser || !existingUser.emailVerified) return false
            return true
        },

        async session({ session, token }) {
            if(token.sub && session.user){
                session.user.id = token.sub
            }

            if(token.role && session.user){
                session.user.role = token.role
            }
            return session
        },

        async jwt({ token}) {
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub)

            if(!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig
})