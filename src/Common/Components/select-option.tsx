import React, {useEffect, useMemo, useRef, useState} from "react";

interface ISelectOption<TOption> {
    selectOption: (object: TOption) => void
    options: TOption[]
    selectedOption: TOption;
    className?: string
    title?: string
    noChoose?: string;
}

export interface IOption {
    id: number
    title: string
}

const SelectOption = <TOption extends IOption>( props: ISelectOption<TOption>) => {
    
    const {
        selectOption,
        title,
        options,
        selectedOption,
        noChoose,
    } = props
    
    const [listVisible, setListVisible] = useState<boolean>(false)

    const elementRef = useRef<HTMLDivElement>(null)

    const clickHandel = (event: MouseEvent) => {
        if (elementRef.current && listVisible && !elementRef.current.contains(event.target as Node)) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleClick = (element: TOption) => {
        selectOption(element)
        setListVisible(false)
    }

    const getTitle = useMemo(() => {

        return selectedOption?.title || noChoose || 'Выберите тип'

    }, [selectedOption, noChoose]);


    return (
        <div
            ref={elementRef}
            className='relative min-w-80 rounded-md'
        >
            <div className='p-1.5 font-bold'>{title}</div>

            <div
                className={`${listVisible ? 'rounded-t-md' : 'rounded-md'} border border-secondary bg-background dark:border-secondary-dark dark:bg-background-dark`}
                onClick={() => setListVisible(!listVisible)}
            >
                <div className='py-1.5 px-4'>{getTitle}</div>
            </div>

            {listVisible ?
                <div className='absolute flex flex-col bg-background w-full border border-secondary rounded-b-md border-t-0 overflow-hidden dark:bg-background-dark dark:border-secondary-dark'>
                        {options.map(element => {
                            return (
                                <div
                                    key={element.id}
                                    className='py-1.5 px-4 cursor-pointer hover:bg-green30 dark:hover:bg-green30-dark'
                                    onClick={() => handleClick(element)}
                                >
                                    {element.title}
                                </div>
                            )
                        })}
                </div> : null}
        </div>
    )
}

export { SelectOption }