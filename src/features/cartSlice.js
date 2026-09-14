import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: []
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = 
            state.cartItems.find( i => i.id === action.payload.id);
            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({...action.payload, quantity: 1});    
            }
        },
        removeToCart: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload.id);
            if (!item) return;
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter(i => i.id !== action.payload.id);
            }
        },
        clearCart: (state, action) => {
            state.cartItems.length = 0;
        }
    }
});

export const { addToCart, removeToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;