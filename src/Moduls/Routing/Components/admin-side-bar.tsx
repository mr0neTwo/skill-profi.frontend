import React, {useState} from "react";

import {adminLinks} from "../links-data";
import {SiteItemKeys} from "../../../Common/site-item-keys";

import {AppLink} from "./app-link";
import {IconButton} from "../../../Common/Components/icon-button";
import {ThemeSwitcher} from "./theme-switcher";

const AdminSideBar : React.FC = () => {

    const [editMode, setEditMode] = useState<boolean>(false);

    return (
        <aside className='border-r-2 border-secondary dark:border-secondary-dark box-border w-48 bg-surface dark:bg-surface-dark'>
            <div className='flex flex-col justify-between h-full box-border'>
                <div className='flex flex-col pb-14 gap-2.5 relative'>

                    <div className='flex p-2.5 justify-between'>
                        <ThemeSwitcher/>
                        <IconButton
                            type='edit'
                            onClick={() => setEditMode(!editMode)}
                        />
                    </div>


                    {adminLinks.map(link => (
                        <AppLink
                            key={link.dataKey}
                            to={link.path}
                            dataKey={link.dataKey}
                            orientation='vertical'
                            rootPathLength={8}
                            editable={editMode}
                        />
                    ))}
                </div>
                <div className='flex flex-col gap-2.5'>
                    <AppLink
                        to={'/'}
                        dataKey={SiteItemKeys.ToSite}
                        orientation='vertical'
                        rootPathLength={8}
                    />
                    <AppLink 
                        to={'/logout'}
                        dataKey={SiteItemKeys.Logout}
                        orientation='vertical'
                        rootPathLength={8}
                    />
                </div>
            </div>
        </aside>
    )
}

export { AdminSideBar }