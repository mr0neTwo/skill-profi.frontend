import {User} from "../Users/user-types"

export type AuthResponse = {
    user: User,
    token: string,
    success: boolean,
    errorMessage: string
}

export type LoginDto = {
    email: string,
    password: string
}
