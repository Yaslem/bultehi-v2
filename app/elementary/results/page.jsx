import Results from "./index";
import {getPublicAllResults} from "../../../controllers/public/Result";

export default async function Page(){
    const { data, status, message } = await getPublicAllResults("1")
    return (
        <Results results={data} status={status} />
    )
}