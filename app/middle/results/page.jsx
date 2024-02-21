import Results from "./index";
import {getPublicAllResults} from "../../../controllers/public/Result";

export default async function Page(){
    const { data, status, message } = await getPublicAllResults({slug: "2", byCategory: "middle"})
    return (
        <Results results={data} status={status} />
    )
}