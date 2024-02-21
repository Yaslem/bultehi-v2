"use client"
import {useSelector} from "react-redux";
import ResultStudent from "./components/Result";

export default function Global() {
    const isOpen = useSelector(state => state.result.isOpen)
    return (
        <>
            {
                isOpen &&
                <ResultStudent />
            }
        </>
    )
}