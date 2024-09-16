import React from "react"
import {useNavigate} from "react-router-dom"

import {Post} from "../blog-types"
import {useIsAdminPath} from "../../../Common/use-is-admin-path"
import {useDeletePostMutation} from "../blog-api"
import {baseUrl} from "../../../Common/baseApi"

import {Spinner} from "../../../Common/Components/spinner"
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading"
import {IconButton} from "../../../Common/Components/icon-button"

interface IPost {
    post: Post
}

export interface IPostDetailsState {
    post: Post
}

export interface IPostFormState {
    post: Post | null
    editMode: boolean
}

const options: Intl.DateTimeFormatOptions  = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

const timestampToString = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString("ru-RU", options)
}

const PostView: React.FC<IPost> = ({ post }) => {

    const navigate = useNavigate();
    const isAdmin = useIsAdminPath()

    const [deletePost, { isLoading, isError}] = useDeletePostMutation()

    const handleSelect = () => {
        const state : IPostDetailsState = {post}
        navigate(`${post.id}`, {state});
    }

    const handleEdit = () => {
        const state : IPostFormState = {post, editMode: true}
        navigate(`edit/${post.id}`, {state});
    }

    const handleDelete = () => {
        deletePost(post.id)
    }

    if(isLoading) return <Spinner/>
    if(isError) return <ErrorDataLoading/>

    return (
        <div>
            <div
                className={`w-72 max-h-96 overflow-hidden ${isAdmin ? '' : 'cursor-pointer'}`}
                onClick={isAdmin ? undefined : handleSelect}
            >
                <div className='p-2'>{timestampToString(post.creationDate)}</div>

                <img
                    className='w-72 h-44'
                    src={post.imageUrl ? `${baseUrl}/${post.imageUrl}` : '/no-image.png'}
                    alt='image'
                />
                <div className='p-2.5 text-center'>
                    {post.title}
                </div>
                <div className='text-secondary dark:text-secondary-dark text-ellipsis text-justify'>
                    {post.description}
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

export { PostView }