import React from "react"
import {useNavigate} from "react-router-dom"
import {skipToken} from "@reduxjs/toolkit/query"

import {useAppDispatch, useAppSelector} from "../../../Common/redux"
import {useIsAdminPath} from "../../../Common/use-is-admin-path"
import {useGetProjectListQuery} from "../project-api"
import {setPage} from "../project-slice"
import {selectProjectFilter} from "../project-slice"

import {IProjectFormState, ProjectView} from "./project-view"
import {Spinner} from "../../../Common/Components/spinner"
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading"
import {Pagination} from "../../../Common/Components/pagination"
import {Button} from "../../../Common/Components/button"
import {H1} from "../../../Common/Components/h1";

const ProjectsPage:React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAdmin = useIsAdminPath()

    const filter = useAppSelector(selectProjectFilter)
    const {data: response, isLoading, isError } = useGetProjectListQuery(filter ?? skipToken)

    const handleSelectPage = (page: number) => {
        dispatch(setPage(page))
    }

    const handleCreateProject = () => {
        const state: IProjectFormState = {editMode: false, project: null}
        navigate('create', {state})
    }

    if(isLoading) return <Spinner/>
    if(isError) return <ErrorDataLoading/>;

    return (
        <div className='flex flex-col gap-8 p-8 justify-between max-w-[1400px] grow'>

            <div className='flex flex-col gap-4'>
                <Button
                    type='create'
                    text='Новый проект'
                    onClick={handleCreateProject}
                    visible={isAdmin}
                />

                {!isAdmin && <H1 className='self-center'>Проекты</H1>}

                <div className={`flex flex-wrap gap-8 ${isAdmin ? 'justify-start' : 'justify-center'}`}>
                    {response?.projects.map(project => (
                        <ProjectView
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>
            </div>

            {response && response.count > filter.pageSize  &&
                <div className='flex self-center p-4'>
                    <Pagination
                        totalItems={response.count}
                        currentPage={response.pageNumber}
                        totalPages={response.totalPages}
                        onPageSelected={handleSelectPage}
                    />
                </div>
            }

        </div>
    )
}

export { ProjectsPage }