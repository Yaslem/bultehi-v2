"use client"
import Section from "../../dash/components/Section";
import Table, {Td, Tr} from "../../components/Table";
import Nothing from "../../components/Nothing";
import Link from "next/link";
import {generateSlug, getNumberFormat} from "../../../helpers/Global";

export default function Results({results, status}) {
    return (
        <Section>
            {
                status === "success" &&
                <Table th={["العنوان", "السنة", "النوع", "الناجحون", "الراسبون",  "الدورة", "الإجمالي"]}>
                    {
                        results.map((result, index) =>
                            <Tr key={index}>
                                <Td value={
                                    <Link href={generateSlug({slug: result.title, id: result.id})} className={"text-indigo-700 hover:text-indigo-600"}>{result.title}</Link>
                                } />
                                <Td value={result.year.name} />
                                <Td value={result.type.name} />
                                <Td value={getNumberFormat(result.counts.admis)} />
                                <Td value={getNumberFormat(result.counts.ajourne)} />
                                <Td value={getNumberFormat(result.counts.sessionnaire)} />
                                <Td value={getNumberFormat(result._count.students)} />
                            </Tr>
                        )
                    }
                </Table>
            }
            {status === "error" && <Nothing title={"عفوا 😔"} desc={"المعذرة منك، لم نتمكن من العثور على نتائج. (:"}/>}
        </Section>
    )
}