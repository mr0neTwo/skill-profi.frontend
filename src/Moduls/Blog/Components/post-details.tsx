import React from "react"
import {useLocation, useNavigate} from "react-router-dom"

import {IPostDetailsState} from "./post";
import {baseUrl} from "../../../Common/baseApi"

import {Button} from "../../../Common/Components/button";

const PostDetails: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { post } = location.state as IPostDetailsState;

    return (
        <div className='flex flex-col max-w-[800px] p-8 gap-8 items-center'>

            <img
                className='w-full h-auto'
                src={`${baseUrl}/${post.imageUrl}`}
                alt='image'
            />
            <div className='text-2xl'>{post.title}</div>

            <div>{post.description}</div>

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

export {PostDetails}