import Section from "../dash/components/Section";
import TitleCategory from "../components/TitleCategory";
import Breadcrumb from "../components/Breadcrumb";

export default function Layout({children}){
    return (
        <section className={"flex flex-col mb-4 gap-y-4"}>
            <TitleCategory title={"التعليم الإعدادي"} des={"يحتوي هذا القسم على كتب مدرسية ومقالات علمية، ونتائج مسابقة وطنية."} />
            <Section>
                <Breadcrumb slug={2} />
                {children}
            </Section>
        </section>
    )
}