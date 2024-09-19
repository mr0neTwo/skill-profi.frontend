import React from "react"

import {useGetSocialMediasQuery} from "../company-api"

import {Skeleton} from "../../../Common/Components/Skeleton"
import {SocialMediaView} from "./social-media-view"
import {IconButton} from "../../../Common/Components/icon-button";
import {useNavigate} from "react-router-dom";
import {useIsAdminPath} from "../../../Common/use-is-admin-path";

const SocialMedias: React.FC = () => {

    const navigate = useNavigate()
    const isAdmin = useIsAdminPath()
    const {data: socialMedias, isLoading, isError} = useGetSocialMediasQuery()

    const handleEdit = () => {
        navigate('socialMedias/edit')
    }

    if(isLoading) return <Skeleton width={500} height={40} className='bg-secondary'/>
    if(isError) return <Skeleton width={500} height={40} className='bg-red'/>

    return (
        <div className='flex gap-4 p-4'>
            <>
                {socialMedias?.map(socialMedia => (
                    <SocialMediaView
                        key={socialMedia.iconName}
                        socialMedia={socialMedia}
                    />
                ))}
                <IconButton
                    type='edit'
                    onClick={handleEdit}
                    visible={isAdmin}
                />
            </>
        </div>
    )
}

export { SocialMedias }