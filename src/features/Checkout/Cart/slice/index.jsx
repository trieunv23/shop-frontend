import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        totalItems: 0,
    },
    reducers: {
        setItemCount: (state, action) => {
            state.totalItems = action.payload;
        },
        addItem: (state) => {
            state.totalItems += 1;
        },
        removeItem: (state) => {
            state.totalItems -= 1;
        },
    },
});

export const { setItemCount, addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;