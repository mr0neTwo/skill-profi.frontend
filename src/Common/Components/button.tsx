import React, {useMemo} from "react";

interface IButton {
    type: 'primary' | 'secondary' | 'create'
    text: string
    onClick: () => void,
    className?: string | undefined
    visible?: boolean
}

const Button : React.FC<IButton> = ({type,text, onClick, className, visible = true }) => {

    const classes = useMemo(() => {
        let classNames = 'py-2.5 px-6 text-lg rounded-lg max-w-72 font-bold'
        if(className) classNames += ` ${className}`
        if (type === 'primary') classNames += ' font-bold text-background bg-blue border-0 hover:bg-blue110 dark:text-background-dark dark:bg-blue-dark dark:hover:bg-blue110-dark'
        if (type === 'secondary') classNames += ' border-blue border-2 text-blue bg-blue15 hover:bg-blue30 dark:border-blue-dark dark:text-blue-dark dark:bg-blue15-dark dark:hover:bg-blue30-dark'
        if (type === 'create') classNames += ' font-bold text-background bg-green border-0 hover:bg-green110 dark:text-background-dark dark:bg-green-dark dark:hover:bg-green110-dark'
        return classNames
    },  [className, type])

    if(!visible) return null

    return (
        <button
            className={classes}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export { Button }