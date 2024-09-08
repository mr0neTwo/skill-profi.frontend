import {z} from "zod";

export const ProjectDtoSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().nullable()
})

export const CrateProjectDtoSchema = z.object({
    title: z.string(),
    description: z.string(),
    imageBase64: z.string().nullable()
})

export const UpdateProjectDtoSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string(),
    imageBase64: z.string().nullable()
})

export const GetProjectListResponseSchema = z.object({
    pageNumber: z.number().int(),
    count: z.number().int(),
    totalPages: z.number().int(),
    projects: z.array(ProjectDtoSchema)
})