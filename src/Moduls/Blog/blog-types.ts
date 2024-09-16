export type Post = {
    id: number
    title: string
    description: string
    imageUrl: string | null
    creationDate: number
}

export type GetPostListDto = {
    pageNumber: number
    pageSize: number
}

export type GetPostListResponse = {
    pageNumber: number
    count: number
    totalPages: number
    posts: Post[]
}

export type CreatePostDto = {
    title: string
    description: string
    imageBase64: string | null
}

export type UpdatePostDto = {
    id: number
    title: string
    description: string
    imageBase64: string | null
}