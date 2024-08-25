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
    
    const [listVisible, setListVisible] = useState(false)

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
            <div className='p-1.5'>{title}</div>

            <div
                className={listVisible ? 'rounded-t-md border border-lightgrey bg-darkgrey' : 'rounded-md border border-lightgrey bg-darkgrey'}
                onClick={() => setListVisible(!listVisible)}
            >
                <div className='py-1.5 px-4'>{getTitle}</div>
            </div>

            {listVisible ?
                <div className='absolute flex flex-col bg-darkgrey w-full border border-lightgrey rounded-b-md border-t-0 overflow-hidden'>
                        {options.map(element => {
                            return (
                                <div
                                    key={element.id}
                                    className='py-1.5 px-4 cursor-pointer hover:bg-hover'
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