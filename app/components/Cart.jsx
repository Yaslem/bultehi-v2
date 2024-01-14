"use client"
import {IoClose, IoCloudDownloadSharp} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../redux/slices/cartSlice";
import Table, {Td} from "./Table";
import Image from "next/image";
import Error from "../auth/components/Error";
import classNames from "classnames";
import {DeleteIcon} from "./ActionsIcon";
import LinkBtn from "./Link";
export default function Cart(){
    const dispatch = useDispatch()
    const items = useSelector(state => state.cart.items)
    const priceAll = useSelector(state => state.cart.priceAll)
    const error = useSelector(state => state.cart.error)
    console.log(error)
    return (
        <section className={"fixed z-50 w-full h-full flex top-0 left-0"}>
            <div
                style={{
                    boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                }}
                className={"w-[400px] bg-stone-50 transition-all border-r-2 border-black/5 flex flex-col gap-4 h-screen overflow-y-auto p-4 ml-auto"}>
                <div className={"flex items-center justify-between gap-2"}>
                    <p className={"text-sm text-gray-500 font-medium"}>سلة المشتريات</p>
                    <IoClose
                        onClick={() => dispatch(cartActions.setOpen(false))}
                        className={"text-3xl text-red-500 cursor-pointer hover:text-red-400 font-bold"} />
                </div>
                <div className={"flex flex-col flex-grow gap-3"}>
                    {
                        error.status === "error" &&
                        <Error status={error.status} message={error.message} />
                    }
                    <div className={"flex flex-col flex-grow gap-3"}>
                        <div className={"flex-grow"}>
                            {
                                items.length > 0 &&
                                items.map((item, index) =>
                                    <div key={index} className={"flex bg-white p-2 rounded-lg border gap-3"}>
                                        <Image
                                            className={"w-fit border self-center h-[77px] object-cover rounded-lg"}
                                            width={100}
                                            height={100}
                                            src={`/uploads/books/${item.image}`} alt={"صورة الكتاب"}
                                        />
                                        <div className={"flex flex-col flex-grow gap-3"}>
                                            <h2 className={"font-semibold flex-grow text-slate-700"}>{item.title}</h2>
                                            <div className={"flex items-center justify-between gap-3"}>
                                                <span className={"font-bold text-slate-700"}>{item.price}</span>
                                                <div className={"flex items-center p-1 rounded-lg border border-dashed gap-2"}>
                                                    <button disabled={error.status === "error"}
                                                            onClick={() => dispatch(cartActions.addCopy(item.id))}
                                                            className={classNames({
                                                                "w-8 cursor-pointer h-8 rounded-full border border-dashed border-blue-200 bg-blue-50 text-blue-600 font-medium text-xl flex items-center justify-center": true,
                                                                "cursor-not-allowed": error.status === "error"
                                                            })}>+
                                                    </button>
                                                    <span className={"font-medium"}>{item.copies}</span>
                                                    <button disabled={error.status === "-error"}
                                                            onClick={() => dispatch(cartActions.deleteCopy(item.id))}
                                                            className={classNames({
                                                                "w-8 cursor-pointer h-8 rounded-full border border-dashed border-red-200 bg-red-50 text-red-600 font-medium text-xl flex items-center justify-center": true,
                                                                "cursor-not-allowed": error.status === "-error"
                                                            })}>-
                                                    </button>
                                                </div>
                                                <DeleteIcon onClick={async () => {
                                                    dispatch(cartActions.delete({
                                                        id: item.id,
                                                        price: item.price
                                                    }))
                                                }}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                items.length === 0 &&
                                <Error status={"alert"} message={"السلة فارغة، قم بإضافة منتجات لعرضها."}/>
                            }
                        </div>
                        <div className={"flex p-2 flex-col gap-4 bg-white border rounded-lg"}>
                            <ul className={"flex items-center gap-3 justify-between list-none"}>
                                <li className={"flex items-center gap-3 font-medium"}>
                                    <p className={"text-sm"}>المجموع:</p>
                                    <span className={"font-bold text-slate-700"}>{priceAll}</span>
                                </li>
                                <li>
                                    <DeleteIcon onClick={async () => {
                                        dispatch(cartActions.deleteAll())
                                    }}/>
                                </li>
                            </ul>
                            <LinkBtn title={"الذهاب لصفحة الدفع"} link={"/checkout"} isFull={true}/>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={() => dispatch(cartActions.setOpen(false))} className={"bg-black/10 flex-grow"}/>
        </section>
    )
}