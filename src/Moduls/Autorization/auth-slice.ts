import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {rootReducer} from "../../Common/redux";
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
    },
    selectors: {
        selectCurrentUser: (state): User | null => state.user,
        selectIsLogin: (state): boolean => state.isLogin
    }
}).injectInto(rootReducer)

export const { setCredentials, logOut } = authSlice.actions

export const {selectCurrentUser,  selectIsLogin} = authSlice.selectors