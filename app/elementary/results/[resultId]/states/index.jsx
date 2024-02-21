"use client"
import {SectionCard} from "../../../../components/Results";
import Nothing from "../../../../components/Nothing";

export default function States({data, status}) {
    if(status === "success"){
        return <SectionCard isPagination={false} data={data} nameData={"states"} isAll={true} />
    }
    return <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على ولايات. (:"}/>
}