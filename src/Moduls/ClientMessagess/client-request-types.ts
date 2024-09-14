import {IOption} from "../../Common/Components/select-option";

export type ClientMessage = {
    id : number
    creationDate: number
    clientName: string
    clientEmail: string
    message: string,
    status : ClientMessageStatus
}

export type GetClientMessageListDto = {
    startTimestamp: number
    endTimeStamp: number
    pageNumber: number
    pageSize: number
}

export type GetClientMessagesListResponse = {
    pageNumber: number
    count: number
    totalPages: number
    clientRequests: ClientMessage[]
}

export type CreateClientMessageDto = {
    clientName: string
    clientEmail: string
    message: string
}

export type UpdateClientMessageDto = {
    id: number
    status : ClientMessageStatus
}

export enum ClientMessageStatus {
    Received,
    AtWork,
    Done,
    Denied,
    Canceled
}

export interface ITimeOption extends IOption {
    range: {
        startTimestamp: number,
        endTimeStamp: number
    }
}

export type DateRange = {
    startTimestamp: number
    endTimeStamp: number
}

export const statusNames : string[] = ['Получен', 'В работе', 'Выполнен', 'Отклонен', 'Отменен']
export const statusStyle: string[] = [
    'text-background dark:text-background-dark bg-blue dark:bg-blue-dark',
    'text-background dark:text-background-dark bg-yellow dark:bg-yellow-dark',
    'text-background dark:text-background-dark bg-green dark:bg-green-dark',
    'text-background dark:text-background-dark bg-secondary dark:bg-secondary-dark',
    'text-background dark:text-background-dark bg-secondary dark:bg-secondary-dark'
]
