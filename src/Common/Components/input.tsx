import React, {forwardRef, useImperativeHandle, useMemo, useRef, useState} from "react";

interface IInput {
    label?: string | undefined
    onChange: (value: string) => void;
    onEnterPress?: () => void;
    onBlur?: () => void;
    value: string;
    required?: boolean
    password?: boolean
    limit?: number | undefined
}

export interface IInputRef {
    validate: () => boolean
    focus: () => void
}

const Input = forwardRef<IInputRef, IInput>((props, ref) => {

    const {
        label,
        onChange,
        value,
        onEnterPress,
        onBlur,
        required = false,
        password = false,
        limit } = props

    const [isWrong, setIsWrong] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);

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
        focus,
    }));

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        validate()

        if (onBlur) {
            onBlur()
        }
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        let value = event.target.value
        if(limit && value.length > limit){
            value = value.slice(0, limit);
        }

        onChange(value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onEnterPress) {
            onEnterPress();
        }
    };

    const inputClasses = useMemo(() => {
        let className = 'w-full bg-background dark:bg-background-dark rounded py-2 px-4 text-lg' +
            '  border-solid border-2 focus:outline-none focus:border-main dark:focus:border-main-dark'
        if (isWrong) {
            className += ' border-red dark:border-red-dark'
        } else {
            className += ' border-secondary dark:border-secondary-dark'
        }
        return className
    }, [isWrong])

    return (
        <div className='flex flex-col px-0.5 w-full'>
            {label ? <label className='p-1 text-lg font-bold'>{label}</label> : null}
            <input
                ref={inputRef}
                className={inputClasses}
                onChange={handleOnChange}
                value={value}
                onBlur={handleOnBlur}
                onKeyDown={handleKeyDown}
                type={password ? 'password' : ''}
                autoComplete="off"
                autoCorrect="off"
            />
        </div>
    )
})

export { Input }