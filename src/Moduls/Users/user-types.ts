export type User = {
    id: number
    creationDate: number
    name: string
    email: string
}

export type CreateUserDto = {
    name?: string
    email: string
    password: string
}

export type UpdateUserDto = {
    id: number
    name?: string
    email?: string
    password?: string
}