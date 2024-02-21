"use client"
import {SectionCard} from "../../../../components/Results";
import Pagination from "../../../../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {paginationActions} from "../../../../../redux/slices/paginationSlice";
import {useParams, useSearchParams} from "next/navigation";
import {getCountiesByResultId} from "../../../../../controllers/High";
import {getIdFromUrl} from "../../../../../helpers/Global";
import Nothing from "../../../../components/Nothing";

export default function Counties({data, status}) {
    if(status === "success"){
        return <SectionCard isState={false} data={data} />
    }
    return <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على مقاطعات. (:"}/>
}