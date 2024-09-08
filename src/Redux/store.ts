import {configureStore} from '@reduxjs/toolkit'

import {baseApi} from "../Common/baseApi"
import {extraArgument} from "../Common/extra-argument"

import authReducer from "../Moduls/Autorization/auth-slice"
import clientMessageReducer from "../Moduls/ClientMessagess/client-message-slice"
import serviceReducer from "../Moduls/Services/service-slice"
import projectReducer from "../Moduls/Projects/project-slice"

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
        clientMessage: clientMessageReducer,
        service: serviceReducer,
        project: projectReducer
    },
    devTools: process.env.NODE_ENV !== 'production',

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({thunk: {extraArgument }}).concat(
            baseApi.middleware
        ),
})