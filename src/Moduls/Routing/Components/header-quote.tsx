import React from "react"

import {SiteItemKeys} from "../../../Common/site-item-keys"

import {Quote} from "../../Main/quote"

const HeaderQuote: React.FC = () => {
    return (
        <Quote
            className='p-6 text-4xl text-main dark:text-main-dark font-qoute min-w-[550px]'
            dataKey={SiteItemKeys.TitleQuote}
        />
    )
}
export { HeaderQuote };