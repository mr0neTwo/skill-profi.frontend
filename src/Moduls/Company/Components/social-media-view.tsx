import React from "react"

import {SocialMedia} from "../company-types"
import {ICON} from "../../../Common/icons"

import {Icon} from "../../../Common/Components/icon"

interface ISocialMedia {
    socialMedia: SocialMedia
}

const SocialMediaView: React.FC<ISocialMedia> = ({socialMedia}) => {

    const handleGoToLink = () => {
        window.open(socialMedia.link, "_blank", "noopener,noreferrer");
    }

    return (
        <div
            className='flex text-blue dark:text-blue-dark border border-blue dark:border-blue-dark p-2 rounded-full cursor-pointer'
            onClick={handleGoToLink}
        >
            <Icon
                icon={ICON[socialMedia?.iconName ?? 'BUG']}
            />
        </div>
    )
}

export { SocialMediaView }