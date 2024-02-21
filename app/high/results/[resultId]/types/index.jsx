"use client"
import {SectionCard} from "../../../../components/Results";

export default function Types({data}) {
    return (
        <SectionCard isType={true} isPagination={false} data={data} nameData={"types"} isAll={true} />
    )
}