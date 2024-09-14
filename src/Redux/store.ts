import {configureStore} from '@reduxjs/toolkit'

import {baseApi} from "../Common/baseApi"
import {extraArgument} from "../Common/extra-argument"

import {rootReducer} from "../Common/redux";

export const store = configureStore({

    reducer: rootReducer,

    devTools: process.env.NODE_ENV !== 'production',

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({thunk: {extraArgument }}).concat(
            baseApi.middleware
        ),
})