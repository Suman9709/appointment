import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const signupUser = createAsyncThunk('auth/signupUser',
    async ({ name, email, password, userType }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name, email, password, userType
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Signup failed")
        }
    }
);

export const loginUser = createAsyncThunk('auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email, password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed")
        }
    }
);

const userData = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {
    isAuthenticated: false,
    user: null,
    userType: null,
    token: null,
};

const initialState = {
    ...userData,
    loading: false,
    error: null,
};



const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        // signup: (state, action) => {
        //     const { user, token, userType } = action.payload

        //     state.user = user;
        //     state.token = token;
        //     state.userType = userType;
        //     state.isAuthenticated = true;

        // },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.userType = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('auth')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(signupUser.fulfilled, (state, action) => {
                const { user, accessToken, userType } = action.payload;
                state.user = user;
                state.token = accessToken;
                state.userType = userType;
                state.isAuthenticated = true;
                state.loading = false;

                localStorage.setItem('auth', JSON.stringify({
                    user, token: accessToken, userType, isAuthenticated: true,
                })
                );
            })

            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //Login

        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { user, accessToken, userType } = action.payload;
                console.log('Login response payload:', action.payload);

                state.user = user;
                state.token = accessToken;
                state.userType = userType;
                state.isAuthenticated = true;
                state.loading = false;


                localStorage.setItem('auth', JSON.stringify({ user, token: accessToken, userType, isAuthenticated: true }))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

    }

    // login: (state, action) => {
    //     const { user, token, userType } = action.payload;

    //     state.user = user;
    //     state.token = token;
    //     state.userType = userType;
    //     state.isAuthenticated = true
    // },

    // logout: (state) => {
    //     state.user = null;
    //     state.token = null;
    //     state.userType = null;
    //     state.isAuthenticated = false
    // },
});

export const { logout } = authSlice.actions

export default authSlice.reducer
