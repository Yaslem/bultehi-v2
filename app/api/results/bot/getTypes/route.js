import {NextResponse} from "next/server";
import {getBacTypes} from "../../../../../controllers/public/Result";

export async function POST(request) {
    const {data, status, message, code} = await getBacTypes()
    console.log(status)
    if(status === "success") {
        return NextResponse.json({ types: data, status: true })
    }
    return NextResponse.json({ status: false })
}