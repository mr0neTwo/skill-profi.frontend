import {baseApi} from "../../Common/baseApi";

import {CreateServiceDto, GetServiceListDto, GetServiceListResponse, UpdateServiceDto} from "./service-types";
import {CreateServiceDtiSchema, GetServiceListResponseSchema, UpdateServiceDtiSchema} from "./servece-validation-schemas";
import {Id} from "../../Common/common-types";

export const serviceApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        getServiceList: builder.query<GetServiceListResponse, GetServiceListDto>({
            query: (dto) => {
                const params = new URLSearchParams(dto as any).toString()
                return `/service/getList?${params}`
            },
            providesTags: ['Service'],
            transformResponse: (response: unknown) => {
                const result = GetServiceListResponseSchema.safeParse(response);

                if (!result.success) {
                    console.error("Validation error:", result.error);
                    throw new Error('Invalid response format');
                }

                return result.data;
            },
        }),

        createService: builder.mutation<Id, CreateServiceDto>({
            query: (dto) => {
                const validation = CreateServiceDtiSchema.safeParse(dto)

                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }
                return {
                    url: '/service/create',
                    method: 'POST',
                    body: validation.data,
                }
            },
            invalidatesTags: ['Service']
        }),

        updateService: builder.mutation<void, UpdateServiceDto>({
            query: (dto) => {
                const validation = UpdateServiceDtiSchema.safeParse(dto)

                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }

                return {
                    url: '/service/update',
                    method: 'PUT',
                    body: validation.data
                }
            },
            invalidatesTags: ['Service']
        }),

        deleteService: builder.mutation<void, number>({
            query: (id) => {
                return {
                    url: `/service/delete/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Service']
        })
    })
})

export const {
    useGetServiceListQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = serviceApi