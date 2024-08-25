import React, {forwardRef, useImperativeHandle, useMemo, useState} from "react";
import {IInputRef} from "./input";

interface ITextArea {
    label?: string | undefined
    onChange: (value: string) => void;
    value: string;
    required?: boolean,
    limit?: number | undefined
}

const TextAria= forwardRef<IInputRef, ITextArea>( (props, ref) => {

    const { label, onChange, value, required = false, limit } = props

    const [focused, setFocused] = useState(false)
    const [isWrong, setIsWrong] = useState(false)

    const validate = () => {
        const isInvalid = required && value.trim().length === 0;
        setIsWrong(isInvalid);
        return !isInvalid;
    };

    useImperativeHandle(ref, () => ({
        validate,
    }));

    const handleOnBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setFocused(false)
        validate()
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        let value = event.target.value
        if(limit && value.length > limit){
            value = value.slice(0, limit);
        }

        onChange(value)
    }

    const classes = useMemo(() => {
        let className = 'text-area-container'
        if (focused) className += ' input-container-focused'
        if (isWrong) className += ' input-container-error'
        return className
    }, [focused, isWrong])

    return (
        <div className={classes}>
            {label ? <label className='label'>{label}</label> : null}
            <textarea
                className='input'
                onChange={handleOnChange}
                value={value}
                onFocus={() => setFocused(true)}
                onBlur={handleOnBlur}
            />
            {limit && <div className='text-area-counter'>{`${value.length}/${limit}`}</div>}
        </div>
    )
})

export { TextAria }