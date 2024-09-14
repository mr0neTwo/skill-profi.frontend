import React from "react"

import {Id} from "../../../Common/common-types"
import {ClientMessageStatus} from "../client-request-types"

import {Status} from "./status"
import {Cell} from "./cell"

export interface IStatus {
    id: Id,
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



