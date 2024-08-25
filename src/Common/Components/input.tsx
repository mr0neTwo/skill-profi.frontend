import React, {forwardRef, useImperativeHandle, useMemo, useState} from "react";

interface IInput {
    label?: string | undefined
    onChange: (value: string) => void;
    value: string;
    required?: boolean
    password?: boolean
    limit?: number | undefined
}

export interface IInputRef {
    validate: () => boolean;
}

const Input = forwardRef<IInputRef, IInput>((props, ref) => {

    const {
        label,
        onChange, value,
        required = false,
        password = false,
        limit } = props

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

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false)
        validate()
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        let value = event.target.value
        if(limit && value.length > limit){
            value = value.slice(0, limit);
        }

        onChange(value)
    }

    const classes = useMemo(() => {
        let className = 'input-container'
        if (focused) className += ' input-container-focused'
        if (isWrong) className += ' input-container-error'
        return className
    }, [focused, isWrong])

    return (
        <div className={classes}>
            {label ? <label className='label'>{label}</label> : null}
            <input
                className='input'
                onChange={handleOnChange}
                value={value}
                onFocus={() => setFocused(true)}
                onBlur={handleOnBlur}
                type={password ? 'password' : ''}
            />
        </div>
    )
})

export { Input }