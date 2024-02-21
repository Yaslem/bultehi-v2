import {getPublicResults} from "../../controllers/public/Result";
import Middle from "./index";

export default async function Page(){
    const {data, status, message} = await getPublicResults("2")
    return (
        <Middle resultsProps={{
            data: data,
            status: status,
            message: message
        }} />
    )
}