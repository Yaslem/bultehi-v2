"use client"
import Title from "../../components/Title";
import Section from "../../components/Section";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {useState} from "react";
import CardSide from "./components/CardSide";
import {IoClose, IoImage} from "react-icons/io5";
import {useDispatch} from "react-redux";
import classNames from "classnames";
import {toastActions} from "../../../../redux/slices/toastSlice";
import {AddArticleSchema} from "../../../../helpers/Schemas";
import Error from "../../../components/Error";
import {createArticle, uploadImage} from "../../../../controllers/Article";
import {Editor} from "@tinymce/tinymce-react";
import {useRouter} from "next/navigation";
export default function Index(
    {
        categoriesProps,
        tagsProps
    }) {

    const router = useRouter()

    const [showTab, setShowTab] = useState(0)

    const [categories, setCategories] = useState({
        data: categoriesProps.data,
        status: categoriesProps.status,
        message: categoriesProps.message
    })

    const [tags, setTags] = useState({
        data: tagsProps.data,
        status: tagsProps.status,
        message: tagsProps.message
    })

    const [catId, setCatId] = useState()
    const [tagsIds, setTagsIds] = useState([])
    const [statusArticle, setStatus] = useState()
    const [commentStatus, setCommentStatus] = useState(true)
    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [title, setTitle] = useState()
    const [summary, setSummary] = useState()
    const [body, setBody] = useState("")

    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)



    const handelAddArticle = async () => {
        setIsLoading(true)
        dispatch(toastActions.setIsShow(false))
        const validated =  AddArticleSchema.safeParse({ title, summary, image, status: statusArticle, body, comment: commentStatus, category: catId  })
        if(validated.success) {
            setError({})
            const formData = new FormData()
            formData.append("image", image)
            const { message, status, data } = await createArticle({
                title, body, category: catId, tags: tagsIds, commentStatus, status: statusArticle, summary, formData
            })
            if(status === "success"){
                setIsLoading(false)
                dispatch(toastActions.setIsShow(true))
                dispatch(toastActions.setStatus(status))
                dispatch(toastActions.setMessage(message))

                setTimeout(() => {
                    router.push("/dash/articles")
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
            setError(validated.error.format())
        }
    }

    const image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob());
        uploadImage(formData).then((res) => {
            resolve(res.location);
        })
    });

    return (
        <Section>
            <div className={"flex items-center justify-between gap-4"}>
                <Title title={"إضافة مقالة"} />
                <Button
                    onClick={() => handelAddArticle()}
                    title={"نشر المقالة"}
                    isOnlyIcon={true}
                    isLoading={isLoading} />
            </div>
            <section className={"flex gap-2 w-full"}>
                <div className={"flex-grow rounded-lg flex flex-col gap-3"}>
                    <div className={"flex flex-col gap-2"}>
                        <input
                            className={"text-lg border bg-stone-50 rounded-lg focus:border-b-indigo-600 p-2 border-b-2 text-slate-700 font-semibold w-full outline-none"}
                            type={"text"}
                            placeholder={"اكتب عنوان المقال"}
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
                                plugins: 'anchor autolink directionality charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link image imageupload media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | ltr rtl',
                                language_url: "/lang/tinymce/ar.js",
                                language: "ar",
                                directionality: "rtl",
                                images_upload_handler: image_upload_handler,
                                image_caption: true,
                                image_title: true,

                            }}
                            value={body}
                        />
                        {
                            error?.body && <div className={"mx-2 mb-2"}><Error message={error?.body._errors.join()} /></div>
                        }
                    </div>
                </div>
                <div className={"border bg-stone-50 rounded-lg p-2 flex flex-col gap-3 w-52 h-fit"}>
                    <CardSide title={"حالة المقالة"} showTab={showTab} onClick={() => setShowTab(0)} number={0}>
                        {
                            showTab === 0 &&
                            <>
                                <hr />
                                <ul className={"flex max-h-[190px] overflow-y-auto flex-col gap-3"}>
                                    <li className={"text-xs bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 hover:text-indigo-500 cursor-pointer"}>
                                        <label htmlFor={"public"} className={"flex-grow cursor-pointer"}>منشورة</label>
                                        <input
                                            id={"public"}
                                            name={"status"}
                                            value={"PUBLIC"}
                                            checked={statusArticle === "PUBLIC"}
                                            type={"radio"}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                    </li>
                                    <li className={"text-xs bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 hover:text-indigo-500 cursor-pointer"}>
                                        <label htmlFor={"hidden"} className={"flex-grow cursor-pointer"}>مخفية</label>
                                        <input
                                            id={"hidden"}
                                            name={"status"}
                                            value={"HIDDEN"}
                                            type={"radio"}
                                            checked={statusArticle === "HIDDEN"}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                    </li>
                                </ul>
                            </>
                        }
                        {
                            error?.status && <Error message={error?.status._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"}/>
                    <CardSide title={"التصنيفات"} showTab={showTab} onClick={() => setShowTab(1)} number={1}>
                        {
                            showTab === 1 &&
                            <>
                                <hr />
                                {
                                    categories.status === "success" &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            name={"search"}
                                            type={"text"} placeholder={"اكتب اسم التصنيف"}
                                            onChange={(e) => {
                                                setCategories({
                                                    data: categoriesProps.data.filter((word) => word.name.indexOf(e.target.value) > -1),
                                                    status: "success"
                                                })
                                            }}
                                        />
                                        <ul className={"flex max-h-[190px] overflow-y-auto flex-col gap-3"}>
                                            {
                                                categories.data.map((category, index) =>
                                                    <li key={index} className={"text-xs bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 hover:text-indigo-500 cursor-pointer"}>
                                                        <label htmlFor={category.id} className={"flex-grow cursor-pointer"}>{ category.name }</label>
                                                        <input
                                                            id={category.id}
                                                            name={"category"}
                                                            value={category.id}
                                                            checked={catId == category.id}
                                                            type={"radio"}
                                                            onChange={(e) => setCatId(e.target.value)}
                                                        />
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                }
                                {
                                    categories.status === "error" &&
                                    <p className={"text-sm w-full text-center"}>{ categories.message }</p>
                                }
                            </>
                        }
                        {
                            error?.category && <Error message={error?.category._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"}/>
                    <CardSide title={"الوسوم"} showTab={showTab} onClick={() => setShowTab(2)} number={2}>
                        {
                            showTab === 2 &&
                            <>
                                <hr />
                                {
                                    tags.status === "success" &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            name={"search"}
                                            type={"text"} placeholder={"اكتب اسم الوسم"}
                                            onChange={(e) => {
                                                setTags({
                                                    data: tagsProps.data.filter((word) => word.name.indexOf(e.target.value) > -1),
                                                    status: "success"
                                                })
                                            }}
                                        />
                                        <ul className={"flex max-h-[190px] overflow-y-auto flex-col gap-3"}>
                                            {
                                                tags.data.map((tag, index) =>
                                                    <li key={index} className={"text-xs bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 hover:text-indigo-500 cursor-pointer"}>
                                                        <label htmlFor={tag.id} className={"flex-grow cursor-pointer"}>{ tag.name }</label>
                                                        <input
                                                            id={tag.id}
                                                            name={"tag"}
                                                            value={tag.id}
                                                            type={"checkbox"}
                                                            checked={tagsIds.includes(tag.id)}
                                                            onChange={(e) => {
                                                                if(e.target.checked){
                                                                    if (!tagsIds.includes(tag.id)){
                                                                        setTagsIds((prevTags) => [
                                                                            ...prevTags,
                                                                            tag.id,
                                                                        ])
                                                                    }
                                                                }else {
                                                                    setTagsIds(tagsIds.filter(tagFilter => tagFilter !== tag.id))
                                                                }
                                                            }}
                                                        />
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                }
                                {
                                    tags.status === "error" &&
                                    <p className={"text-sm w-full text-center"}>{ tags.message }</p>
                                }
                            </>
                        }
                        {
                            error?.tag && <Error message={error?.tag._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"}/>
                    <CardSide title={"صورة المقالة"} showTab={showTab} onClick={() => setShowTab(3)} number={3}>
                        {
                            showTab === 3 &&
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
                                                if(e.target.files){
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
                    </CardSide>
                    <hr className={"border border-dashed"}/>
                    <CardSide title={"المقتطف"} showTab={showTab} onClick={() => setShowTab(4)} number={4}>
                        {
                            showTab === 4 &&
                            <div className={"relative"}>
                                <textarea
                                    name={"summary"}
                                    placeholder={"اكتب وصفا قصيرا عن المقالة"}
                                    defaultValue={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    className={"w-full h-36 border rounded-lg outline-none p-2 placeholder:text-xs placeholder:text-slate-500"}></textarea>
                            </div>
                        }
                        {
                            error?.summary && <Error message={error?.summary._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"}/>
                    <CardSide title={"التعليقات"} showTab={showTab} onClick={() => setShowTab(5)} number={5}>
                        {
                            showTab === 5 &&
                            <>
                                <hr/>
                                <div className={"flex items-center gap-2 justify-between"}>
                                    <label htmlFor={"comments"} className={"cursor-pointer flex-grow"}>
                                        مسموح
                                    </label>
                                    <input
                                        className={"comments"}
                                        id={"comments"}
                                        checked={commentStatus}
                                        onChange={(e) => {
                                            if(e.target.checked){
                                                setCommentStatus(true)
                                            }else {
                                                setCommentStatus(false)
                                            }
                                        }}
                                        type={"checkbox"}/>
                                </div>
                            </>
                        }
                        {
                            error?.comment && <Error message={error?.comment._errors.join()} />
                        }
                    </CardSide>
                </div>
            </section>
        </Section>
    )
}