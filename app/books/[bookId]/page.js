import BookId from "./index";
import {getBookById, getBooks} from "../../../controllers/Book";

export default async function Page({params}) {
    const { data: book, message, status } = await getBookById(params.bookId)
    return (
        <BookId book={book} />
    )
}