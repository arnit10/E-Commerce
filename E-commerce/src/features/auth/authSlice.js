import {createSlice} from '@reduxjs/toolkit'

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isLoggedIn: !!storedToken,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login: (state , action ) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            // localStorage.setItem("userId", response.data.user._id)
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    }
})

export const {login , logout} = authSlice.actions
export default authSlice.reducer