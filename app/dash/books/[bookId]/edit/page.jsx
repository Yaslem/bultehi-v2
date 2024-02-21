import Edit from "./index";
import {getCategories} from "../../../../../controllers/Category";
import {getTags} from "../../../../../controllers/Tag";
import {getAuthors} from "../../../../../controllers/Author";
import {getPublishers} from "../../../../../controllers/Publisher";
import {getBookById} from "../../../../../controllers/Book";

export default async function Page({ params }) {
    const { data: book, status} = await getBookById(parseInt(params.bookId))
    const { data: categories, status: categoriesStatus, message: categoriesMessage } = await getCategories("BOOK")
    const { data: tags, status: tagsStatus, message: tagsMessage } = await getTags("BOOK")
    const { data: authors, status: authorsStatus, message: authorsMessage } = await getAuthors()
    const { data: publishers, status: publishersStatus, message: publishersMessage } = await getPublishers()

    return (
        <Edit
            book={book}
            categoriesProps={{
                data: categories,
                status: categoriesStatus,
                message: categoriesMessage
            }} tagsProps={{
            data: tags,
            status: tagsStatus,
            message: tagsMessage
            }}
            authorsProps={{
                data: authors,
                status: authorsStatus,
                message: authorsMessage
            }}
            publishersProps={{
                data: publishers,
                status: publishersStatus,
                message: publishersMessage
            }}
        />
    )
}