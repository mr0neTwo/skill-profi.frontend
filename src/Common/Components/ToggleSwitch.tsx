import React from 'react';

interface IToggleSwitch {
    className?: string;
    setChecked: (value: boolean) => void;
    checked: boolean;
}

const ToggleSwitch: React.FC<IToggleSwitch> = ({className, checked, setChecked}) => {

    return (
        <div className={`flex items-center justify-center bg-transparent ${className}`}>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={event => setChecked(event.target.checked)}
                />
                <div className="w-11 h-6 bg-background-dark peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-background-dark dark:peer-focus:ring-background rounded-full peer dark:bg-background peer-checked:bg-background transition-colors"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-background dark:bg-background-dark rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
        </div>
    );
};

export { ToggleSwitch };