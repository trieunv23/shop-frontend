import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.authenticated = action.payload
        }
    }
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
