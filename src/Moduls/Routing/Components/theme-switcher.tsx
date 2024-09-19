import React, {useState} from "react"

import {useTheme} from "./use-theme"

import {ToggleSwitch} from "../../../Common/Components/ToggleSwitch"

interface IThemeSwitcher {
    className?: string;
}

const ThemeSwitcher: React.FC<IThemeSwitcher> = ({className}) => {

    const [theme, toggleTheme] = useTheme();
    const [checked, setChecked] = useState<boolean>(theme === 'dark');

    const handleSwitch = (value:boolean)=> {
        setChecked(value)
        toggleTheme()
    }

    return (
        <ToggleSwitch
            className={className}
            setChecked={handleSwitch}
            checked={checked}
        />
    )
}

export { ThemeSwitcher }