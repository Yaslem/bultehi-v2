import Image from 'next/image'
import Link from "next/link";
import LinkBtn from "@/app/components/Link";

export default function Home() {
  return (
    <section className={"flex gap-4 justify-between"}>
      <div className={"flex p-4 justify-center flex-col gap-4 w-1/2 bg-slate-50 border-t-0 border rounded-bl-[100px]"}>
        <h1 className={"text-2xl leading-loose text-gray-700 text-justify"}>بلتيهي هو موقع إلكتورني تعليمي، يهتم بالجانب التعليمي في الجمهورية الإسلامية الموريتانية، ويعرض نتائج المسابقات الوطنية، ويقدم خدمات تساعد في نجاح العملية التعلمية.</h1>
          <LinkBtn title={"عرض المزيد"} />
      </div>
      <div className={"grid grid-cols-2 p-4 gap-4 w-1/2"}>
          <Image className={"w-full h-full rounded-full object-cover drop-shadow-md shadow-xl"} width={100} height={100} src={"/files/images/1.jpg"} alt={""} />
          <Image className={"w-full h-full rounded-lg object-cover shadow-xl drop-shadow-md"} width={100} height={100} src={"/files/images/2.jpg"} alt={""} />
          <Image className={"w-full h-full rounded-lg object-cover shadow-xl drop-shadow-md"} width={100} height={100} src={"/files/images/3.jpg"} alt={""} />
          <Image className={"w-full h-full rounded-lg rounded-tr-[100px] object-cover shadow-xl drop-shadow-md"} width={100} height={100} src={"/files/images/4.jpg"} alt={""} />
      </div>
    </section>
  )
}
