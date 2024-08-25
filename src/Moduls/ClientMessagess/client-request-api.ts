import {baseApi} from "../../Common/baseApi";
import {Id} from "../../Common/common-types";
import {
    ClientRequestDtoSchema,
    CreateRequestDtoSchema,
    UpdateMessageDtoSchema
} from "./client-request-validation-shemas";
import {
    ClientMessage,
    CreateClientMessageDto, GetClientMessageListDto,
    UpdateClientMessageDto
} from "./client-request-types";


// noinspection TypeScriptValidateJSTypes
export const clientRequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getClientMessages: builder.query<ClientMessage[], GetClientMessageListDto>({
            query: (dto) => {
                const params = new URLSearchParams(dto as any).toString();
                return `/clientRequest/getList?${params}`;
            },
            providesTags: ['ClientMessage'],
            transformResponse: (response: unknown) => {
                const result = ClientRequestDtoSchema.array().safeParse(response);

                if (!result.success) {
                    console.error("Validation error:", result.error);
                    throw new Error('Invalid response format');
                }

                return result.data;
            },
        }),

        createClientMessage: builder.mutation<Id, CreateClientMessageDto>({
            query: (newMessage) => {

                const validation = CreateRequestDtoSchema.safeParse(newMessage);
                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }
                return {
                    url: '/clientRequest/create',
                    method: 'POST',
                    body: validation.data,
                }
            },
            invalidatesTags: ['ClientMessage']
        }),

        updateClientMessage: builder.mutation<void, UpdateClientMessageDto>({
            query: (updatedClientMessage) => {
                const validation = UpdateMessageDtoSchema.safeParse(updatedClientMessage);
                if (!validation.success) {
                    console.error("Validation error:", validation.error);
                    throw new Error('Invalid data format');
                }
                return {
                    url: '/clientRequest/update',
                    method: 'PUT',
                    body: validation.data
                }
            },
            invalidatesTags: ['ClientMessage']
        }),

    })
})

export const {
    useGetClientMessagesQuery,
    useCreateClientMessageMutation,
    useUpdateClientMessageMutation
} = clientRequestApi