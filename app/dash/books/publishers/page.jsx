import Index from "./Index";
import {getPublishers} from "../../../../controllers/Publisher";

export default async function Page() {
    const { data, status, message } = await getPublishers()

    return (
        <Index publishers={data} status={status} message={message} />
    )
}