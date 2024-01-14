import upload from "../../../../helpers/Upload";
import {NextResponse} from "next/server";

export async function POST(request) {
    const { image } = request.body
    console.log(image)
    const filename = await upload("articles", "images", image)

    return NextResponse.json({
        image: filename,
        success: 1,
        file: {
            url: `http://localhost:3000/uploads/articles/images/${filename}`,
        }
    })
}