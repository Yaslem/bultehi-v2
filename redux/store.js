import { configureStore } from '@reduxjs/toolkit'
import sideReducer from "./slices/sideSlice";
import resultReducer from "./slices/resultSlice";
import toastReducer from "./slices/toastSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        side: sideReducer,
        result: resultReducer,
        cart: cartReducer,
        toast: toastReducer,
    },
})

export default store;
