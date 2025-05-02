import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    userType: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        signup: (state, action) => {
            const { user, token, userType } = action.payload

            state.user = user;
            state.token = token;
            state.userType = userType;
            state.isAuthenticated = true;

        },

        login: (state, action) => {
            const { user, token, userType } = action.payload;

            state.user = user;
            state.token = token;
            state.userType = userType;
            state.isAuthenticated = true
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.userType = null;
            state.isAuthenticated = false
        },
    },
});

export const {signup, login,logout}=authSlice.actions

export default authSlice.reducer
