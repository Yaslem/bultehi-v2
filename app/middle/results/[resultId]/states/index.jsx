"use client"
import {SectionCard} from "../../../../components/Results";

export default function States({data}) {
    return (
        <SectionCard isPagination={false} data={data} nameData={"states"} isAll={true} />
    )
}