import React, {useMemo} from "react";

interface IButton {
    type: 'primary' | 'secondary'
    text: string
    onClick: () => void,
    className?: string | undefined
}

const Button : React.FC<IButton> = ({type,text, onClick, className }) => {
    
    const classes = useMemo(() => {
        let classNames = 'button'
        if(className) classNames += ` ${className}`
        if (type === 'primary') classNames += ' primary-button'
        if (type === 'secondary') classNames += ' secondary-button'
        return classNames
    },  [className, type])

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