import React from "react"

import {useGetCompanyQuery} from "../company-api"

import {Spinner} from "../../../Common/Components/spinner"
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading"
import {H1} from "../../../Common/Components/h1"
import {GoogleMap} from "./google-map"
import {CompanyData} from "./company-data"
import {useIsAdminPath} from "../../../Common/use-is-admin-path"
import {SocialMedias} from "./social-medias"

const CompanyPage: React.FC = () => {

    const isAdmin = useIsAdminPath()
    const {data: company, isLoading, isError} = useGetCompanyQuery()

    if(isLoading) return <Spinner />
    if(isError) return <ErrorDataLoading />

    return (
        <div className={`flex p-8 flex-col ${isAdmin ? 'items-start' : 'items-center'} gap-8`}>

            {!isAdmin && <H1>Контакты</H1>}

            <div className={`flex justify-center gap-8 items-center`}>

                <div className='flex flex-col gap-4'>
                    <CompanyData company={company}/>
                    <SocialMedias/>
                </div>

                <GoogleMap link={company?.mapLink || ''}/>

            </div>
        </div>
    )
}

export {CompanyPage}