import {getPublicResults} from "../../controllers/public/Result";
import Elementary from "./index";

export default async function Page(){
    const {data, status, message} = await getPublicResults("1")
    return (
        <Elementary resultsProps={{
            data: data,
            status: status,
            message: message
        }} />
    )
}