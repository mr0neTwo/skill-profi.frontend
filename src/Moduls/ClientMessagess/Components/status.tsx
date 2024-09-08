import React, {useEffect, useRef, useState} from "react";
import {statusNames, statusStyle} from "../client-request-types";
import {IStatus} from "./status-cell";
import {useUpdateClientMessageMutation} from "../client-request-api";

export const Status: React.FC<IStatus> = ({id, status}) => {

    const [showMenu, setShoeMenu] = useState<boolean>(false)
    const [updateStatus] = useUpdateClientMessageMutation()

    const handleStatusSelect = (idx: number) => {
        setShoeMenu(false)
        updateStatus({id, status:idx})
    }

    const elementRef = useRef<HTMLDivElement>(null)

    const clickHandel = (event: MouseEvent) => {
        if (elementRef.current && showMenu && !elementRef.current.contains(event.target as Node)) {
            setShoeMenu(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const statusClasses = 'px-3 py-1 rounded-lg cursor-pointer font-bold w-28 text-center'

    return (
        <div ref={elementRef} className='relative'>
            <div
                className={`${statusClasses} ${statusStyle[status]}`}
                onClick={() => setShoeMenu(!showMenu)}
            >
                {statusNames[status]}
            </div>
            {showMenu &&
                <div className='absolute flex flex-col gap-2.5 p-4 border border-secondary dark:border-secondary-dark rounded-xl bg-surface dark:bg-surface-dark z-10 -left-4 -top-4'>

                    <div
                        key={status}
                        className={`${statusClasses} ${statusStyle[status]}`}
                        onClick={() => setShoeMenu(false)}
                    >
                        {statusNames[status]}
                    </div>
                    <div className='w-full border-b-secondary dark:border-b-secondary-dark border-b py-1'/>

                    {statusNames.map((statusName, idx) => {
                        if (status === idx) {
                            return null
                        }

                        return (
                            <div
                                key={statusName}
                                className={`${statusClasses} ${statusStyle[idx]}`}
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