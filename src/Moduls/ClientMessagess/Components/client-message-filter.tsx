import React, {useState} from "react"
import {useDispatch} from "react-redux"

import {ITimeOption} from "../client-request-types"
import {setDateRange} from "../client-message-slice"
import {rangeOptions} from "../range-options"

import {SelectOption} from "../../../Common/Components/select-option"


const ClientMessageFilter: React.FC = () => {

    const [option, setOption] = useState<ITimeOption>(rangeOptions[0]);

    const dispatch = useDispatch()

    const handleSelectOption = (option: ITimeOption) => {
        setOption(option)
        dispatch(setDateRange(option.range))
    }

    return (
        <div className='flex flex-row gap-4 shrink-0'>
            <SelectOption
                title='Диапазон дат'
                selectOption={handleSelectOption}
                options={rangeOptions}
                selectedOption={option}
                noChoose='Выберите диапазон'
            />
        </div>
    )
}

export { ClientMessageFilter };