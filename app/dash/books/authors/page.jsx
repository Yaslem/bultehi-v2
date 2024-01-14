import Index from "./Index";
import {getAuthors} from "../../../../controllers/Author";

export default async function Page() {
    const { data, status, message } = await getAuthors()

    return (
        <Index authors={data} status={status} message={message} />
    )
}