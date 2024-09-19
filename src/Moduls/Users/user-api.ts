import {baseApi} from "../../Common/baseApi"
import {CreateUserDto, UpdateUserDto, User} from "./user-types"
import {CreateUserDtoSchema, UpdateUserDtoSchema, UserDtoSchema} from "./user-dto-shema"

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getUsers: builder.query<User[], void>({
            query: () => '/user/getList',
            providesTags: ['Users'],
            transformResponse: (response: unknown) => {
                const result = UserDtoSchema.array().safeParse(response)

                if (!result.success) {
                    console.error("Validation error:", result.error)
                    throw new Error('Invalid response format')
                }

                return result.data;
            },
        }),

        createUser: builder.mutation<number, CreateUserDto>({
            query: (newUser) => {

                const validation = CreateUserDtoSchema.safeParse(newUser)
                if (!validation.success) {
                    console.error("Validation error:", validation.error)
                    throw new Error('Invalid data format')
                }
                return {
                    url: '/user/create',
                    method: 'POST',
                    body: validation.data,
                };
            },
            invalidatesTags: ['Users'],
        }),

        updateUser: builder.mutation<void, UpdateUserDto>({
            query: (updatedUser) => {
                const validation = UpdateUserDtoSchema.safeParse(updatedUser);

                if (!validation.success) {
                    console.error("Validation error:", validation.error)
                    throw new Error('Invalid data format')
                }
                return {
                    url: '/user/update',
                    method: 'PUT',
                    body: validation.data,
                };
            },
            invalidatesTags: ['Users'],
        }),

        deleteUser: builder.mutation<void, number>({
            query: (userId) => ({
                method: 'DELETE',
                url: `/user/delete/${userId}`
            }),
            invalidatesTags: ['Users'],
        })
    }),
    overrideExisting: true
})

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;