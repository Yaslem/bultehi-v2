"use client"
export default function Table(
    {
        th,
        children
    }) {

    return (
        <div className={"border border-dashed rounded-lg overflow-hidden"}>
            <table className={"w-full border-collapse"}>
                <thead>
                <tr>
                    {
                        th.map((t, i) =>
                            <th key={i} className={"p-3 bg-stone-50 text-indigo-700 border-b border-r-0 text-sm font-medium text-center"}>{ t }</th>
                        )
                    }
                </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export function Td(
    {
        value,
    }) {

    return (
        <td className={"p-3 text-sm text-slate-600 bg-white font-medium text-center"}>{value}</td>
    )
}