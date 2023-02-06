import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import jwtTokenSlice from "./jwtTokenSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        jwtToken: jwtTokenSlice
    }
})

