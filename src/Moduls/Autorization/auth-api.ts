import {baseApi} from "../../Common/baseApi"
import {AuthResponse, LoginDto} from "./auth-types"


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