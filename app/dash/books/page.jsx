import Index from "./Index";
import {getBooks} from "../../../controllers/Book";

export default async function Page() {
    const { data: books, message, status } = await getBooks()
    return (
        <Index books={books} status={status} />
    )
}