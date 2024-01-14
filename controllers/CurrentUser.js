"use server"

import {auth} from "../auth";

export default async function useCurrentUser(){
    const session = await auth()

    return session?.user
}