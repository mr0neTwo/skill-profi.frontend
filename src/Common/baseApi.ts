import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseUrl = 'http://localhost:5272'

const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: 'include'
})

export const baseApi = createApi({
    baseQuery,
    tagTypes: ['Users', 'ClientMessage', 'SiteItem', 'Service', 'Project'],
    endpoints: () => ({})
})
