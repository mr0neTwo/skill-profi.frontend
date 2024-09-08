import React from "react";
import {useLocation, useNavigate} from "react-router-dom"

import {IProjectDetailsState} from "./project-view"
import {baseUrl} from "../../../Common/baseApi"

import {Button} from "../../../Common/Components/button";

const ProjectDetails: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { project } = location.state as IProjectDetailsState;

    return (
        <div className='flex flex-col max-w-[800px] p-8 gap-8 items-center'>
            <img
                className='w-full h-auto'
                src={`${baseUrl}/${project.imageUrl}`}
                alt='image'
            />
            <div className='text-2xl'>{project.title}</div>
            <div>{project.description}</div>
            <div className='self-start'>
                <Button
                    type='secondary'
                    text='Назад'
                    onClick={() => navigate(-1)}
                />
            </div>
        </div>
    )
}

export {ProjectDetails}