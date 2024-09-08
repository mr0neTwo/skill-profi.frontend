import React, {useState} from "react";
import {ToggleSwitch} from "../../../Common/Components/ToggleSwitch";
import {useTheme} from "./use-theme";

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