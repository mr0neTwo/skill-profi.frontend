import {baseApi} from "../../Common/baseApi"

import {CreateProjectDto, GetProjectListDto, GetProjectListResponse, UpdateProjectDto} from "./project-types"
import {CrateProjectDtoSchema, GetProjectListResponseSchema, UpdateProjectDtoSchema,} from "./project-validation-shemas"

export const projectApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        getProjectList: builder.query<GetProjectListResponse, GetProjectListDto>({
            query: (dto) => {
                const params = new URLSearchParams(dto as any).toString()
                return `/project/getList?${params}`
            },
            providesTags: ['Project'],
            transformResponse: (response: unknown) => {
                const result = GetProjectListResponseSchema.safeParse(response);

                if (!result.success) {
                    console.error("Validation error:", result.error);
                    throw new Error('Invalid response format');
                }

                return result.data;
            },
        }),

        createProject: builder.mutation<number, CreateProjectDto>({
            query: (dto) => {
                const validation = CrateProjectDtoSchema.safeParse(dto)

                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }
                return {
                    url: '/project/create',
                    method: 'POST',
                    body: validation.data,
                }
            },
            invalidatesTags: ['Project']
        }),

        updateProject: builder.mutation<void, UpdateProjectDto>({
            query: (dto) => {
                const validation = UpdateProjectDtoSchema.safeParse(dto)

                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }

                return {
                    url: '/project/update',
                    method: 'PUT',
                    body: validation.data
                }
            },
            invalidatesTags: ['Project']
        }),

        deleteProject: builder.mutation<void, number>({
            query: (id) => {
                return {
                    url: `/project/delete/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Project']
        })

    })
})

export const {
    useGetProjectListQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApi