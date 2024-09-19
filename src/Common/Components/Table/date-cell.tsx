import React from "react"

import {Cell} from "./cell"

interface IDateCell {
    timestamp: number
}

const options: Intl.DateTimeFormatOptions  = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

const timestampToString = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString("ru-RU", options).replace('г. в', ' ')
}

const DateCell: React.FC<IDateCell> = ( {timestamp}) => {
    return (
        <Cell className='min-w-40'>{timestampToString(timestamp)}</Cell>
    )
}

export {DateCell}

