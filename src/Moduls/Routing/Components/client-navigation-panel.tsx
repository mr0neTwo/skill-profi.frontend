import React from "react"

import {useAppSelector} from "../../../Common/redux";
import {clientLinks} from "../links-data"
import {SiteItemKeys} from "../../../Common/site-item-keys"
import {selectIsLogin} from "../../Autorization/auth-slice"

import {AppLink} from "./app-link"

const ClientNavigationPanel: React.FC = ()=> {

    const isLogin = useAppSelector(selectIsLogin);

    return(
        <nav>
            <div className='flex gap-5'>
                {clientLinks.map(link => (
                    <AppLink
                        key={link.dataKey}
                        to={link.path}
                        dataKey={link.dataKey}
                        orientation='horizontal'
                        rootPathLength={1}
                    />
                ))}
                {isLogin ?
                    <AppLink
                        to={'/admin'}
                        dataKey={SiteItemKeys.Edit}
                        rootPathLength={1}
                        orientation='horizontal'
                    />
                    :
                    <AppLink
                        to={'/login'}
                        dataKey={SiteItemKeys.Login}
                        orientation='horizontal'
                        rootPathLength={1}
                    />
                }
            </div>
        </nav>
    )
}

export { ClientNavigationPanel }