"use client"
import {TbProgress} from "react-icons/tb";
import {MdEdit} from "react-icons/md";
import {BsTrash3Fill} from "react-icons/bs";
import Link from "next/link";
import {FaLink} from "react-icons/fa";

export function EditIcon(
    {
        onClick,
        isLoading,
    }) {
    return (
        <button disabled={isLoading} onClick={onClick} className={"cursor-pointer p-2 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 border border-dashed border-indigo-200"}>
            <MdEdit className={"text-xl text-indigo-600 hover:text-indigo-500"} />
        </button>
    )
}

export function ShowIcon(
    {
        link,
    }) {
    return (
        <Link href={link} className={"cursor-pointer p-2 flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 border border-dashed border-amber-200"}>
            <FaLink className={"text-xl text-amber-600 hover:text-amber-500"} />
        </Link>
    )
}

export function DeleteIcon(
    {
        onClick,
        isLoading,
        currentId,
        itemId,
    }) {
    return (
        <button onClick={onClick} disabled={isLoading} className={"cursor-pointer p-2 flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 border border-dashed border-red-200"}>
            {
                isLoading && currentId === itemId
                    ? <TbProgress className={"text-xl text-red-600 animate-spin"} />
                    : <BsTrash3Fill className={"text-xl text-red-600 hover:text-red-500"} />
            }

        </button>
    )
}