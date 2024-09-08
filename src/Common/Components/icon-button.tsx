import React, {useMemo} from "react";

import {Icon} from "./icon";
import {ICON} from "../icons";


interface IEditButton {
    onClick: () => void;
    className?: string;
    type: "edit" | "delete";
    visible?: boolean;
}

const IconButton: React.FC<IEditButton> = ({ onClick, className, type, visible = true }) => {

    const classes = useMemo(() => {

        let classNames = 'flex items-center justify-center px-2 h-8 w-8 border rounded-lg focus:outline-none'
        classNames += ' ' + className

        if(type === 'edit') classNames += ' border-blue text-blue bg-blue15 hover:bg-blue30 dark:border-blue-dark dark:text-blue-dark dark:bg-blue15-dark dark:hover:bg-blue30-dark'
        if(type === 'delete') classNames += ' border-red text-red bg-red15 hover:bg-red30 dark:border-red-dark dark:text-red-dark dark:bg-red15-dark dark:hover:bg-red30-dark'

        return classNames

    }, [className, type])

    if(!visible) return null

    return (
        <button
            onClick={onClick}
            className={classes}
        >
            <Icon icon={type === 'edit' ? ICON.PENCIL : ICON.TRASH}/>
        </button>
    );
};

export { IconButton };