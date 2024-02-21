"use client"
import {SectionCard} from "../../../../components/Results";
import Nothing from "../../../../components/Nothing";

export default function Schools({data, status}) {

    if(status === "success"){
        return <SectionCard isState={false} data={data} />
    }
    return <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على مدارس. (:"}/>
}