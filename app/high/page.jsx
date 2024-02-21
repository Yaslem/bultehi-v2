import High from "./index";
import {getPublicResults} from "../../controllers/public/Result";

export default async function Page(){
    const {data, status, message} = await getPublicResults("5")
    return (
        <High resultsProps={{
            data: data,
            status: status,
            message: message
        }} />
    )
}