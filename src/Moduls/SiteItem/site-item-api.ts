import {baseApi} from "../../Common/baseApi"
import {SiteItem, UpdateSiteItemDto} from "./site-item-types"

export const siteItemApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        getSiteItem: builder.query<SiteItem, string>({
            query: (key) => `/siteItem/get/${key}`,
            providesTags: (result, error, key) => [{ type: 'SiteItem', id: key }],
        }),

        updateSiteItem: builder.mutation<void, UpdateSiteItemDto>({
            query: (updateSiteItemDto) => ({
                url: '/siteItem/update',
                method: 'PUT',
                body: updateSiteItemDto
            }),
            invalidatesTags: (result, error, { key }) => [{ type: 'SiteItem', id: key }]
        })
    })
})

export const { useGetSiteItemQuery, useUpdateSiteItemMutation} = siteItemApi