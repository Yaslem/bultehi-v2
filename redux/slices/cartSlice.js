import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addCopyItem, addItem, deleteCopyItem, deleteItem, deleteItems} from "../../controllers/Cart";

// add cart items to server
export const addItemToServer = createAsyncThunk(
    'cart/AddItemToServer',
    async (book) => {
        const {status, data} = await addItem(book.id, book.price)

        return { status, data }
    },
)

export const addCopyItemToServer = createAsyncThunk(
    'cart/addCopyItemToServer',
    async (book) => {
        const {status} = await addCopyItem(book.id, book.price)

        return { status }
    },
)

export const deleteCopyItemFromServer = createAsyncThunk(
    'cart/deleteCopyItemFromServer',
    async (book) => {
        const {status} = await deleteCopyItem(book.id, book.price)

        return { status }
    },
)

export const deleteItemFromServer = createAsyncThunk(
    'cart/deleteItemFromServer',
    async (book) => {
        const {status} = await deleteItem(book.id)

        return { status }
    },
)

export const deleteAllItemsFromServer = createAsyncThunk(
    'cart/deleteAllItemsFromServer',
    async (items) => {
        const {status} = await deleteItems()

        return { status }
    },
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isOpen: false,
        items: [],
        error: {
            status: "success",
            message: ""
        },
        priceAll: 0,
    },
    reducers: {
        setOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
            state.priceAll = action.payload.map(item => {
                let price1 = item.book.price
                return price1 += parseInt(item.book.price)
            })
        },
        add: (state, action) => {
            state.items = [...state.items, action.payload];
            const priceAllInt = state.priceAll
            state.priceAll = priceAllInt + action.payload.book.price

        },
        delete: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.priceAll -= action.payload.price;
            state.error = {
                status: "success",
                message: ""
            }
        },
        deleteAll: (state, action) => {
            state.items = [];
            state.priceAll = 0;
            state.error = {
                status: "success",
                message: ""
            }
        },
        addCopy: (state, action) => {
            state.items.forEach((item, index) => {
                if(item.id === action.payload){
                    if(state.items[index].quantity < state.items[index].book.numberOfCopies){
                        if(state.items[index].quantity >= 1){
                            state.items[index].quantity += 1
                            const priceAllInt = parseInt(state.items[index].priceAll)
                            state.items[index].priceAll = priceAllInt + parseInt(state.items[index].book.price)
                            state.priceAll += state.items[index].book.price
                        }
                    } else {
                        state.error = {
                            status: "error",
                            message: `تتوفر من الكتاب "${state.items[index].book.title}" ${state.items[index].book.numberOfCopies} فقط.`
                        }
                    }

                }
            })


        },
        deleteCopy: (state, action) => {
            state.error = {
                status: "success",
                message: ""
            }
            state.items.forEach((item, index) => {
                if(item.id === action.payload){
                    if(state.items[index].quantity > 1){
                        state.items[index].quantity -= 1
                        state.items[index].priceAll -= state.items[index].book.price
                        state.priceAll -= state.items[index].book.price
                    } else {
                        state.error = {
                            status: "-error"
                        }
                    }
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToServer.fulfilled, (state, action) => {
            state.items.forEach((item, index) => {
                if(item.book.id === action.payload.data.bookId){
                    state.items[index].id = action.payload.data.id
                }
            })

            if(action.payload.status === "error"){
                state.items = state.items.filter(item => item.id !== action.meta.arg.id);
                state.priceAll -= parseInt(action.meta.arg.price)
            }
        })

        builder.addCase(addCopyItemToServer.fulfilled, (state, action) => {
            if(action.payload.status === "error"){
                state.items.forEach((item, index) => {
                    if(state.items[index].id === action.meta.arg.id){
                        if(state.items[index].quantity > 1){
                            state.items[index].quantity -= 1
                            state.items[index].priceAll -= parseInt(action.meta.arg.price)
                            state.priceAll -= parseInt(action.meta.arg.price)
                        }
                    }

                })
            }
        })

        builder.addCase(deleteCopyItemFromServer.fulfilled, (state, action) => {
            if(action.payload.status === "error"){
                state.items.forEach((item, index) => {
                    if(state.items[index].id === action.meta.arg.id){
                        if(state.items[index].quantity > 1){
                            state.items[index].quantity += 1
                            state.items[index].priceAll += parseInt(action.meta.arg.price)
                            state.priceAll += parseInt(action.meta.arg.price)
                        }
                    }

                })
            }
        })

        builder.addCase(deleteItemFromServer.fulfilled, (state, action) => {
            if(action.payload.status === "error"){
                state.items = [...state.items, action.meta.arg];
                state.priceAll += action.meta.arg.book.price
            }
        })

        builder.addCase(deleteAllItemsFromServer.fulfilled, (state, action) => {
            if(action.payload.status === "error"){
                state.items = action.meta.arg.items;
                state.priceAll = action.meta.arg.items.map(item => {
                    let price1 = item.book.price
                    return price1 += parseInt(item.book.price)
                })
            }
        })
    },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer