export type UserId = number;

export type User = {
    id: UserId;
    name: string;
    email: string;
}

export type UpdateUser = {
    id: UserId;
    name: string;
    email: string;
}