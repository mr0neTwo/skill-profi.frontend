import React, {useRef, useState} from "react"

import {useIsAdminPath} from "../../Common/use-is-admin-path"
import {FIELD_LIMITS} from "../../Common/field-limits"
import {useGetSiteItemQuery, useUpdateSiteItemMutation} from "../SiteItem/site-item-api"

import {IInputRef, Input} from "../../Common/Components/input"
import {Skeleton} from "../../Common/Components/Skeleton"
import {IconButton} from "../../Common/Components/icon-button"

interface IMainQuote {
    className?: string;
    dataKey: string;
}

const Quote: React.FC<IMainQuote> = ({className, dataKey}) => {

    const isAdmin = useIsAdminPath()
    const {data: siteItem, isLoading, isError} = useGetSiteItemQuery(dataKey);
    const [updateSiteItem] = useUpdateSiteItemMutation();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const inputRef = useRef<IInputRef>(null);

    const handelEnterPressed = () => {
        setEditMode(false);
        if(siteItem){
            updateSiteItem({key: siteItem.key, title})
        }
    }

    const handleEditButtonClick = () => {
        setEditMode(true)
        setTitle(siteItem?.title || '')
        setTimeout(() => inputRef.current?.focus(), 10)
    }

    if(isLoading) return <Skeleton className={`bg-secondary my-5 ${className}`} width={500} height={30} />;
    if(isError) return <Skeleton className={`bg-red my-5 ${className}`} width={500} height={30}/>;

    return (
        <div className={`${className} flex gap-4`}>
            {editMode ?
                <Input
                    ref={inputRef}
                    onChange={value => setTitle(value)}
                    value={title}
                    onEnterPress={handelEnterPressed}
                    onBlur={() => setEditMode(false)}
                    limit={FIELD_LIMITS.SiteItemTitleMaxLength}
                />
                :
                <div className={'text-4xl text-main dark:text-main-dark drop-shadow-md'}>{siteItem?.title}</div>
            }

            {isAdmin && !editMode &&
                <IconButton
                    type='edit'
                    onClick={handleEditButtonClick}
                />
            }
        </div>
    )
}

export { Quote }