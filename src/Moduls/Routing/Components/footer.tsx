import React from "react"

import {SocialMedias} from "../../Company/Components/social-medias";

const Footer: React.FC = () => {
    return (
        <footer className='flex justify-center items-center divide-solid border-t lightgrey text-center h-40 p-4'>
            <SocialMedias/>
        </footer>
    )
}

export {Footer}