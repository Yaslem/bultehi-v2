import {PiCertificateBold} from "react-icons/pi";

export default function Elementary(){
    return (
        <div>
            <ul className={"flex flex-col gap-4 pr-4"}>
                <li className={"flex gap-4 text-sm font-medium text-indigo-500"}>
                    <PiCertificateBold className={"text-2xl text-indigo-500"} />
                    <span>نتائج كنكور 1445 - 2024</span>
                </li>
                <hr />
                <li className={"flex gap-4 text-sm font-medium text-indigo-500"}>
                    <PiCertificateBold className={"text-2xl text-indigo-500"} />
                    <span>نتائج كنكور 1444 - 2023</span>
                </li>
                <hr />
                <li className={"flex gap-4 text-sm font-medium text-indigo-500"}>
                    <PiCertificateBold className={"text-2xl text-indigo-500"} />
                    <span>نتائج كنكور 1443 - 2022</span>
                </li>
                <hr />
                <li className={"flex gap-4 text-sm font-medium text-indigo-500"}>
                    <PiCertificateBold className={"text-2xl text-indigo-500"} />
                    <span>نتائج كنكور 1442 - 2021</span>
                </li>
            </ul>
        </div>
    )
}