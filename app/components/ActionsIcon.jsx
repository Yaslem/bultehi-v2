"use client"
import {TbProgress} from "react-icons/tb";
import {MdEdit} from "react-icons/md";
import {BsTrash3Fill} from "react-icons/bs";
import Link from "next/link";
import {FaLink} from "react-icons/fa";
import {FiUpload} from "react-icons/fi";
import {IoClose} from "react-icons/io5";

export function EditIcon(
    {
        onClick,
        isLoading,
        currentId,
        itemId,
        action
    }) {
    function isDo() {
        return isLoading && currentId === itemId && action === "edit";
    }
    return (
        <button disabled={isLoading} onClick={onClick} className={"cursor-pointer p-2 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 border border-dashed border-indigo-200"}>
            {
                isDo()
                    ? <TbProgress className={"text-xl text-indigo-600 animate-spin"} />
                    : <MdEdit className={"text-xl text-indigo-600 hover:text-indigo-500"} />
            }
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
        action
    }) {

    function isDo() {
        return isLoading && currentId === itemId && action === "delete";
    }

    return (
        <button onClick={onClick} disabled={isLoading} className={"cursor-pointer p-2 flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 border border-dashed border-red-200"}>
            {
                isDo()
                    ? <TbProgress className={"text-xl text-red-600 animate-spin"} />
                    : <BsTrash3Fill className={"text-xl text-red-600 hover:text-red-500"} />
            }

        </button>
    )
}

export function UploadIcon(
    {
        onClick,
        isLoading,
        currentId,
        itemId,
        action
    }) {
    function isDo() {
        return isLoading && currentId === itemId && action === "upload";
    }
    return (
        <button onClick={onClick} disabled={isLoading} className={"cursor-pointer p-2 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 border border-dashed border-indigo-200"}>
            {
                isDo()
                    ? <TbProgress className={"text-xl text-indigo-600 animate-spin"} />
                    : <FiUpload className={"text-xl text-indigo-600 hover:text-indigo-500"} />
            }

        </button>
    )
}

export function Switch(
    {
        title,
        value,
        name,
        isTitle = false,
        checked,
        onChange
    }) {
    return (
        <label className="relative inline-flex gap-2 justify-between items-center cursor-pointer">
            <input
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                className="sr-only peer"
                onChange={onChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            {
                isTitle &&
                <span className="ms-3 text-sm font-medium text-slate-700">{title}</span>
            }
        </label>
    )
}

export function Cancel({onClick}) {
    return (
        <span onClick={onClick} className={"p-1 border cursor-pointer bg-stone-50 hover:bg-red-50 hover:border-red-200 rounded-lg flex items-center justify-center"}>
            <IoClose className={"text-xl hover:text-red-600 text-slate-600"}/>
        </span>
    )
}