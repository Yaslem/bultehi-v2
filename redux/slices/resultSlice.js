import { createSlice } from '@reduxjs/toolkit';
export const resultSlice = createSlice({
    name: 'resultSlice',
    initialState: {
        isOpen: false,
        student: {}
    },
    reducers: {
        setOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        setStudent: (state, action) => {
            state.student = action.payload;
        },
    },
})

export const resultActions = resultSlice.actions

export default resultSlice.reducer