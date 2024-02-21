"use client"
import {useEffect, useRef} from "react";

const classNames = require('classnames');
export default function Form(
    {
        onSubmit,
        children,
    }){
    const formRef = useRef()

    return (
        <form
            onSubmit={onSubmit}
            className={"flex flex-col gap-3"}>
            { children }
        </form>
    )
}