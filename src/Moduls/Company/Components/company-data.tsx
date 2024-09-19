import React from "react"
import {useNavigate} from "react-router-dom"

import {Company} from "../company-types"
import {useIsAdminPath} from "../../../Common/use-is-admin-path"

import {IconButton} from "../../../Common/Components/icon-button"

interface ICompanyData {
    company: Company | undefined
}

const CompanyData: React.FC<ICompanyData> = ({ company }) => {

    const navigate = useNavigate()
    const isAdmin = useIsAdminPath()

    const handleEdit = () => {
        navigate('edit')
    }

    return (
        <div>
            <div className='flex gap-2.5'>
                <div className='font-bold text-2xl py-2'>{company?.name}</div>
                <IconButton
                    onClick={handleEdit}
                    type='edit'
                    visible={isAdmin}
                />
            </div>
            <div className='flex'>
                <div className='w-24'>Адрес:</div>
                <div>{company?.address}</div>
            </div>
            <div className='flex'>
                <div className='w-24'>Email:</div>
                <div>{company?.email}</div>
            </div>
            <div className='flex'>
                <div className='w-24'>Телефон:</div>
                <div>{company?.phoneNumber}</div>
            </div>
            <div className='flex'>
                <div className='w-24'>Директор:</div>
                <div>{company?.directorName}</div>
            </div>
        </div>
    )
}

export {CompanyData}