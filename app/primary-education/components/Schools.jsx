
import HeaderSection from "./HeaderSection";
import School from "./School";
import Link from "next/link";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import Pagination from "../../components/Pagination";

export default function Schools({isAll}){
    return (
        <div className={"flex flex-col px-4 gap-8"}>
            <HeaderSection isAll={isAll} link={"/primary-education/schools"} title={"المدارس"} />
            <div className={"grid grid-cols-4 gap-4"}>
                <School />
                <School />
                <School />
                <School />
                <School />
                <School />
            </div>
            <Pagination />
        </div>
    )
}