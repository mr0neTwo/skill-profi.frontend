import React, {useMemo, useRef, useState} from "react";
import {Link, useMatch} from "react-router-dom";

import {useGetSiteItemQuery, useUpdateSiteItemMutation} from "../../SiteItem/site-item-api";
import {ILink} from "./i-link";

import {IInputRef, Input} from "../../../Common/Components/input";
import {IconButton} from "../../../Common/Components/icon-button";
import {useIsAdminPath} from "../../../Common/use-is-admin-path";
import {Skeleton} from "../../ClientMessagess/Components/Skeleton";

const AppLink: React.FC<ILink> = ({to, dataKey, rootPathLength, orientation, editable = false}) => {

    const isAdmin = useIsAdminPath()
    const {data: siteItem, isLoading, isError} = useGetSiteItemQuery(dataKey);
    const [updateSiteItem] = useUpdateSiteItemMutation();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const inputRef = useRef<IInputRef>(null);

    const matchBase = useMatch({
        path: to,
        end: to.length <= rootPathLength
    })

    const classes = useMemo(() => {

        let classes = `flex px-4 py-4 px-2`

        if (matchBase) {
            classes += ' font-bold border-green bg-green30 dark:bg-green15'
            classes += orientation === 'horizontal' ? ' border-b-4 rounded-sm' : ''
            classes += orientation === 'vertical' ? ' border-l-4' : ''
        }

        return classes
    }, [orientation, matchBase])

    const handleEditButtonClick = () => {
        setEditMode(true)
        setTitle(siteItem?.title || '')
        setTimeout(() => inputRef.current?.focus(), 10)
    }

    const handelEnterPressed = () => {
        setEditMode(false);
        if(siteItem){
            updateSiteItem({key: siteItem.key, title})
        }
    }

    if (isLoading) return <Skeleton className='bg-secondary my-2 mx-2' width={85} height={30}/>
    if (isError) return  <Skeleton className='bg-red my-2 mx-2' width={85} height={30}/>

    return (
        <div className='relative'>
            {editMode ?
                <Input
                    ref={inputRef}
                    onChange={value => setTitle(value)}
                    value={title}
                    onEnterPress={handelEnterPressed}
                    onBlur={() => setEditMode(false)}
                    limit={20}
                />
                :
                <Link
                    to={to}
                    className={classes}
                >
                    {siteItem?.title}
                </Link>
            }
            {isAdmin && editable && !editMode &&
                <IconButton
                    type='edit'
                    className='absolute right-0 top-0 w-7 h-7'
                    onClick={handleEditButtonClick}
                />
            }
        </div>
    )
}

export { AppLink }