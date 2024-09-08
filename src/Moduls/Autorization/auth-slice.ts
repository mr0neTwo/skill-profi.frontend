import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../../Common/redux";
import {User} from "../Users/types";

interface AuthState {
    user: User | null
    isLogin: boolean
}

const initialState: AuthState = {
    user: null,
    isLogin: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User | null; }>) => {
            const {user } = action.payload
            state.user = user
            state.isLogin = true
        },
        logOut: (state) => {
            state.user = null
            state.isLogin = false
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: AppState): User | null => state.auth.user;
export const selectIsLogin = (state: AppState): boolean => state.auth.isLogin;