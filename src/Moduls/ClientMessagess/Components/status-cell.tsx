import React from "react"

import {ClientMessageStatus} from "../client-request-types"

import {Status} from "./status"
import {Cell} from "../../../Common/Components/Table/cell"

export interface IStatus {
    id: number,
    status: ClientMessageStatus
}

const StatusCell: React.FC<IStatus> = ({id, status}) => {
    return (
        <Cell>
           <Status id={id} status={status}/>
        </Cell>
    )
}

export { StatusCell }



