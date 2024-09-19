import React from "react";
import {Input} from "../../../Common/Components/input";
import {ICON} from "../../../Common/icons";
import {SelectIcon} from "./select-icon";

interface ISocialMediaForm {
    iconName: keyof typeof ICON
    link: string
    onIconNameChange: (newIconName: keyof typeof ICON) => void
    onLinkChange: (newLink: string) => void
}

const SocialMediaForm: React.FC<ISocialMediaForm> = ({iconName, link, onIconNameChange, onLinkChange}) => {
    return (
        <div className='flex gap-4 items-center'>
            <SelectIcon
                onIconChanged={onIconNameChange}
                iconName={iconName}
            />
            <Input
                onChange={value => onLinkChange(value)}
                value={link}/>
        </div>
    )
}

export const MemoizedSocialMediaForm = React.memo(SocialMediaForm);