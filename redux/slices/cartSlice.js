import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
    name: 'cartSlice',
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
        add: (state, action) => {
            state.items.push(action.payload);
            state.priceAll += action.payload.priceBook
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
            state.error = {
                status: "success",
                message: ""
            }
            state.items.forEach((item, index) => {
                if(item.id === action.payload){
                    if(state.items[index].copies < state.items[index].numberOfCopies){
                        if(state.items[index].copies >= 1){
                            state.items[index].copies += 1
                            state.items[index].price += state.items[index].priceBook
                            state.priceAll += state.items[index].priceBook
                        }
                    } else {
                        state.error = {
                            status: "error",
                            message: `تتوفر من الكتاب "${state.items[index].title}" ${state.items[index].numberOfCopies} فقط.`
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
                    if(state.items[index].copies > 1){
                        state.items[index].copies -= 1
                        state.items[index].price -= state.items[index].priceBook
                        state.priceAll -= state.items[index].priceBook
                    } else {
                        state.error = {
                            status: "-error"
                        }
                    }
                }
            })
        },
    },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer