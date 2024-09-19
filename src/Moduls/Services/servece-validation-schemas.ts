import {z} from "zod"

export const ServicesDtoSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string()
})

export const GetServiceListResponseSchema = z.object({
    pageNumber: z.number().int(),
    count: z.number().int(),
    totalPages: z.number().int(),
    services: z.array(ServicesDtoSchema)
})

export const CreateServiceDtiSchema = z.object({
    title: z.string(),
    description: z.string()
})

export const UpdateServiceDtiSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string()
})