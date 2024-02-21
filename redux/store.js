import { configureStore } from '@reduxjs/toolkit'
import sideReducer from "./slices/sideSlice";
import resultReducer from "./slices/resultSlice";
import toastReducer from "./slices/toastSlice";
import cartReducer from "./slices/cartSlice";
import paginationReducer from "./slices/paginationSlice"
import exceptionReducer from "./slices/exceptionSlice"
import resultCanvasReducer from "./slices/resultCanvasSlice"

const store = configureStore({
    reducer: {
        side: sideReducer,
        result: resultReducer,
        cart: cartReducer,
        toast: toastReducer,
        pagination: paginationReducer,
        exception: exceptionReducer,
        resultCanvas: resultCanvasReducer
    },
})
export default store;
