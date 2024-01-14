import Section from "../../components/Section";
import Title from "../../components/Title";
import ResultSetting from "./components/ResultSettings";
import {getSessions, getTypes, getYears} from "../../../../controllers/ResultSettings";

export default async function Page() {
    const { data: types, status: statusTypes, message: messageTypes } = await getTypes()
    const { data: years, status: statusYears, message: messageYears } = await getYears()
    const { data: sessions, status: statusSessions, message: messageSessions } = await getSessions()
    return (
        <Section>
            <Title title={"النتائج"} />
            <div className={"grid grid-cols-2 gap-4"}>
                <ResultSetting data={types} status={statusTypes} message={messageTypes} title={"الأنواع"} model={"type"} placeholder={"اكتب اسم النوع"} />
                <ResultSetting data={years} status={statusYears} message={messageYears} title={"السنوات"} model={"year"} placeholder={"اكتب اسم السنة"} />
                <ResultSetting data={sessions} status={statusSessions} message={messageSessions} title={"الدورات"} model={"session"} placeholder={"اكتب اسم الدورة"} />
            </div>
        </Section>
    )
}