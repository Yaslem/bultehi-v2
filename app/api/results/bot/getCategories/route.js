import {NextResponse} from "next/server";
import {getTypes} from "../../../../../controllers/ResultSettings";

export async function POST(request) {
    const {data, status, message, code} = await getTypes()
    console.log(status)
    if(status === "success") {
        return NextResponse.json({ categories: data, status: true })
    }
    return NextResponse.json({ status: false })
}