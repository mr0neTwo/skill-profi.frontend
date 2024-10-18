import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.REACT_APP_URL_SERVER

const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: 'include'
})

export const baseApi = createApi({
    baseQuery,
    tagTypes: ['Users', 'ClientMessage', 'SiteItem', 'Service', 'Project', 'Post', 'Company', 'SocialMedia'],
    endpoints: () => ({})
})
