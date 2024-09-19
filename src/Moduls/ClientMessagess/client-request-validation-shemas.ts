import { z } from 'zod'

import {ClientMessageStatus} from "./client-request-types";

export const ClientRequestDtoSchema = z.object({
    id: z.number(),
    creationDate: z.number().int(),
    clientName: z.string(),
    clientEmail: z.string().email(),
    message: z.string(),
    status: z.nativeEnum(ClientMessageStatus)
});

export const CreateRequestDtoSchema = z.object({
    clientName: z.string(),
    clientEmail: z.string().email(),
    message: z.string()
});

export const UpdateMessageDtoSchema = z.object({
    id: z.number(),
    status: z.nativeEnum(ClientMessageStatus)
})

export const GetClientRequestListResponseSchema = z.object({
    pageNumber: z.number().int(),
    count: z.number().int(),
    totalPages: z.number().int(),
    clientRequests: z.array(ClientRequestDtoSchema)
})