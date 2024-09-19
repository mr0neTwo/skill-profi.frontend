import {baseApi} from "../../Common/baseApi"
import {CreatePostDto, GetPostListDto, GetPostListResponse, UpdatePostDto} from "./blog-types"
import {CratePostDtoSchema, GetPostListResponseSchema, UpdatePostDtoSchema} from "./blog-validation-shemas"

export const blogApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        getPostList: builder.query<GetPostListResponse, GetPostListDto>({
            query: (dto) => {
                const params = new URLSearchParams(dto as any).toString()
                return `/post/getList?${params}`
            },
            providesTags: ['Post'],
            transformResponse: (response: unknown) => {
                const result = GetPostListResponseSchema.safeParse(response);

                if (!result.success) {
                    console.error("Validation error:", result.error);
                    throw new Error('Invalid response format');
                }

                return result.data;
            },
        }),

        createPost: builder.mutation<number, CreatePostDto>({
            query: (dto) => {
                const validation = CratePostDtoSchema.safeParse(dto)

                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }
                return {
                    url: '/post/create',
                    method: 'POST',
                    body: validation.data,
                }
            },
            invalidatesTags: ['Post']
        }),

        updatePost: builder.mutation<void, UpdatePostDto>({
            query: (dto) => {
                const validation = UpdatePostDtoSchema.safeParse(dto)

                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }

                return {
                    url: '/Post/update',
                    method: 'PUT',
                    body: validation.data
                }
            },
            invalidatesTags: ['Post']
        }),

        deletePost: builder.mutation<void, number>({
            query: (id) => {
                return {
                    url: `/post/delete/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Post']
        })

    })
})

export const {
    useGetPostListQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} = blogApi