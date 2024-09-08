import React from "react";

import {useGetClientMessagesQuery} from "../client-request-api";

import {DateCell} from "./date-cell";
import {DataCell} from "./data-cell";
import {StatusCell} from "./status-cell";
import {Spinner} from "../../../Common/Components/spinner";
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading";
import {THeader} from "./t-header";
import {selectClientMessagesFilter} from "../client-message-slice";
import {useAppSelector} from "../../../Common/redux";

const ClientMessageTable : React.FC = () => {

    const filter = useAppSelector(selectClientMessagesFilter)
    const { data: response, error, isLoading } = useGetClientMessagesQuery(filter);

    if (isLoading) return <Spinner/>;
    if (error) return <ErrorDataLoading/>;

    return (
        <div className='flex-grow overflow-auto scrollbar-hide w-full'>
            <table className='border-spacing-y-2 w-full'>
                <thead>
                    <tr className='bg-surface dark:bg-surface-dark'>
                        <THeader>Дата</THeader>
                        <THeader>Сообщение</THeader>
                        <THeader>Статус</THeader>
                        <THeader>Имя клиента</THeader>
                        <THeader>Email клиента</THeader>
                    </tr>
                </thead>
                <tbody>
                {response?.clientRequests.map(clientMessage => (
                    <tr
                        key={clientMessage.id}
                        className='border-b border-solid bg-surface dark:bg-surface-dark hover:bg-green15 dark:hover:bg-green15-dark border-secondary dark:border-secondary-dark'
                    >
                        <DateCell timestamp={clientMessage.creationDate}/>
                        <DataCell text={clientMessage.message}/>
                        <StatusCell id={clientMessage.id} status={clientMessage.status}/>
                        <DataCell text={clientMessage.clientName}/>
                        <DataCell text={clientMessage.clientEmail}/>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export {ClientMessageTable}

