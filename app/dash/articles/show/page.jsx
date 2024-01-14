import Section from "../../components/Section";
import Title from "../../components/Title";
import ShowClient from "./ShowClient";
import {getArticles} from "../../../../controllers/Article";

export default async function Page() {
    const { data: articles, message, status } = await getArticles()
    // const output = parser.parse(JSON.parse(articles.description));
    // console.log(output)
    return (
        <Section>
            <Title title={"عرض المقالة"} />
            <ShowClient description={articles.description} />
        </Section>
    )
}