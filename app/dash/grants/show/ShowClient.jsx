"use client"
import ReactHtmlParser from 'react-html-parser';
import {useEffect, useRef, useState} from "react";
import ParseArticle from "../../../../helpers/ParseHTML";
export default function ShowClient({description}) {
    const parser = new DOMParser()
    const body = parser.parseFromString(description, "text/html")
    const devRef = useRef()
    const desc = new ParseArticle(body)


    useEffect(() => {
        devRef.current.append(desc.render())
    }, [devRef])

    return (
        <div ref={devRef}></div>
    )
}