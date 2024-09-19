import React, {useState} from "react"

import {Skeleton} from "../../../Common/Components/Skeleton";

interface IMap{
    link: string
    width?: number
    height?: number
}

const GoogleMap: React.FC<IMap> = ({link, width=450, height=300}) => {

    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
        setLoading(false);
    }

    return (
        <>
            {loading && <Skeleton width={width} height={height} className='bg-secondary'/>}
            <iframe
                className={loading ? 'opacity-0 absolute' : 'opacity-100 static'}
                title="Google Map"
                src={link}
                width={width}
                height={height}
                allowFullScreen={false}
                loading="lazy"
                onLoad={handleLoad}
            />
        </>
    )
}

export { GoogleMap }