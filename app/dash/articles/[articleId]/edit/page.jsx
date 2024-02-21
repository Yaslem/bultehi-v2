import Edit from "./index";
import {getArticleById} from "../../../../../controllers/Article";
import {getCategories} from "../../../../../controllers/Category";
import {getTags} from "../../../../../controllers/Tag";

export default async function Page({ params }) {
    const { status, data: article } = await getArticleById(parseInt(params.articleId))
    const { data: categories, status: categoriesStatus, message: categoriesMessage } = await getCategories("ARTICLE")
    const { data: tags, status: tagsStatus, message: tagsMessage } = await getTags("ARTICLE")
    return (
        <Edit
            article={article}
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