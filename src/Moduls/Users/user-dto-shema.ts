import { z } from 'zod'

export const UserDtoSchema = z.object({
    id: z.number(),
    creationDate: z.number(),
    name: z.string(),
    email: z.string()
});

export const CreateUserDtoSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});

export const UpdateUserDtoSchema = z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    password: z.string().optional().nullable()
})