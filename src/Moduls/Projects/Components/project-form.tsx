import React, {useRef, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom"

import {IProjectFormState} from "./project-view"
import {useCreateProjectMutation, useUpdateProjectMutation} from "../project-api"
import {FIELD_LIMITS} from "../../../Common/field-limits"
import {baseUrl} from "../../../Common/baseApi"

import {IInputRef, Input} from "../../../Common/Components/input"
import {Spinner} from "../../../Common/Components/spinner"
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading"
import {TextAria} from "../../../Common/Components/text-area"
import {Button} from "../../../Common/Components/button"
import {ImageForm} from "../../../Common/Components/image-form"

const ProjectForm: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {editMode, project} = location.state as IProjectFormState

    const [title, setTitle] = useState<string>(project?.title || '');
    const [description, setDescription] = useState<string>(project?.description || '');
    const [imageBase64, loadImageBase64] = useState<string | null>(null);

    const titleRef = useRef<IInputRef>(null);
    const descriptionRef = useRef<IInputRef>(null);

    const [createProject, { isLoading: isCreateLoading, isError: isCreateError}] = useCreateProjectMutation()
    const [updateProject, { isLoading: isUpdateLoading, isError: isUpdateError}] = useUpdateProjectMutation()

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
            await createProject({ title, description, imageBase64 }).unwrap();
            navigate('/admin/projects');
        } catch (err) {
        }
    };

    const handleUpdate = async () => {

        console.log(imageBase64)

        if(!project) {
            return
        }

        if(!validateForm()){
            return
        }

        try {
            await updateProject({
                id:project.id,
                title,
                description,
                imageBase64
            }).unwrap();
            navigate('/admin/projects');
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

            <div className='text-3xl text-main dark:text-main-dark py-5'>{editMode ? 'Редактировать проект' : 'Новый проект'}</div>

            <div className='flex flex-col gap-4 w-[800px] h-full overflow-y-auto scrollbar-hide overflow-x-visible'>

                <ImageForm
                     defaultImageUrl={project && project.imageUrl ? `${baseUrl}/${project.imageUrl}` : '/no-image.png'}
                     loadedImage={imageBase64}
                     loadImage={image => loadImageBase64(image)}
                />

                <Input
                    ref={titleRef}
                    label='Заголовок'
                    onChange={text => setTitle(text)}
                    value={title}
                    required={true}
                    limit={FIELD_LIMITS.ProjectTitleMaxLength}
                />

                <TextAria
                    ref={descriptionRef}
                    label='Описание'
                    onChange={text => setDescription(text)}
                    value={description}
                    required={true}
                    limit={FIELD_LIMITS.ProjectDescriptionMaxLength}
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

export {ProjectForm}