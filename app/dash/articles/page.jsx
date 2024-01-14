import Index from "./Index";
import {getArticles} from "../../../controllers/Article";

export default async function Page() {
    const { data: articles, message, status } = await getArticles()
    console.log(articles)
    return (
        <Index articles={articles} />
    )
}