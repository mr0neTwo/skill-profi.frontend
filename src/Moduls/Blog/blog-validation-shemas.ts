import {z} from "zod"

export const PostDtoSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().nullable(),
    creationDate: z.number()
})

export const CratePostDtoSchema = z.object({
    title: z.string(),
    description: z.string(),
    imageBase64: z.string().nullable()
})

export const UpdatePostDtoSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string(),
    imageBase64: z.string().nullable()
})

export const GetPostListResponseSchema = z.object({
    pageNumber: z.number().int(),
    count: z.number().int(),
    totalPages: z.number().int(),
    posts: z.array(PostDtoSchema)
})