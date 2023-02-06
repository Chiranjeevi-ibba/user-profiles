import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const productObj = state.find(each => each.id === action.payload.id);
            // console.log(productObj);
            if(productObj) {
                state = state.map(each => {
                    if(productObj.id === each.id) {
                        return {...each, quantity: each.quantity++}
                    }
                    return each
                })
            }else {
                state = state.push(action.payload);
            }
        },
        deleteCartItem: (state, action) => {
            const productObj = state.find(each => each.id === action.payload.id);

            if(productObj && productObj.quantity > 1) {
                state = state.map(each => {
                    if(productObj.id === each.id) {
                        return {...each, quantity: each.quantity--}
                    }
                    return each
                })
            }else {
                return state.filter(each => each.id !== action.payload.id)
            }
        },
        emptyCart: (state) => {
            return [];
        }
    }
})

export const selectAllCartItems = (state) => state.cart;

export const {addCartItem, deleteCartItem, emptyCart} = cartSlice.actions;

export default cartSlice.reducer