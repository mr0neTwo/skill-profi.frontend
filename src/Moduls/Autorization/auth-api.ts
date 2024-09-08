import {baseApi} from "../../Common/baseApi";
import {User} from "../Users/types";
import {logOut, setCredentials} from "./auth-slice";

export type AuthResponse = {
    user: User,
    token: string,
    success: boolean,
    errorMessage: string
}

export type LoginDto = {
    email: string,
    password: string
}

export const authApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        login: builder.mutation<AuthResponse, LoginDto>({
            query: (loginDto) => ({
                url: 'auth/login',
                method: 'POST',
                body: {...loginDto}
            })
        }),

        refresh: builder.query<AuthResponse, void>({
            query: () => 'auth/refresh'
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'GET'
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation,  useRefreshQuery} = authApi