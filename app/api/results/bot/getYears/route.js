import {NextResponse} from "next/server";
import {getYears} from "../../../../../controllers/ResultSettings";

export async function POST(request) {
    const {data, status, message, code} = await getYears()
    if(status === "success") {
        return NextResponse.json({ years: data, status: true })
    }
    return NextResponse.json({ status: false })
}