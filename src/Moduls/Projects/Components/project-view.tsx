import React from "react"
import {useNavigate} from "react-router-dom"

import {baseUrl} from "../../../Common/baseApi"
import {Project} from "../project-types"
import {useIsAdminPath} from "../../../Common/use-is-admin-path";

import {IconButton} from "../../../Common/Components/icon-button";
import {useDeleteProjectMutation} from "../project-api";
import {Spinner} from "../../../Common/Components/spinner";
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading";

interface IProjectView {
    project: Project
}

export interface IProjectDetailsState {
    project: Project
}

export interface IProjectFormState {
    project: Project | null
    editMode: boolean
}

const ProjectView: React.FC<IProjectView> = ({project}) => {

    const navigate = useNavigate();
    const isAdmin = useIsAdminPath()

    const [deleteProject, { isLoading, isError}] = useDeleteProjectMutation()

    const handleSelect = () => {
        const state : IProjectDetailsState = {project}
        navigate(`${project.id}`, {state});
    }

    const handleEdit = () => {
        const state : IProjectFormState = {project, editMode: true}
        navigate(`edit/${project.id}`, {state});
    }

    const handleDelete = () => {
        deleteProject(project.id)
    }

    if(isLoading) return <Spinner/>
    if(isError) return <ErrorDataLoading/>

    return (
        <div>
            <div
                className={`w-96 rounded-lg shadow-sm overflow-hidden border  border-secondary dark:border-secondary-dark ${isAdmin ? '' : 'cursor-pointer'}`}
                onClick={isAdmin ? undefined : handleSelect}
            >
                <img
                    className='w-96 h-52'
                    src={project.imageUrl ? `${baseUrl}/${project.imageUrl}` : '/no-image.png'}
                    alt='image'
                />
                <div className='p-4 text-center border-t border-secondary dark:border-secondary-dark'>
                    {project.title}
                </div>
            </div>
            <div className='flex p-4 gap-4 justify-end'>
                <IconButton
                    type='edit'
                    onClick={handleEdit}
                    visible={isAdmin}
                />
                <IconButton
                    type='delete'
                    onClick={handleDelete}
                    visible={isAdmin}
                />
            </div>
        </div>
    )
}

export { ProjectView }