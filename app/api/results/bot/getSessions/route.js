import {NextResponse} from "next/server";
import {getSessions} from "../../../../../controllers/ResultSettings";

export async function POST(request) {
    const {data, status, message, code} = await getSessions()
    if(status === "success") {
        return NextResponse.json({ sessions: data, status: true })
    }
    return NextResponse.json({ status: false })
}