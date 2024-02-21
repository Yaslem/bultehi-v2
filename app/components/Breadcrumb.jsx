"use client"
import {useEffect, useState} from "react";
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";
import {FaChevronDown} from "react-icons/fa";
import {generateBreadcrumbs} from "../../helpers/Global";

export default function Breadcrumbs({slug}) {
    const pathName = usePathname()
    const params = useParams()

    const breadcrumbs = generateBreadcrumbs({pathName, params, slug})
    return (
        <div className={""}>
            <ul className={"list-none flex items-center gap-3 font-medium"}>
                {breadcrumbs.map((crumb, idx) => (
                    <li key={idx} className={"flex items-center gap-2"}>
                        {
                            idx === breadcrumbs.length - 1
                            ? <span className={"text-slate-700"}>{crumb.title}</span>
                            : <Link className={"text-indigo-700 hover:text-indigo-600"} href={crumb.href}>
                                    {crumb.title}
                                </Link>
                        }
                        {
                            (breadcrumbs.length - 1) !== idx &&
                            <span style={{rotate: "90deg"}}>
                            <FaChevronDown className={"text-sm text-slate-500"} />
                        </span>
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}