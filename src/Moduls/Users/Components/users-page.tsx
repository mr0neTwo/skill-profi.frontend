import React from "react"
import {useNavigate} from "react-router-dom";

import {User} from "../user-types"
import {useDeleteUserMutation, useGetUsersQuery} from "../user-api"

import {Spinner} from "../../../Common/Components/spinner"
import {H1} from "../../../Common/Components/h1"
import {THeader} from "../../../Common/Components/Table/t-header"
import {DataCell} from "../../../Common/Components/Table/data-cell"
import {IconButton} from "../../../Common/Components/icon-button"
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading"
import {DateCell} from "../../../Common/Components/Table/date-cell"
import {Button} from "../../../Common/Components/button"

export interface IUserState {
    editMode: boolean
    user: User | null
}

const UsersPage: React.FC = () => {

    const navigate = useNavigate()

    const { data: users, isLoading, isError,  } = useGetUsersQuery();
    const [deleteUser, { isLoading: isDeleteLoading, isError: idDeleteError}] = useDeleteUserMutation();

    const handleCreate = () => {
        const state: IUserState = {editMode: false, user: null}
        navigate('create', { state })
    }

    const handleEdit = (user: User) => {
        const state: IUserState = { editMode: true, user }
        navigate(`edit/${user.id}`, { state })
    }

    const handleDeleteUser = async (id: number) => {
        deleteUser(id)
    }

    if(isLoading || isDeleteLoading) return <Spinner/>
    if(isError || idDeleteError) return <ErrorDataLoading/>

    return (
        <div className='flex flex-col p-8 gap-4 grow overflow-auto scrollbar-hide w-full'>

            <H1>Пользователи</H1>

            <Button
                type='create'
                text='Новый пользователь'
                onClick={handleCreate}
            />

            <table className='border-spacing-y-2 w-full'>
                <thead>
                    <tr className='bg-surface dark:bg-surface-dark border-b border-solid'>
                        <THeader>Id</THeader>
                        <THeader>Создан</THeader>
                        <THeader>Имя</THeader>
                        <THeader>Email</THeader>
                        <THeader/>
                        <THeader/>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr
                            key={user.id}
                            className='border-b border-solid bg-surface dark:bg-surface-dark hover:bg-green15 dark:hover:bg-green15-dark border-secondary dark:border-secondary-dark'
                        >
                            <DataCell text={user.id.toString()}/>
                            <DateCell timestamp={user.creationDate}/>
                            <DataCell text={user.name}/>
                            <DataCell text={user.email}/>
                            <td>
                                <IconButton
                                    type='edit'
                                    onClick={() => handleEdit(user)}
                                />
                            </td>
                            <td>
                                <IconButton
                                    type='delete'
                                    onClick={() => handleDeleteUser(user.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export {UsersPage}