import {configureStore} from '@reduxjs/toolkit'
import {baseApi} from "../Common/baseApi";
import {extraArgument} from "../Common/extraArgument";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({thunk: {extraArgument }}).concat(
            baseApi.middleware
        ),
})