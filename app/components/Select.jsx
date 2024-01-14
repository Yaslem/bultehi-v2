"use client"
export default function Select(
    {
        label,
        name
    }){
    return (
        <div className={"flex flex-col gap-3"}>
            <label htmlFor={name} className={"text-sm font-medium text-slate-700"}>{label}</label>
            <select
                id={name}
                name={name}
                autoComplete={name}
                className={"bg-white p-2 text-xs font-medium outline-0 focus:ring-2 focus:ring-indigo-600 border rounded-lg"}>
                <option>الأولى</option>
                <option>الثانية</option>
            </select>
        </div>
    )
}