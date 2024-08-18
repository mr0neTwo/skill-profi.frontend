import { z } from 'zod';

export const UserDtoSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
});

export const CreateUserDtoSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

export const UpdateUserDtoSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    email: z.string().email().optional(),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;