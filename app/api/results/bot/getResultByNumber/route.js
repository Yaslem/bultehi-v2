import {NextResponse} from "next/server";
import {getResultStudentByNumber} from "../../../../../controllers/public/Result";

export async function POST(request) {
    const res = await request.json()
    const {year, type, category, session, number} = res;
    const {data, status, message, code} = await getResultStudentByNumber({year, type, category, session, number})
    if(status === "success") {
        return NextResponse.json({ student: data, status: true })
    }
    return NextResponse.json({ status: false })
}