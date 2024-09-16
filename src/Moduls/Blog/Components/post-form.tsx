import React, {useRef, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom"

import {IPostFormState} from "./post"
import {baseUrl} from "../../../Common/baseApi"
import {FIELD_LIMITS} from "../../../Common/field-limits"
import {useCreatePostMutation, useUpdatePostMutation} from "../blog-api"

import {IInputRef, Input} from "../../../Common/Components/input"
import {TextAria} from "../../../Common/Components/text-area"
import {Button} from "../../../Common/Components/button"
import {Spinner} from "../../../Common/Components/spinner"
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading"
import {ImageForm} from "../../../Common/Components/image-form"

const PostForm: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {editMode, post} = location.state as IPostFormState

    const [title, setTitle] = useState<string>(post?.title || '');
    const [description, setDescription] = useState<string>(post?.description || '');
    const [imageBase64, loadImageBase64] = useState<string | null>(null);

    const titleRef = useRef<IInputRef>(null);
    const descriptionRef = useRef<IInputRef>(null);

    const [createPost, { isLoading: isCreateLoading, isError: isCreateError}] = useCreatePostMutation()
    const [updatePost, { isLoading: isUpdateLoading, isError: isUpdateError}] = useUpdatePostMutation()

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
            await createPost({ title, description, imageBase64 }).unwrap();
            navigate('/admin/blog');
        } catch (err) {
        }
    };

    const handleUpdate = async () => {

        console.log(imageBase64)

        if(!post) {
            return
        }

        if(!validateForm()){
            return
        }

        try {
            await updatePost({
                id:post.id,
                title,
                description,
                imageBase64
            }).unwrap();
            navigate('/admin/blog');
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

            <div className='text-3xl text-main dark:text-main-dark py-5'>{editMode ? 'Редактировать пост' : 'Новый пост'}</div>

            <div className='flex flex-col gap-4 w-[800px] h-full overflow-y-auto scrollbar-hide overflow-x-visible'>

                <ImageForm
                    defaultImageUrl={post && post.imageUrl ? `${baseUrl}/${post.imageUrl}` : '/no-image.png'}
                    loadedImage={imageBase64}
                    loadImage={image => loadImageBase64(image)}
                />

                <Input
                    ref={titleRef}
                    label='Заголовок'
                    onChange={text => setTitle(text)}
                    value={title}
                    required={true}
                    limit={FIELD_LIMITS.PostTitleMaxLength}
                />

                <TextAria
                    ref={descriptionRef}
                    label='Описание'
                    onChange={text => setDescription(text)}
                    value={description}
                    required={true}
                    limit={FIELD_LIMITS.PostDescriptionMaxLength}
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

export {PostForm}