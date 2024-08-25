import React, {useState} from "react";

import {useGetClientMessagesQuery} from "../client-request-api";
import {
    getEndOfDayTimestamp,
    getEndOfMonthTimestamp,
    getEndOfWeekTimestamp,
    getStartOfDayTimestamp,
    getStartOfMonthTimestamp,
    getStartOfWeekTimestamp
} from "./timestamp-utils";

import {DateCell} from "./date-cell";
import {DataCell} from "./data-cell";
import {StatusCell} from "./status-cell";
import {Spinner} from "../../../Common/Components/spinner";
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading";
import {IOption, SelectOption} from "../../../Common/Components/select-option";
import {THeader} from "./t-header";

interface ITimeOption extends IOption {
    range: {
        start: number,
        end: number
    }
}

const rangeOptions: ITimeOption[] = [
    {
        id: 1,
        title: 'Все время',
        range: {
            start: 0,
            end: getEndOfDayTimestamp()
        }
    },  {
        id: 2,
        title: 'Сегодня',
        range: {
            start: getStartOfDayTimestamp(),
            end: getEndOfDayTimestamp()
        }
    }, {
        id: 3,
        title: 'Текущая неделя',
        range: {
            start: getStartOfWeekTimestamp(),
            end: getEndOfWeekTimestamp()
        }
    }, {
        id: 4,
        title: 'Текущий месяц',
        range: {
            start: getStartOfMonthTimestamp(),
            end: getEndOfMonthTimestamp()
        }
    }
]

const ClientMessageTable : React.FC = () => {

    const [dateRange, setDateRage] = useState(rangeOptions[0])
    const { data: clientMessages, error, isLoading } = useGetClientMessagesQuery(dateRange.range);

    const handleSelectOption = (option: ITimeOption) => {
        setDateRage(option)
    }

    if (isLoading) return <Spinner/>;
    if (error) return <ErrorDataLoading/>;

    return (
        <>
            <div className='flex flex-row p-4 gap-4'>
                <SelectOption
                    title='Диапазон дат'
                    selectOption={handleSelectOption}
                    options={rangeOptions}
                    selectedOption={dateRange}
                    noChoose='Выберите диапазон'
                />
            </div>

            <table className='border-spacing-y-1 p-3 border-separate'>
                <thead>
                    <tr className='bg-darkgrey'>
                        <THeader>Дата</THeader>
                        <THeader>Сообщение</THeader>
                        <THeader>Статус</THeader>
                        <THeader>Имя клиента</THeader>
                        <THeader>Email клиента</THeader>
                    </tr>
                </thead>
                <tbody>
                {clientMessages?.map(clientMessage => (
                    <tr className='bg-darkgrey hover:bg-hover' key={clientMessage.id}>
                        <DateCell timestamp={clientMessage.creationDate}/>
                        <DataCell text={clientMessage.message}/>
                        <StatusCell id={clientMessage.id} status={clientMessage.status}/>
                        <DataCell text={clientMessage.clientName}/>
                        <DataCell text={clientMessage.clientEmail}/>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export {ClientMessageTable}

