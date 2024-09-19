import {baseApi} from "../../Common/baseApi"
import {Company, SocialMedia, UpdateCompanyDto, UpdateSocialMediaDto} from "./company-types"
import {CompanySchema, SocialMediaSchema, UpdateCompanyDtoSchema, UpdateSocialMediaDtoSchema} from "./company-validation-shemas"

export const companyApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        getCompany: builder.query<Company, void>({
            query: () => '/company/get',
            providesTags: ['Company'],
            transformResponse: (response: unknown) => {

                const result = CompanySchema.safeParse(response);

                if (!result.success) {
                    console.error("Validation error:", result.error);
                    throw new Error('Invalid response format');
                }

                return result.data;
            },
        }),

        updateCompany: builder.mutation<void, UpdateCompanyDto>({
            query: (dto) => {
                const validation = UpdateCompanyDtoSchema.safeParse(dto)

                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }

                return {
                    url: '/company/update',
                    method: 'PUT',
                    body: validation.data
                }
            },
            invalidatesTags: ['Company']
        }),

        getSocialMedias: builder.query<SocialMedia[], void>({
            query: () => '/socialMedia/getList',
            providesTags: ['SocialMedia'],
            transformResponse: (response: unknown) => {
                const result = SocialMediaSchema.array().safeParse(response)

                if (!result.success) {
                    console.error("Validation error:", result.error)
                    throw new Error('Invalid response format')
                }

                return result.data
            }
        }),

        updateSocialMedias: builder.mutation<void, UpdateSocialMediaDto>({
            query: (dto) => {
                console.log(dto)
                const validation = UpdateSocialMediaDtoSchema.safeParse(dto)

                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }

                return {
                    url: '/socialMedia/updateAll',
                    method: 'PUT',
                    body: validation.data.socialMediaDtos
                }
            },
            invalidatesTags: ['SocialMedia']
        })

    })
})

export const {
    useGetCompanyQuery,
    useUpdateCompanyMutation,
    useGetSocialMediasQuery,
    useUpdateSocialMediasMutation
} = companyApi