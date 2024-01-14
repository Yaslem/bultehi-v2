import Index from "./Index";
import {getCategories} from "../../../../controllers/Category";

export default async function Page() {
    const { data, status, message } = await getCategories("BOOK")

    return (
        <Index categories={data} status={status} message={message} />
    )
}