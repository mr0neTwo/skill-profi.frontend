import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

import {UpdateCompanyDto} from "../company-types"
import {FIELD_LIMITS} from "../../../Common/field-limits"
import {useGetCompanyQuery, useUpdateCompanyMutation} from "../company-api"

import {Button} from "../../../Common/Components/button"
import {Input} from "../../../Common/Components/input"

const CompanyForms: React.FC = () => {

    const navigate = useNavigate();

    const {data: company} = useGetCompanyQuery()
    const [saveCompany] = useUpdateCompanyMutation()

    const [name, setName] = useState<string>(company?.name || '');
    const [address, setAddress] = useState<string>(company?.address || '');
    const [email, setEmail] = useState<string>(company?.email || '');
    const [phoneNumber, setPhoneNumber] = useState<string>(company?.phoneNumber || '');
    const [directorName, setDirectorName] = useState<string>(company?.directorName || '');
    const [mapLink, setMapLink] = useState<string>(company?.mapLink || '');

    const handleSave = () => {

        const updateCompanyDto : UpdateCompanyDto = {
            name, address, email, phoneNumber, directorName, mapLink
        }

        saveCompany(updateCompanyDto)
        navigate('/admin/contacts')
    }

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className='flex flex-col p-8 gap-4 justify-between h-full'>
            <div className='flex flex-col gap-4 w-[600px]'>
                <Input
                    label='Название организации'
                    onChange={setName}
                    value={name}
                    limit={FIELD_LIMITS.CompanyNameMaxLength}
                />
                <Input
                    label='Адрес'
                    onChange={setAddress}
                    value={address}
                    limit={FIELD_LIMITS.CompanyAddressMaxLength}
                />
                <Input
                    label='Email'
                    onChange={setEmail}
                    value={email}
                    limit={FIELD_LIMITS.CompanyEmailMaxLength}
                />
                <Input
                    label='Телефон'
                    onChange={setPhoneNumber}
                    value={phoneNumber}
                    limit={FIELD_LIMITS.CompanyPhoneMaxLength}
                />
                <Input
                    label='Директор'
                    onChange={setDirectorName}
                    value={directorName}
                    limit={FIELD_LIMITS.CompanyDirectorNameMaxLength}
                />
                <Input
                    label='Ссылка на google map'
                    onChange={setMapLink}
                    value={mapLink}
                    limit={FIELD_LIMITS.CompanyMapLinkMaxLength}
                />
            </div>

            <div className='flex gap-4'>
                <Button
                    type='primary'
                    text='Сохранить'
                    onClick={handleSave}
                />
                <Button
                    type='secondary'
                    text='Назад'
                    onClick={handleBack}
                />
            </div>
        </div>
    )
}

export { CompanyForms }