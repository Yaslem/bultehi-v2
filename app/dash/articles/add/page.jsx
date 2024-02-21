import {getCategories} from "../../../../controllers/Category";
import {getTags} from "../../../../controllers/Tag";
import Index from "./Index";

export default async function Page() {
    const { data: categories, status: categoriesStatus, message: categoriesMessage } = await getCategories("ARTICLE")
    const { data: tags, status: tagsStatus, message: tagsMessage } = await getTags("ARTICLE")
    return (
        <Index
            categoriesProps={{
            data: categories,
            status: categoriesStatus,
            message: categoriesMessage
        }} tagsProps={{
            data: tags,
            status: tagsStatus,
            message: tagsMessage
        }} />
    )
}