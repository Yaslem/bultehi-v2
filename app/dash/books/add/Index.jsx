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
import { AddBookSchema } from "../../../../helpers/Schemas";
import Error from "../../../auth/components/Error";
import { Editor } from "@tinymce/tinymce-react";
import {createBook} from "../../../../controllers/Book";

export default function Index(
    {
        categoriesProps,
        authorsProps,
        publishersProps,
        tagsProps
    }) {

    const [showTab, setShowTab] = useState(0)
    const [loading, setLoading] = useState(true)

    const [categories, setCategories] = useState({
        data: categoriesProps.data,
        status: categoriesProps.status,
        message: categoriesProps.message
    })

    const [authors, setAuthors] = useState({
        data: authorsProps.data,
        status: authorsProps.status,
        message: authorsProps.message
    })

    const [publishers, setPublishers] = useState({
        data: publishersProps.data,
        status: publishersProps.status,
        message: publishersProps.message
    })

    const [tags, setTags] = useState({
        data: tagsProps.data,
        status: tagsProps.status,
        message: tagsProps.message
    })

    const [catId, setCatId] = useState()
    const [authorsIds, setAuthorsIds] = useState([])
    const [publisherId, setPublisherId] = useState()
    const [tagsIds, setTagsIds] = useState([])
    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [title, setTitle] = useState()
    const [isFree, setIsFree] = useState(true)
    const [price, setPrice] = useState()
    const [numberOfPages, setNumberOfPages] = useState()
    const [numberOfCopies, setNumberOfCopies] = useState()
    const [publishYear, setPublishYear] = useState()
    const [body, setBody] = useState()

    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [errorSome, setErrorSome] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handelAddBook = async () => {
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

        if (!isFree && numberOfCopies === undefined || numberOfCopies?.length === 0 || parseInt(numberOfCopies) < 1) {
            setErrorSome((prev) => {
                return {
                    ...prev,
                    numberOfCopies: {
                        message: "عدد النسخ مطلوب"
                    }
                }
            })
        } else {
            delete errorSome.numberOfCopies
        }

        if (authorsIds.length === 0) {
            setErrorSome((prev) => {
                return {
                    ...prev,
                    authors: {
                        message: "المؤلف مطلوب"
                    },
                }
            })
        } else {
            delete errorSome.authors
        }

        const validated = AddBookSchema.safeParse(
            {
                title, numberOfPages: parseInt(numberOfPages), image, publishYear: new Date(publishYear),
                publisher: publisherId,
                category: catId,
                description: body,
            })

        if (validated.success) {
            setError({})
            console.log(typeof parseInt(numberOfCopies))
            if (Object.keys(errorSome).length === 0) {
                const formData = new FormData()
                formData.append("image", image)
                const { message, status, data } = await createBook({ title, numberOfPages, numberOfCopies, publishYear, price, isFree, description: body, categoryId: catId, tags: tagsIds, publisherId, authors: authorsIds, formData })
                if(status === "success"){
                    setIsLoading(false)
                    dispatch(toastActions.setIsShow(true))
                    dispatch(toastActions.setStatus(status))
                    dispatch(toastActions.setMessage(message))
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
                <Title title={"إضافة كتاب"} />
                <Button
                    onClick={() => handelAddBook()}
                    title={"نشر الكتاب"}
                    isOnlyIcon={true}
                    isLoading={isLoading} />
            </div>
            <section className={"flex gap-2 w-full"}>
                <div className={"flex-grow rounded-lg flex flex-col gap-3"}>
                    <div className={"flex flex-col gap-2"}>
                        <input
                            className={"text-lg border bg-stone-50 rounded-lg focus:border-b-indigo-600 p-2 border-b-2 text-slate-700 font-semibold w-full outline-none"}
                            type={"text"}
                            placeholder={"اكتب اسم الكتاب"}
                            defaultValue={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {
                            error?.title && <Error message={error?.title._errors.join()} />
                        }
                    </div>
                    <div className={"border rounded-lg flex flex-col gap-2"}>
                        <Editor
                            apiKey='1pwbld79ntpeigxurq9pxzrgu5oi3683qsvfk0lc7essw9d8'
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
                            <section className={"flex flex-col gap-3"}>
                                <hr />
                                <div className={"flex flex-col gap-2"}>
                                    <Input
                                        label={"عدد الصفحات"}
                                        name={"numberOfPages"}
                                        type={"number"}
                                        minLength={1}
                                        defaultValue={numberOfPages}
                                        placeholder={"اكتب عدد الصفحات"}
                                        onChange={(e) => setNumberOfPages(e.target.value)}
                                    />
                                    {
                                        error?.numberOfPages && <Error message={error?.numberOfPages._errors.join()} />
                                    }
                                </div>
                                <hr />
                                <div className={"flex flex-col gap-2"}>
                                    <Input
                                        label={"سنة النشر"}
                                        name={"publishYear"}
                                        type={"date"}
                                        placeholder={"سنة النشر"}
                                        defaultValue={publishYear}
                                        onChange={(e) => setPublishYear(e.target.value)}
                                    />
                                    {
                                        error?.publishYear && <Error message={error?.publishYear._errors.join()} />
                                    }
                                </div>
                                <hr />
                                <div className={"flex flex-col gap-2"}>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name={"isFree"}
                                            value={""}
                                            checked={isFree}
                                            className="sr-only peer"
                                            onChange={(e) => {
                                                setIsFree(e.target.checked)
                                                if (e.target.checked) setErrorSome({})
                                            }}
                                        />
                                        <div
                                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                        <span className="ms-3 text-sm font-medium dark:text-gray-300">
                                            {isFree ? "الكتاب مجاني" : "الكتاب مدفوع"}
                                        </span>
                                    </label>
                                    {
                                        !isFree &&
                                        <div className={"flex flex-col gap-2"}>
                                            <div className={"flex flex-col gap-2"}>
                                                <Input
                                                    label={"السعر"}
                                                    name={"price"}
                                                    type={"number"}
                                                    minLength={1}
                                                    defaultValue={price}
                                                    placeholder={"اكتب سعر الكتاب بالأوقية"}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                                {
                                                    errorSome.price && <Error message={errorSome.price.message} />
                                                }
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Input
                                                    label={"عدد النسخ"}
                                                    name={"numberOfCopies"}
                                                    type={"number"}
                                                    minLength={1}
                                                    defaultValue={numberOfCopies}
                                                    placeholder={"اكتب عدد نسخ الكتاب"}
                                                    onChange={(e) => setNumberOfCopies(e.target.value)}
                                                />
                                                {
                                                    errorSome.numberOfCopies && <Error message={errorSome.numberOfCopies.message} />
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </section>
                        }
                    </CardSide>
                    <hr className={"border border-dashed"} />
                    <CardSide title={"الناشر"} showTab={showTab} onClick={() => setShowTab(1)} number={1}>
                        {
                            showTab === 1 &&
                            <>
                                <hr />
                                {
                                    publishers.status === "success" &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            name={"search"}
                                            type={"text"}
                                            placeholder={"اكتب اسم الناشر"}
                                            onChange={(e) => {
                                                setPublishers({
                                                    data: publishersProps.data.filter((word) => word.name.indexOf(e.target.value) > -1),
                                                    status: "success"
                                                })
                                            }}
                                        />
                                        <ul className={"flex max-h-[190px] overflow-y-auto flex-col gap-3"}>
                                            {
                                                publishers.data.map((publisher, index) =>
                                                    <li key={index} className={"text-xs bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 hover:text-indigo-500 cursor-pointer"}>
                                                        <label htmlFor={publisher.id} className={"flex-grow cursor-pointer"}>{publisher.name}</label>
                                                        <input
                                                            id={publisher.id}
                                                            name={"publisher"}
                                                            value={publisher.id}
                                                            checked={publisherId == publisher.id}
                                                            type={"radio"}
                                                            onChange={(e) => setPublisherId(e.target.value)}
                                                        />
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                }
                                {
                                    publishers.status === "error" &&
                                    <p className={"text-sm w-full text-center"}>{publishers.message}</p>
                                }
                            </>
                        }
                        {
                            error?.publisher && <Error message={error?.publisher._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"} />
                    <CardSide title={"المؤلف"} showTab={showTab} onClick={() => setShowTab(2)} number={2}>
                        {
                            showTab === 2 &&
                            <>
                                <hr />
                                {
                                    authors.status === "success" &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            name={"author"}
                                            type={"text"}
                                            placeholder={"اكتب اسم المؤلف"}
                                            onChange={(e) => {
                                                setAuthors({
                                                    data: authorsProps.data.filter((word) => word.name.indexOf(e.target.value) > -1),
                                                    status: "success"
                                                })
                                            }}
                                        />
                                        <ul className={"flex max-h-[190px] overflow-y-auto flex-col gap-3"}>
                                            {
                                                authors.data.map((author, index) =>
                                                    <li key={index} className={"text-xs bg-stone-50 rounded-lg p-2 flex items-center justify-between gap-2 hover:text-indigo-500 cursor-pointer"}>
                                                        <label htmlFor={author.id} className={"flex-grow cursor-pointer"}>{author.name}</label>
                                                        <input
                                                            id={author.id}
                                                            name={"author"}
                                                            value={author.id}
                                                            checked={authorsIds.includes(author.id)}
                                                            type={"checkbox"}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    if (!authorsIds.includes(author.id)) {
                                                                        setAuthorsIds((prevAuthors) => [
                                                                            ...prevAuthors,
                                                                            author.id,
                                                                        ])
                                                                    }
                                                                } else {
                                                                    setAuthorsIds(authorsIds.filter(authorFilter => authorFilter !== author.id))
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
                                    authors.status === "error" &&
                                    <p className={"text-sm w-full text-center"}>{authors.message}</p>
                                }
                            </>
                        }
                        {
                            errorSome?.authors && <Error message={errorSome?.authors.message} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"} />
                    <CardSide title={"التصنيفات"} showTab={showTab} onClick={() => setShowTab(3)} number={3}>
                        {
                            showTab === 3 &&
                            <>
                                <hr />
                                {
                                    categories.status === "success" &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            name={"category"}
                                            type={"text"}
                                            placeholder={"اكتب اسم التصنيف"}
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
                                                        <label htmlFor={category.id} className={"flex-grow cursor-pointer"}>{category.name}</label>
                                                        <input
                                                            id={category.id}
                                                            name={"category"}
                                                            value={category.id}
                                                            checked={catId == category.id}
                                                            type={"radio"}
                                                            onChange={(e) => {
                                                                setCatId(e.target.value)
                                                            }}
                                                        />
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                }
                                {
                                    categories.status === "error" &&
                                    <p className={"text-sm w-full text-center"}>{categories.message}</p>
                                }
                            </>
                        }
                        {
                            error?.category && <Error message={error?.category._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"} />
                    <CardSide title={"الوسوم"} showTab={showTab} onClick={() => setShowTab(4)} number={4}>
                        {
                            showTab === 4 &&
                            <>
                                <hr />
                                {
                                    tags.status === "success" &&
                                    <div className={"flex flex-col gap-2"}>
                                        <Input
                                            name={"tags"}
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
                                                        <label htmlFor={tag.id} className={"flex-grow cursor-pointer"}>{tag.name}</label>
                                                        <input
                                                            id={tag.id}
                                                            name={"tag"}
                                                            value={tag.id}
                                                            checked={tagsIds.includes(tag.id)}
                                                            type={"checkbox"}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    if (!tagsIds.includes(tag.id)) {
                                                                        setTagsIds((prevTags) => [
                                                                            ...prevTags,
                                                                            tag.id,
                                                                        ])
                                                                    }
                                                                } else {
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
                                    <p className={"text-sm w-full text-center"}>{tags.message}</p>
                                }
                            </>
                        }
                        {
                            error?.tags && <Error message={error?.tags._errors.join()} />
                        }
                    </CardSide>
                    <hr className={"border border-dashed"} />
                    <CardSide title={"صورة الكتاب"} showTab={showTab} onClick={() => setShowTab(5)} number={5}>
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