import React, {useRef, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom"

import {IUserState} from "./users-page"
import {FIELD_LIMITS} from "../../../Common/field-limits"
import {useCreateUserMutation, useUpdateUserMutation} from "../user-api"

import {IInputRef, Input} from "../../../Common/Components/input"
import {Button} from "../../../Common/Components/button"
import {Spinner} from "../../../Common/Components/spinner"
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading"
import {validatePassword} from "../validate-password";

const UserForms: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {editMode, user} = location.state as IUserState

    const [name, setName] = useState<string>(user?.name ?? '');
    const [email, setEmail] = useState<string>(user?.email ?? '');
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const nameRef = useRef<IInputRef>(null);
    const emailRef = useRef<IInputRef>(null);
    const passwordRef = useRef<IInputRef>(null);

    const [createUser, { isLoading: isCreateLoading, isError: isCreateError}] = useCreateUserMutation()
    const [updateUser, { isLoading: isUpdateLoading, isError: isUpdateError}] = useUpdateUserMutation()

    const validateForm = ():boolean => {

        const isNameValid = nameRef.current && nameRef.current.validate()
        const isEmailValid = emailRef.current && emailRef.current.validate()
        const isPasswordInputValid = editMode || (passwordRef.current && passwordRef.current.validate())

        return (isNameValid && isEmailValid && isPasswordInputValid) || false
    }

    const handleCreate = async () => {

        if(!validateForm()){
            return
        }

        const validateResult = validatePassword(password)

        if(!validateResult.isValid){
            setError(validateResult.errorMessage)
            return
        }

        try {
            await createUser({ name, email, password }).unwrap();
            navigate('/admin/users');
        } catch (err) {
        }
    }

    const handleUpdate = async () => {

        if(!user) {
            return
        }

        if(!validateForm()){
            return
        }

        if(password !== ''){

            const validateResult = validatePassword(password)

            if(!validateResult.isValid){
                setError(validateResult.errorMessage)
                return
            }
        }

        try {
            await updateUser({
                id: user.id,
                name: name === user.name ? undefined : name,
                email: email === user.email ? undefined : email,
                password: password === '' ? undefined : password,
            }).unwrap();
            navigate('/admin/users');
        } catch (err) {
        }
    }

    const handlePasswordChange = (password: string) => {
        setError('')
        setPassword(password)
    }

    const handleBack = () => {
        navigate(-1)
    }

    if(isCreateLoading || isUpdateLoading ) return <Spinner />
    if(isCreateError || isUpdateError) return <ErrorDataLoading/>

    return (
        <div className='flex flex-col p-5 h-screen'>

            <div
                className='text-3xl text-main dark:text-main-dark py-5'>{editMode ? 'Редактировать пользователя' : 'Новый пользователь'}</div>

            <div className='flex flex-col gap-4 w-[800px] h-full overflow-y-auto scrollbar-hide overflow-x-visible'>
                <Input
                    ref={nameRef}
                    label='Имя'
                    onChange={text => setName(text)}
                    value={name}
                    required={true}
                    limit={FIELD_LIMITS.UserNameMaxLength}
                />
                <Input
                    ref={emailRef}
                    label='Email'
                    onChange={text => setEmail(text)}
                    value={email}
                    required={true}
                    limit={FIELD_LIMITS.UserEmailMaxLength}
                />
                <Input
                    ref={passwordRef}
                    label='Пароль'
                    onChange={handlePasswordChange}
                    value={password}
                    required={!editMode}
                    password={true}
                    limit={FIELD_LIMITS.UserPasswordMaxLength}
                />
                <div className='text-red dark:text-red-dark'>{error}</div>
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

export {UserForms}