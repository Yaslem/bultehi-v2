import Section from "../../components/Section";
import Title from "../../components/Title";
import {getSessions, getTypes, getUnknown, getYears} from "../../../../controllers/ResultSettings";
import Settings from "./index";

export default async function Page() {
    const { data: types, status: statusTypes, message: messageTypes } = await getTypes()
    const { data: years, status: statusYears, message: messageYears } = await getYears()
    const { data: unknown, status: statusUnknown, message: messageUnknown } = await getUnknown()
    const { data: sessions, status: statusSessions, message: messageSessions } = await getSessions()
    return (
        <Section>
            <Title title={"إعدادات النتائج"} />
            <div className={"grid grid-cols-2 gap-4"}>
                <Settings data={types} status={statusTypes} message={messageTypes} title={"الأنواع"} model={"type"} placeholder={"اكتب اسم النوع"} />
                <Settings data={years} status={statusYears} message={messageYears} title={"السنوات"} model={"year"} placeholder={"اكتب اسم السنة"} />
                <Settings data={sessions} status={statusSessions} message={messageSessions} title={"الدورات"} model={"session"} placeholder={"اكتب اسم الدورة"} />
                <Settings data={unknown} status={statusUnknown} message={messageUnknown} title={"القيمة الافتراضية"} model={"unknown"} placeholder={"اكتب اسم القيمة الافتراضية"} />
            </div>
        </Section>
    )
}