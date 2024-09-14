import React from "react"

import {useAppDispatch, useAppSelector} from "../../../Common/redux"
import {selectClientMessagePage, selectClientMessagesFilter, setPage} from "../client-message-slice"
import {useGetClientMessagesQuery} from "../client-request-api"

import {Pagination} from "../../../Common/Components/pagination";

const ClientMessagePagination: React.FC = () => {

    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectClientMessagesFilter)
    const page = useAppSelector(selectClientMessagePage)
    const { data: response } = useGetClientMessagesQuery(filter);


    const handleSelectPage = (page: number) => {
        dispatch(setPage(page));
    }

    return (
        <div className="flex items-center p-2.5">
           <Pagination
                currentPage={page}
                onPageSelected={handleSelectPage}
                totalItems={response?.count || 0}
                totalPages={response?.totalPages || 1}
           />
        </div>
    )
}

export { ClientMessagePagination }