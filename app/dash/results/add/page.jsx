"use client"
import Section from "../../components/Section";
import Title from "../../components/Title";
import ResultsType from "../../components/ResultsType";
import Button from "../../../components/Button";
import * as XLSX from "xlsx";
import {useState} from "react";
import {
    getUniqueTypes,
    getUniqueStates,
    getUniqueCounties,
    getUniqueSchools,
    getUniqueEstablishments
} from "./HandelResults";

export default function Page(){

    const [isState, setIsState] = useState(false);
    const [isCounty, setIsCounty] = useState(false);
    const [isSchool, setIsSchool] = useState(false);
    const [isType, setIsType] = useState(true);
    const [isStudent, setIsStudent] = useState(false);
    const [isEstablishment, setIsEstablishment] = useState(false);

    const [type, setType] = useState('');
    const [session, setSession] = useState('');
    const [year, setYear] = useState('');
    const [students, setStudents] = useState([]);
    const [schools, setSchools] = useState([]);
    const [counties, setCounties] = useState([]);
    const [states, setStates] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [establishments, setEstablishments] = useState([]);

    function importExcel(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const bstr = event.target.result;
            const workBook = XLSX.read(bstr, { type: 'binary', cellText: false, cellDates: true });
            const workSheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheetName];
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
            const headers = fileData[0];
            const heads = headers.map(head => ({ title: head, field: head }));
            fileData.splice(0, 1);
            convertToJson(headers, fileData);
        }
        reader.readAsBinaryString(file);
    }

    const convertToJson = (headers, data) => {
        const rows = [];
        const schools = [];
        const states = [];
        const types = [];
        const establishments = [];
        const counties = [];

        data.forEach(async row => {
            let rowData = {};
            row.forEach(async (element, index) => {
                rowData[headers[index]] = element;
            })
            rows.push({
                number: rowData.number?.toString().trim(),
                types: rowData.type?.trim(),
                birth: rowData.birth,
                result: rowData.result?.toString().trim(),
                decision: rowData.decision?.trim(),
                type: type,
                year: year,
                session: session,
                name: {
                    ar: rowData.name_ar?.trim(),
                    fr: rowData.name_ar?.trim(),
                },
                establishment: {
                    fr: rowData.establishment_ar?.trim(),
                    ar: rowData.establishment_ar?.trim(),
                },
                states: {
                    ar: rowData.state_ar?.trim(),
                    fr: rowData.state_ar?.trim(),
                },
                counties: {
                    ar: rowData.county_ar?.trim(),
                    fr: rowData.county_ar?.trim(),
                },
                schools: {
                    ar: rowData.school_ar?.trim(),
                    fr: rowData.school_ar?.trim(),
                }
            });
            states.push({
                name: {
                    ar: rowData.state_ar?.trim(),
                    fr: rowData.state_ar?.trim(),
                },
                year: year,
                type: type,
            })

            schools.push({
                name: {
                    ar: rowData.establishment_ar?.trim(),
                    fr: rowData.establishment_ar?.trim(),
                },
                states: {
                    ar: rowData.state_ar?.trim(),
                    fr: rowData.state_ar?.trim(),
                },
                counties: {
                    ar: rowData.county_ar?.trim(),
                    fr: rowData.county_ar?.trim(),
                },
                year: year,
                type: type,
            })

            establishments.push({
                name: {
                    fr: rowData.establishment_ar?.trim(),
                    ar: rowData.establishment_ar?.trim(),
                },
                states: {
                    ar: rowData.state_ar?.trim(),
                    fr: rowData.state_ar?.trim(),
                },
                counties: {
                    ar: rowData.county_ar?.trim(),
                    fr: rowData.county_ar?.trim(),
                },
                year: year,
                type: type,
            })

            types.push({
                name: rowData.type.trim(),
            })

            counties.push({
                name: {
                    ar: rowData.county_ar?.trim(),
                    fr: rowData.county_ar?.trim(),
                },
                states: {
                    ar: rowData.state_ar?.trim(),
                    fr: rowData.state_ar?.trim(),
                },
                year: year,
                type: type,
            })
            setStudents(rows);
            getType(types)
            getUniqueEstablishments(establishments);
            getUniqueCounties(counties);
            getUniqueSchools(schools);
            getUniqueStates(states);
        })

        function getType(types) {
            let newTypes = [];
            types.forEach(type => {
                switch (type.name) {
                    case 'SN':
                        newTypes.push({
                            name: {
                                ar: 'العلوم الطبيعية',
                                fr: type.name,
                            },
                        });
                        break;
                    case 'SNE':
                        newTypes.push({
                            name: {
                                ar: 'العلوم الطبيعية التجريبية',
                                fr: type.name,
                            },
                        });
                        break;
                    case 'LM':
                        newTypes.push({
                            name: {
                                ar: 'الآداب العصرية',
                                fr: type.name,
                            },
                        });
                        break;
                    case 'LME':
                        newTypes.push({
                            name: {
                                ar: 'الآداب العصرية التجريبية',
                                fr: type.name,
                            },
                        });
                        break;
                    case 'LO':
                        newTypes.push({
                            name: {
                                ar: 'الآداب الأصلية',
                                fr: type.name,

                            },
                        });
                        break;
                    case 'M':
                        newTypes.push({
                            name: {
                                ar: 'الرياضيات',
                                fr: type.name,
                            },
                        });
                        break;
                    case 'ME':
                        newTypes.push({
                            name: {
                                ar: 'الرياضيات التجريبية',
                                fr: type.name,
                            },
                        });
                        break;
                    case 'TM':
                        newTypes.push({
                            name: {
                                ar: 'التقنية',
                                fr: type.name,
                            }
                        });
                        break;
                    case 'LA':
                        newTypes.push({
                            name: {
                                ar: 'اللغات',
                                fr: type.name,
                            },
                        });
                        break;
                    case 'TS':
                        newTypes.push({
                            name: {
                                ar: 'الهندسة الكهربائية',
                                fr: type.name,
                            },
                        });
                        break;
                    default:
                        newTypes.push({
                            name: {
                                ar: '---',
                                fr: type.name,
                            },
                        });
                }
            })
            getUniqueTypes(newTypes);
        }



    }

    const handel = async (e) => {
        e.preventDefault()
    }

    return (
        <Section>
            <Title title={"إضافة نتيجة"} />
            <ResultsType />
            <form onSubmit={handel} className={"flex flex-col bg-stone-50 border border-dashed rounded-lg p-4 gap-4"}>
                <div className={"flex flex-col gap-3"}>
                    <label className={"text-sm font-medium text-slate-700"}>ملف النتائج</label>
                    <input onChange={e => importExcel(e)} className={"bg-white p-2 text-xs font-medium outline-0 focus:ring-2 focus:ring-indigo-600 border rounded-lg"} type={"file"}/>
                </div>
                <div className={"flex flex-col gap-3"}>
                    <label className={"text-sm font-medium text-slate-700"}>الدورة</label>
                    <select className={"bg-white p-2 text-xs font-medium outline-0 focus:ring-2 focus:ring-indigo-600 border rounded-lg"}>
                        <option>الأولى</option>
                        <option>الثانية</option>
                    </select>
                </div>
                <div className={"flex flex-col gap-3"}>
                    <label className={"text-sm font-medium text-slate-700"}>السنة</label>
                    <select className={"bg-white p-2 text-xs font-medium outline-0 focus:ring-2 focus:ring-indigo-600 border rounded-lg"}>
                        <option>2023</option>
                        <option>2024</option>
                    </select>
                </div>
                <Button />
            </form>
        </Section>
    )
}