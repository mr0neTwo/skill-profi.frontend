export type Service = {
    id: number
    title: string,
    description: string
}

export type GetServiceListDto = {
    pageNumber: number
    pageSize: number
}

export type GetServiceListResponse = {
    services: Service[]
    pageNumber: number
    count: number
    totalPages: number
}

export type CreateServiceDto = {
    title: string,
    description: string
}

export type UpdateServiceDto = {
    id: number
    title: string,
    description: string
}