import HeaderSection from "./HeaderSection";
import Elementary from "./Elementary";

export default function Elementaries({isAll}){
    return (
        <div className={"flex flex-col px-4 gap-4"}>
            <HeaderSection link={"/elementary-education/elementary"} isAll={isAll} title={"مسابقة كنكور"} />
            <Elementary />
        </div>
    )
}