import React from "react"

import {ClientMessageTable} from "./client-message-table"
import {ClientMessageFilter} from "./client-message-filter"
import {ClientMessagePagination} from "./client-message-pagination"

const ClientMessagePage : React.FC = () => {
    return (
        <div className='flex flex-col gap-4 h-screen p-5'>
            <ClientMessageFilter/>
            <ClientMessageTable/>
            <ClientMessagePagination/>
        </div>
    )
}

export { ClientMessagePage }