export default function Layout({children}){
    return (
        <section className={"flex flex-col mb-4 gap-y-12"}>
            <div className={"bg-amber-50 border border-t-0 gap-4 p-2 flex flex-col items-center justify-center"}>
                <h1 className={"text-2xl text-gray-700 font-bold"}>التعليم الأساسي</h1>
                <p className={"text-xs text-gray-600 font-medium"}>يحتوي هذا القسم على كتب مدرسية ومقالات علمية، ونتائج مسابقة وطنية.</p>
            </div>
            {children}
        </section>
    )
}