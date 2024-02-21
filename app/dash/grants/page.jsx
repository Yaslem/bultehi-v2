import Index from "./Index";
import {getGrants} from "../../../controllers/Grant";

export default async function Page() {
    const { data: grants, message, status } = await getGrants()
    return (
        <Index grants={grants} status={status} />
    )
}