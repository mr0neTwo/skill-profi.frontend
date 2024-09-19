import React from "react";

import {Cell} from "./cell";

interface IDataSell {
    text: string
}

const DataCell: React.FC<IDataSell> = ({text}) => {
    return (
        <Cell className='overflow-hidden text-ellipsis whitespace-nowrap max-w-lg'>{text}</Cell>
    )
}

export {DataCell}