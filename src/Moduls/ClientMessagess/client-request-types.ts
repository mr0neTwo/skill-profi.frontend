import {Id} from "../../Common/common-types";

export type ClientMessage = {
    id : Id
    creationDate: number
    clientName: string
    clientEmail: string
    message: string,
    status : ClientMessageStatus
}

export type GetClientMessageListDto = {
    start: number
    end: number
}

export type CreateClientMessageDto = {
    clientName: string
    clientEmail: string
    message: string
}

export type UpdateClientMessageDto = {
    id: Id
    status : ClientMessageStatus
}

export enum ClientMessageStatus {
    Received,
    AtWork,
    Done,
    Denied,
    Canceled
}

export const statusNames : string[] = ['Получен', 'В работе', 'Выполнен', 'Отклонен', 'Отменен']
export const statusStyle: string[] = ['status-received', 'status-at-work', 'status-done', '', '']
