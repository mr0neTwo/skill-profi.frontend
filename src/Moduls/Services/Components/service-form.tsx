import React, {useRef, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom"

import {IServiceFormsState} from "./services-page"
import {useCreateServiceMutation, useUpdateServiceMutation} from "../service-api"
import {FIELD_LIMITS} from "../../../Common/field-limits"

import {IInputRef, Input} from "../../../Common/Components/input"
import {Spinner} from "../../../Common/Components/spinner"
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading"
import {TextAria} from "../../../Common/Components/text-area"
import {Button} from "../../../Common/Components/button"

const ServiceForm: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {editMode, service} = location.state as IServiceFormsState

    const [title, setTitle] = useState<string>(service?.title || '');
    const [description, setDescription] = useState<string>(service?.description || '');

    const titleRef = useRef<IInputRef>(null);
    const descriptionRef = useRef<IInputRef>(null);

    const [createService, { isLoading: isCreateLoading, isError: isCreateError}] = useCreateServiceMutation()
    const [updateService, { isLoading: isUpdateLoading, isError: isUpdateError}] = useUpdateServiceMutation()

    const validateForm = ():boolean => {

        const isTitleValid = titleRef.current && titleRef.current.validate()
        const isDescriptionValid = descriptionRef.current && descriptionRef.current.validate()

        return (isTitleValid && isDescriptionValid) || false
    }

    const handleCreate = async () => {

        if(!validateForm()){
            return
        }

        try {
            await createService({ title, description }).unwrap();
            navigate('/admin/services');
        } catch (err) {
        }
    };

    const handleUpdate = async () => {

        if(!service) {
            return
        }

        if(!validateForm()){
            return
        }

        try {
            await updateService({
                id:service.id,
                title,
                description
            }).unwrap();
            navigate('/admin/services');
        } catch (err) {
        }
    };

    const handleBack = () => {
        navigate(-1)
    }

    if(isCreateLoading || isUpdateLoading ) return <Spinner />;
    if(isCreateError || isUpdateError) return <ErrorDataLoading/>;

    return (
        <div className='flex flex-col p-5 h-screen'>

            <div className='text-3xl text-main dark:text-main-dark py-5'>{editMode ? 'Редактировать услугу' : 'Новая услуга'}</div>

            <div className='flex flex-col gap-4 w-[800px] h-full overflow-y-auto scrollbar-hide overflow-x-visible'>
                <Input
                    ref={titleRef}
                    label='Заголовок'
                    onChange={text => setTitle(text)}
                    value={title}
                    required={true}
                    limit={FIELD_LIMITS.ServiceTitleMaxLength}
                />

                <TextAria
                    ref={descriptionRef}
                    label='Описание'
                    onChange={text => setDescription(text)}
                    value={description}
                    required={true}
                    limit={FIELD_LIMITS.ServiceDescriptionMaxLength}
                />
            </div>

            <div className='flex gap-6 shrink-0 pt-6'>
                <Button
                    type='primary'
                    text='создать'
                    onClick={handleCreate}
                    visible={!editMode}
                />
                <Button
                    type='primary'
                    text='Сохранить'
                    onClick={handleUpdate}
                    visible={editMode}
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
export { ServiceForm }