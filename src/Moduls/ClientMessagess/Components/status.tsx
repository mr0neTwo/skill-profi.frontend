import React, {useState} from "react";
import {statusNames, statusStyle} from "../client-request-types";
import {IStatus} from "./status-cell";
import {useUpdateClientMessageMutation} from "../client-request-api";

export const Status: React.FC<IStatus> = ({id, status}) => {

    const [showMenu, setShoeMenu] = useState(false)
    const [updateStatus] = useUpdateClientMessageMutation()

    const handleStatusSelect = (idx: number) => {
        setShoeMenu(false)
        updateStatus({id, status:idx})
    }

    return (
        <div className='status-container'>
            <div
                className={`status ${statusStyle[status]}`}
                onClick={() => setShoeMenu(!showMenu)}
            >
                {statusNames[status]}
            </div>
            {showMenu &&
                <div className='status-menu'>

                    <div
                        key={status}
                        className={`status ${statusStyle[status]}`}
                        onClick={() => setShoeMenu(false)}
                    >
                        {statusNames[status]}
                    </div>
                    <div className='status-separate-line'/>

                    {statusNames.map((statusName, idx) => {
                        if (status === idx) {
                            return null
                        }

                        return (
                            <div
                                key={statusName}
                                className={`status ${statusStyle[idx]}`}
                                onClick={() => handleStatusSelect(idx)}
                            >
                                {statusName}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}