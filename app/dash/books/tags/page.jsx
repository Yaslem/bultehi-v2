import Index from "./Index";
import {getTags} from "../../../../controllers/Tag";

export default async function Page() {
    const { data, status, message } = await getTags("BOOK")

    return (
        <Index tags={data} status={status} message={message} />
    )
}