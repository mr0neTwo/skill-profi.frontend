import React, {useEffect, useMemo, useRef, useState} from "react"

import {Icon} from "../../../Common/Components/icon"
import {ICON} from "../../../Common/icons"

interface IServiceFoldout {
    title: string;
    text: string;
    initialOpen?: boolean;
}

const ServiceFoldout: React.FC<IServiceFoldout> = ({ title, text, initialOpen = false }) => {

    const [isOpen, setIsOpen] = useState<boolean>(initialOpen)
    const [maxHeight, setMaxHeight] = useState<string>(isOpen ? '1000px' : '0px')
    const contentRef = useRef<HTMLDivElement>(null)

    const toggleFoldout = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            setMaxHeight(`${contentRef.current?.scrollHeight}px`)
        } else {
            setMaxHeight('0px')
        }
    }, [isOpen]);


    const classes = useMemo(() => {

        let className = 'flex flex-col rounded-2xl p-4 w-[700px]'

        if(isOpen){
            className += ' bg-blue15 dark:bg-blue15-dark gap-4 border-blue dark:border-blue-dark border text-main dark:text-main-dark'
        } else {

            className += ' bg-blue dark:bg-blue-dark text-background dark:text-background-dark font-bold'
        }

        return className
    }, [isOpen])

    return (
        <div className={classes}>
            <button
                className='flex gap-4'
                onClick={toggleFoldout}
            >
                <Icon
                    className={`transition-transform duration-300 ${ isOpen ? 'rotate-90' : 'rotate-0'}`}
                    icon={ICON.RIGHT}
                />
                <div className={isOpen ? 'text-blue dark:text-blue-dark font-bold text-xl' : ''}>{title}</div>
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight, transition: 'max-height 0.3s ease' }}
                className='overflow-hidden text-lightgrey'
            >
                {text}
            </div>

        </div>
    );
};

export { ServiceFoldout }