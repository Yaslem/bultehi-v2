"use client"
import Title from "../../components/Title";
import Section from "../../components/Section";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useRef, useState } from "react";
import CardSide from "./components/CardSide";
import { IoClose, IoImage } from "react-icons/io5";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { toastActions } from "../../../../redux/slices/toastSlice";
import {AddBookSchema, AddGrantSchema} from "../../../../helpers/Schemas";
import Error from "../../../components/Error";
import { Editor } from "@tinymce/tinymce-react";
import {createBook} from "../../../../controllers/Book";
import {useRouter} from "next/navigation";
import {createGrant, updateGrantPublished} from "../../../../controllers/Grant";
import {DEFAULT_IMAGE_FOR_GRANT} from "../../../../helpers/Global";
import { BsShieldFillCheck } from "react-icons/bs";
import {Switch} from "../../../components/ActionsIcon";


export default function Index({collegesProps, phasesProps, specializationsProps}) {

    const [showTab, setShowTab] = useState(0)
    const router = useRouter()

    const [colleges, setColleges] = useState({
        data: collegesProps.data,
        status: collegesProps.status,
        message: collegesProps.message
    })

    const [phases, setPhases] = useState({
        data: phasesProps.data,
        status: phasesProps.status,
        message: phasesProps.message
    })

    const [specializations, setSpecializations] = useState({
        data: specializationsProps.data,
        status: specializationsProps.status,
        message: specializationsProps.message
    })

    const [college, setCollege] = useState()
    const [phase, setPhase] = useState()
    const [specialization, setSpecialization] = useState()
    const [country, setCountry] = useState()
    const [image, setImage] = useState(DEFAULT_IMAGE_FOR_GRANT)
    const [imageUrl, setImageUrl] = useState()
    const [title, setTitle] = useState()
    const [isFree, setIsFree] = useState(true)
    const [price, setPrice] = useState(0)
    const [body, setBody] = useState()

    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [errorSome, setErrorSome] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handelAddGrant = async () => {
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))

        if (!isFree && price === undefined || price?.length === 0 || parseInt(price) < 1) {
            setErrorSome((prev) => {
                return {
                    ...prev,
                    price: {
                        message: "السعر مطلوب"
                    },
                }
            })
        } else {
            delete errorSome.price
        }

        const validated = AddGrantSchema.safeParse(
            {
                title, phase, college, country, specialization, isFree,
                description: body,
            })

        if (validated.success) {
            setError({})
            if (Object.keys(errorSome).length === 0) {
                const formData = new FormData()
                formData.append("college", college)
                formData.append("phase", phase)
                formData.append("specialization", specialization)
                formData.append("country", country)
                formData.append("image", image)
                formData.append("title", title)
                formData.append("isFree", isFree)
                formData.append("price", price)
                formData.append("description", body)
                const { message, status, data } = await createGrant(formData)
                if(status === "success"){
                    setIsLoading(false)
                    dispatch(toastActions.setIsShow(true))
                    dispatch(toastActions.setStatus(status))
                    dispatch(toastActions.setMessage(message))

                    setTimeout(() => {
                        router.push("/dash/grants")
                    }, 3000)

                }else {
                    dispatch(toastActions.setIsShow(true))
                    dispatch(toastActions.setStatus(status))
                    dispatch(toastActions.setMessage(message))
                    setIsLoading(false)
                    setError(data)
                }
            } else {
                setIsLoading(false)
            }
        } else {
            setIsLoading(false)
            setError(validated.error.format())
        }
    }

    return (
        <Section>
            <div className={"flex items-center justify-between gap-4"}>
                <Title title={"إضافة منحة"} />
                <Button
                    onClick={() => handelAddGrant()}
                    title={"نشر المنحة"}
                    isOnlyIcon={true}
                    isLoading={isLoading} />
            </div>
            <section className={"flex gap-2 w-full"}>
                <div className={"flex-grow rounded-lg flex flex-col gap-3"}>
                    <div className={"flex flex-col gap-2"}>
                        <input
                            className={"text-lg border bg-white rounded-lg focus:border-b-indigo-600 p-2 border-b-2 text-slate-700 font-semibold w-full outline-none"}
                            type={"text"}
                            placeholder={"اكتب اسم المنحة"}
                            defaultValue={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {
                            error?.title && <Error message={error?.title._errors.join()} />
                        }
                    </div>
                    <div className={"border rounded-lg flex flex-col gap-2"}>
                        <Editor
                            apiKey={process.env.EDITOR_API_KEY}
                            onEditorChange={(newValue, editor) => {
                                setBody(newValue);
                            }}
                            init={{
                                plugins: 'anchor autolink directionality charmap codesample emoticons link lists searchreplace table visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | ltr rtl',
                                language_url: "/lang/tinymce/ar.js",
                                language: "ar",
                                directionality: "rtl",

                            }}
                            value={body}
                        />
                        {
                            error?.description && <div className={"mx-2 mb-2"}><Error message={error?.description._errors.join()} /></div>
                        }
                    </div>
                </div>
                <div className={"border bg-stone-50 rounded-lg p-2 flex flex-col gap-3 w-52 h-fit"}>
                    <CardSide title={"المعلومات"} showTab={showTab} onClick={() => setShowTab(0)} number={0}>
                        {
                            showTab === 0 &&
                            <>
                                <Input
                                    label={"الدولة"}
                                    defaultValue={country}
                                    isError={error?.country}
                                    name={"country"}
                                    type={"text"}
                                    placeholder={"اكتب اسم الدولة"}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                                <Switch title={"منحة مجانية"} isTitle={true} name={"isFree"} value={isFree} checked={isFree} onChange={ async (e) => setIsFree(e.target.checked)} />
                                {
                                    !isFree &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            label={"السعر"}
                                            name={"price"}
                                            type={"number"}
                                            minLength={1}
                                            defaultValue={price}
                                            placeholder={"اكتب سعر المنحة بالأوقية"}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        {
                                            errorSome.price && <Error message={errorSome.price.message}/>
                                        }
                                    </div>
                                }
                            </>
                        }
                        {
                            error?.country && <Error message={error?.country._errors.join()}/>
                        }
                    </CardSide>
                    <hr className={"border border-dashed"}/>
                    <CardSide title={"المرحلة"} showTab={showTab} onClick={() => setShowTab(6)} number={6}>
                        {
                            showTab === 6 &&
                            <>
                                <hr/>
                                {
                                    phases.status === "success" &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            name={"search"}
                                            type={"text"}
                                            placeholder={"اكتب اسم المرحلة"}
                                            onChange={(e) => {
                                                setPhases({
                                                    data: phasesProps.data.filter((word) => word.name.indexOf(e.target.value) > -1),
                                                    status: "success"
                                                })
                                            }}
                                        />
                                        <ul className={"flex max-h-[190px] overflow-y-auto flex-col gap-3"}>
                                            {
                                                phases.data.map((phaseProp, index) =>
                                                    <li key={index} className={"text-xs bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 hover:text-indigo-500 cursor-pointer"}>
                                                        <label htmlFor={phaseProp.id} className={"flex-grow cursor-pointer"}>{phaseProp.name}</label>
                                                        <input
                                                            id={phaseProp.id}
                                                            name={"phase"}
                                                            value={phaseProp.id}
                                                            checked={phase == phaseProp.id}
                                                            type={"radio"}
                                                            onChange={(e) => setPhase(Number(e.target.value))}
                                                        />
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                }
                                {
                                    phases.status === "error" &&
                                    <p className={"text-sm w-full text-center"}>{phases.message}</p>
                                }
                            </>
                        }
                        {
                            error?.phase && <Error message={error?.phase._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"} />
                    <CardSide title={"الكلية"} showTab={showTab} onClick={() => setShowTab(1)} number={1}>
                        {
                            showTab === 1 &&
                            <>
                                <hr/>
                                {
                                    colleges.status === "success" &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            name={"search"}
                                            type={"text"}
                                            placeholder={"اكتب اسم الكلية"}
                                            onChange={(e) => {
                                                setColleges({
                                                    data: collegesProps.data.filter((word) => word.name.indexOf(e.target.value) > -1),
                                                    status: "success"
                                                })
                                            }}
                                        />
                                        <ul className={"flex max-h-[190px] overflow-y-auto flex-col gap-3"}>
                                            {
                                                colleges.data.map((collegeProp, index) =>
                                                    <li key={index} className={"text-xs bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 hover:text-indigo-500 cursor-pointer"}>
                                                        <label htmlFor={collegeProp.id} className={"flex-grow cursor-pointer"}>{collegeProp.name}</label>
                                                        <input
                                                            id={collegeProp.id}
                                                            name={"college"}
                                                            value={collegeProp.id}
                                                            checked={college == collegeProp.id}
                                                            type={"radio"}
                                                            onChange={(e) => setCollege(Number(e.target.value))}
                                                        />
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                }
                                {
                                    colleges.status === "error" &&
                                    <p className={"text-sm w-full text-center"}>{colleges.message}</p>
                                }
                            </>
                        }
                        {
                            error?.college && <Error message={error?.college._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"} />
                    <CardSide title={"التخصص"} showTab={showTab} onClick={() => setShowTab(3)} number={3}>
                        {
                            showTab === 3 &&
                            <>
                                <hr />
                                {
                                    specializations.status === "success" &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            name={"specialization"}
                                            type={"text"}
                                            placeholder={"اكتب اسم التخصص"}
                                            onChange={(e) => {
                                                setSpecializations({
                                                    data: specializationsProps.data.filter((word) => word.name.indexOf(e.target.value) > -1),
                                                    status: "success"
                                                })
                                            }}
                                        />
                                        <ul className={"flex max-h-[190px] overflow-y-auto flex-col gap-3"}>
                                            {
                                                specializations.data.map((specializationProp, index) =>
                                                    <li key={index} className={"text-xs bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 hover:text-indigo-500 cursor-pointer"}>
                                                        <label htmlFor={specializationProp.id} className={"flex-grow cursor-pointer"}>{specializationProp.name}</label>
                                                        <input
                                                            id={specializationProp.id}
                                                            name={"specialization"}
                                                            value={specializationProp.id}
                                                            checked={specialization == specializationProp.id}
                                                            type={"radio"}
                                                            onChange={(e) => {
                                                                setSpecialization(Number(e.target.value))
                                                            }}
                                                        />
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                }
                                {
                                    specializations.status === "error" &&
                                    <p className={"text-sm w-full text-center"}>{specializations.message}</p>
                                }
                            </>
                        }
                        {
                            error?.specialization && <Error message={error?.specialization._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"} />
                    <CardSide title={"صورة المنحة"} showTab={showTab} onClick={() => setShowTab(5)} number={5}>
                        {
                            showTab === 5 &&
                            <div className={"relative"}>
                                {
                                    image === undefined &&
                                    <>
                                        <label htmlFor={"image"} className={"cursor-pointer flex items-center justify-center p-2 w-full h-28 border border-dashed rounded-lg hover:border-indigo-600"}>
                                            <IoImage className={"text-7xl"} />
                                        </label>
                                        <input
                                            className={"hidden"}
                                            id={"image"}
                                            type={"file"}
                                            accept={"image/*"}
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setImage(e.target.files[0])
                                                    setImageUrl(URL.createObjectURL(e.target.files[0]))
                                                }
                                            }}
                                        />
                                    </>
                                }
                                <div className={classNames({
                                    "h-28 border border-dashed rounded-lg relative overflow-hidden": true,
                                    "hidden": image === undefined
                                })}>
                                    <span className={"w-8 p-1 h-8 rounded-lg bg-white cursor-pointer border hover:border-red-600 absolute top-1.5 left-1.5 flex items-center justify-center"}>
                                        <IoClose
                                            onClick={() => setImage(undefined)}
                                            className={"text-2xl hover:text-red-600"} />
                                    </span>
                                    <img src={imageUrl} className={"w-full object-cover h-full"} />
                                </div>
                            </div>
                        }
                        {
                            error?.image && <Error message={error?.image._errors.join()} />
                        }
                    </CardSide>
                </div>
            </section>
        </Section>
    )
}