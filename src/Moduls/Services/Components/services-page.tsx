import React from "react";
import {useNavigate} from "react-router-dom";

import {useDeleteServiceMutation, useGetServiceListQuery} from "../service-api";
import {selectServiceFilter, setPage} from "../service-slice";
import {useAppDispatch, useAppSelector} from "../../../Common/redux";

import {ServiceFoldout} from "./service-foldout";
import {Spinner} from "../../../Common/Components/spinner";
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading";
import {Pagination} from "../../../Common/Components/pagination";
import {IconButton} from "../../../Common/Components/icon-button";
import {Button} from "../../../Common/Components/button";
import {useIsAdminPath} from "../../../Common/use-is-admin-path";
import {Service} from "../service-types";
import {skipToken} from "@reduxjs/toolkit/query";
import {H1} from "../../../Common/Components/h1";

export interface IServiceFormsState {
    editMode: boolean;
    service?: Service;
}

const ServicesPage: React.FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const filter = useAppSelector(selectServiceFilter)

    const {data: response, isLoading, isError } = useGetServiceListQuery(filter ?? skipToken)
    const [ deleteService ] = useDeleteServiceMutation()

    const isAdmin = useIsAdminPath()

    const handleSelectPage = (page: number) => {
        dispatch(setPage(page))
    }

    const handleCreate = () => {

        const state: IServiceFormsState = {editMode: false, service: undefined};
        navigate('/admin/services/create', {state})
    }

    const handleEdit = (service: Service) => {

        const state: IServiceFormsState = {editMode: true, service: service};
        navigate(`/admin/services/${service.id}`, {state})
    }

    const handleDelete = (id: number) => {
        deleteService(id)
    }

    if (isLoading) return <Spinner/>
    if (isError) return <ErrorDataLoading/>;

    return (
        <div className='flex flex-col gap-4 p-8 overflow-auto grow scrollbar-hide'>
            <div className='flex flex-col gap-4'>

                <Button
                    type='create'
                    text='Новая услуга'
                    onClick={handleCreate}
                    visible={isAdmin}
                />

                {!isAdmin && <H1 className='self-center'>Что мы можем сделать</H1>}

                {response?.services.map(service =>
                    <div
                        key={service.id}
                        className='flex items-center gap-4'
                    >
                        <ServiceFoldout
                            key={service.id}
                            title={service.title}
                            text={service.description}
                        />
                        <IconButton
                            type='edit'
                            onClick={() => handleEdit(service)}
                            visible={isAdmin}
                        />
                        <IconButton
                            type='delete'
                            onClick={() => handleDelete(service.id)}
                            visible={isAdmin}
                        />
                    </div>
                )}

            </div>

            {response && response.count > filter.pageSize &&

                <Pagination
                    totalItems={response.count}
                    currentPage={response.pageNumber}
                    totalPages={response.totalPages}
                    onPageSelected={handleSelectPage}
                />
            }
        </div>
    )
}

export {ServicesPage}

