import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom"

import {SocialMedia} from "../company-types"
import {ICON} from "../../../Common/icons"
import {useGetSocialMediasQuery, useUpdateSocialMediasMutation} from "../company-api"

import {Button} from "../../../Common/Components/button"
import {MemoizedSocialMediaForm} from "./social-media-form"

const SocialMediaForms: React.FC = () => {

    const navigate = useNavigate()

    const {data: socialMedias} = useGetSocialMediasQuery()
    const [saveSocialMedia] = useUpdateSocialMediasMutation()

    const [socialMediasEdited, setSocialMediasEdited] = useState<SocialMedia[]>(socialMedias ?? [])

    const handleIconNameChange = useCallback((idx: number, newIconName: keyof typeof ICON) => {
        setSocialMediasEdited(prev => prev.map((socialMedia, i) =>
            i === idx ? { ...socialMedia, iconName: newIconName } : socialMedia
        ));
    }, []);

    const handleLinkChange = useCallback((idx: number, newLink: string) => {
        setSocialMediasEdited(prev => prev.map((socialMedia, i) =>
            i === idx ? { ...socialMedia, link: newLink } : socialMedia
        ));
    }, []);

    const handleSave = () => {
        saveSocialMedia({ socialMediaDtos: socialMediasEdited })
        navigate('/admin/contacts')
    }

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className='flex flex-col p-8 gap-4 justify-between h-full'>

            <div className='flex flex-col gap-4 w-[600px]'>
                {socialMediasEdited?.map((socialMedia, idx) => (
                    <MemoizedSocialMediaForm
                        key={idx}
                        iconName={socialMedia.iconName}
                        link={socialMedia.link}
                        onIconNameChange={newIconName => handleIconNameChange(idx, newIconName)}
                        onLinkChange={newLink => handleLinkChange(idx, newLink)}
                    />
                ))}
            </div>

            <div className='flex gap-4'>
                <Button
                    type='primary'
                    text='Сохранить'
                    onClick={handleSave}
                />
                <Button
                    type='secondary'
                    text='Назад'
                    onClick={handleBack}
                />
            </div>

        </div>
    )
}

export {SocialMediaForms}

