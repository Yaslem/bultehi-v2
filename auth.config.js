import Credentials from "next-auth/providers/credentials"
import {LoginSchema} from "./helpers/Schemas";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
// import {compare} from "bcryptjs";
var bcrypt = require('bcryptjs');
import {getUserByEmail} from "./controllers/User";

export default {
    providers: [
        Credentials({
            async authorize(credentials){
                const { email, password } = credentials
                const validated =  LoginSchema.safeParse({ email, password })

                if(validated.success){
                    const user = await getUserByEmail(email)

                    if(!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(passwordMatch) return user;
                }
                return null;
            }
        }),
        Facebook,
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })

    ],
}