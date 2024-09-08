import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
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

    const [isWrong, setIsWrong] = useState<boolean>(false)
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        adjustHeight()
    }, [])

    const validate = () => {
        const isInvalid = required && value.trim().length === 0;
        setIsWrong(isInvalid);
        return !isInvalid;
    };

    const focus = () => {
        inputRef.current?.focus()
    }

    useImperativeHandle(ref, () => ({
        validate,
        focus
    }));

    const adjustHeight = () => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    };

    const handleOnBlur = () => {
        validate()
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        let inputValue = event.target.value;
        if (limit && inputValue.length > limit) {
            inputValue = inputValue.slice(0, limit);
        }
        onChange(inputValue);
        adjustHeight();
    }


    const textAreaClasses = useMemo(() => {
        let className = 'bg-background dark:bg-background-dark rounded py-2 px-4 text-lg resize-none scrollbar-hide' +
        '  border-solid border-2 focus:outline-none focus:border-main dark:focus:border-main-dark'
        if (isWrong) {
            className += ' border-red dark:border-red-dark'
        } else {
            className += ' border-secondary dark:border-secondary-dark'
        }
        return className
    }, [isWrong])

    return (
        <div className='flex flex-col px-0.5'>
            {label ? <label className='p-1 text-lg font-bold'>{label}</label> : null}
            <textarea
                ref={inputRef}
                className={textAreaClasses}
                onChange={handleOnChange}
                value={value}
                onBlur={handleOnBlur}
                rows={1}
            />
            {limit && <div className='self-end'>{`${value.length}/${limit}`}</div>}
        </div>
    )
})

export { TextAria }