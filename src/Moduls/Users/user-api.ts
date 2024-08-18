import {baseApi} from "../../Common/baseApi";
import {UpdateUser, User, UserId} from "./types";
import {CreateUserDto, CreateUserDtoSchema, UpdateUserDtoSchema, UserDtoSchema} from "./user-dto-shema";

// noinspection TypeScriptValidateJSTypes
export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getUsers: builder.query<User[], void>({
            query: () => '/user/getList',
            providesTags: ['Users', {type: 'Users', id: 'List'}],
            transformResponse: (response: unknown) => {
                const result = UserDtoSchema.array().safeParse(response);

                if (!result.success) {
                    console.error("Validation error:", result.error);
                    throw new Error('Invalid response format');
                }

                return result.data;
            },
        }),

        getUser: builder.query<User, UserId>({
            query: (userId) => `/user/get/${userId}`,
            transformResponse: (response: unknown) => {
                const result = UserDtoSchema.safeParse(response);

                if (!result.success) {
                    console.error("Validation error:", result.error);
                    throw new Error('Invalid response format');
                }

                return result.data;
            },
            providesTags: (_, __, userId) => ['Users', { type: 'Users', id: userId }],
        }),

        createUser: builder.mutation<UserId, CreateUserDto>({
            query: (newUser) => {
                // Валидация перед отправкой на сервер
                const validation = CreateUserDtoSchema.safeParse(newUser);
                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }
                return {
                    url: '/user/create',
                    method: 'POST',
                    body: validation.data,
                };
            },
            invalidatesTags: (userId, _, __) => {
                if (userId) {
                    return [
                        {type: 'Users', id: 'List'},
                        {type: 'Users', id: userId},
                    ];
                }
                return [{type: 'Users', id: 'List'}];
            },
        }),

        updateUser: builder.mutation<void, UpdateUser>({
            query: (updatedUser) => {
                const validation = UpdateUserDtoSchema.safeParse(updatedUser);
                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }
                return {
                    url: '/user/update',
                    method: 'PUT',
                    body: validation.data,
                };
            },
            invalidatesTags: (result, error, updatedUser) => [
                { type: 'Users', id: updatedUser.id },
                { type: 'Users', id: 'List'},
            ],
        }),

        deleteUser: builder.mutation<void, UserId>({
            query: (userId) => ({
                method: 'DELETE',
                url: `/user/delete/${userId}`
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Users', id },
                { type: 'Users', id: 'List'}
            ],
        })
    }),
    overrideExisting: true
})

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;