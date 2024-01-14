import { createSlice } from '@reduxjs/toolkit';
export const resultSlice = createSlice({
    name: 'resultSlice',
    initialState: {
        isOpen: false,
    },
    reducers: {
        setOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
})

export const resultActions = resultSlice.actions

export default resultSlice.reducer