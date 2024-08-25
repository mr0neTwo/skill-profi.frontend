import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl: string = 'http://localhost:5272/api'


export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Users', 'ClientMessage'],
    endpoints: () => ({})
})
