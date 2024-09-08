export type Project = {
    id: number
    title: string
    description: string
    imageUrl: string | null
}

export type GetProjectListDto = {
    pageNumber: number
    pageSize: number
}

export type GetProjectListResponse = {
    pageNumber: number
    count: number
    totalPages: number
    projects: Project[]
}

export type CreateProjectDto = {
    title: string
    description: string
    imageBase64: string | null
}

export type UpdateProjectDto = {
    id: number
    title: string
    description: string
    imageBase64: string | null
}