import React, {useState} from "react"
import {ClientRequestForms} from "./client-request-forms"
import {Button} from "../../Common/Components/button"
import {useIsAdminPath} from "../../Common/use-is-admin-path"
import { Quote } from "./quote"
import {SiteItemKeys} from "../../Common/site-item-keys"

const MainPage: React.FC = () => {

    const isAdmin = useIsAdminPath()
    const [showForms, setShowForms] = useState<boolean>(false)

    return (
        <div className='relative flex flex-col grow mt-8'>
            <img  className='w-[1000px] opacity-60' src='/baner.jpg' alt='baner'/>
            <Quote
                className='absolute top-5 left-80 min-w-[680px]'
                dataKey={SiteItemKeys.MainQuote}
            />
            <Button
                className='absolute top-96 left-24'
                type='primary'
                text='Оставить заявку'
                onClick={() => setShowForms(!showForms)}
            />

            {showForms && !isAdmin && <ClientRequestForms/>}

        </div>
    )
}

export { MainPage }