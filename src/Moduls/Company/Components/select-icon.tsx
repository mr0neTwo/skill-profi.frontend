import React, {useEffect, useRef, useState} from "react"

import {ICON} from "../../../Common/icons";
import {Icon} from "../../../Common/Components/icon";

interface ISelectIcon {
    iconName: keyof typeof ICON
    onIconChanged: (iconName: keyof typeof ICON) => void
}

const iconContainerClasses = 'flex text-blue dark:text-blue-dark border border-blue dark:border-blue-dark p-2 rounded-full cursor-pointer'
const iconNames: (keyof typeof ICON)[] = ['YOUTUBE', 'VIMEO', 'GITHUB', 'WHATSAPP', 'INSTAGRAM', 'VK', 'TWITTER', 'STEAM', 'ANDROID', 'APPLE', 'MESSAGES', 'YOUTUBE2', 'FACEBOOK']

const SelectIcon: React.FC<ISelectIcon> = ({iconName, onIconChanged}) => {

    const [showIcons, setShowIcons] = useState<boolean>(false)
    const elementRef = useRef<HTMLDivElement>(null)

    const handleClick = (event: MouseEvent) => {
        if (elementRef.current && showIcons && !elementRef.current.contains(event.target as Node)) {
            setShowIcons(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClick)
        return () => {
            window.removeEventListener('click', handleClick)
        }
    })

    const handleSelect = (icon: keyof typeof ICON) => {
        onIconChanged(icon)
        setShowIcons(false)
    }

    return (
        <div ref={elementRef} className='relative'>
            <div
                className={iconContainerClasses}
                onClick={() => setShowIcons(!showIcons)}
            >
                <Icon icon={ICON[iconName]}/>
            </div>
            {showIcons &&
                <div
                    className='absolute flex gap-2.5 p-2 border border-secondary dark:border-secondary-dark rounded-xl bg-surface dark:bg-surface-dark z-10 -left-2 -top-2'>

                    <div className={iconContainerClasses}>
                        <Icon icon={ICON[iconName]}/>
                    </div>

                    <div className='min-h-full border-solid border-r-secondary dark:border-r-secondary-dark border-r px-1'/>

                    {iconNames.map((icon) => {
                        if(icon === iconName) {
                            return null
                        }

                        return (
                            <div
                                className={iconContainerClasses}
                                onClick={() => handleSelect(icon)}
                            >
                                <Icon icon={ICON[icon]}/>
                            </div>
                        )

                    })}

                </div>
            }
        </div>
    )
}

export {SelectIcon}