import React from "react"
import {useNavigate} from "react-router-dom"
import {skipToken} from "@reduxjs/toolkit/query"

import {useAppDispatch, useAppSelector} from "../../../Common/redux"
import {useGetPostListQuery} from "../blog-api"
import {selectPostFilter} from "../blog-slice"
import {setPage} from "../blog-slice"

import {IPostFormState, PostView} from "./post";
import {Spinner} from "../../../Common/Components/spinner"
import {ErrorDataLoading} from "../../../Common/Components/error-data-loading"
import {useIsAdminPath} from "../../../Common/use-is-admin-path"
import {Pagination} from "../../../Common/Components/pagination"
import {H1} from "../../../Common/Components/h1";
import {Button} from "../../../Common/Components/button";

const BlogPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAdmin = useIsAdminPath()

    const filter = useAppSelector(selectPostFilter);
    const {data: response, isLoading, isError } = useGetPostListQuery(filter ?? skipToken)

    const handleSelectPage = (page: number) => {
        dispatch(setPage(page))
    }

    const handleCreatePost = () => {
        const state: IPostFormState = {editMode: false, post: null}
        navigate('create', {state})
    }

    if(isLoading) return <Spinner/>
    if (isError) return <ErrorDataLoading/>

    return (
        <div className='flex flex-col p-8 gap-8 h-full justify-between max-w-[1400px]'>

            <Button
                type='create'
                text='Новый пост'
                onClick={handleCreatePost}
                visible={isAdmin}
            />

            <div className='flex flex-col gap-4'>

                {!isAdmin && <H1 className='self-center'>Блог</H1>}

                <div className={`flex flex-wrap gap-8 ${isAdmin ? 'justify-start' : 'justify-center'}`}>
                    {response?.posts.map(post => (
                        <PostView
                            key={post.id}
                            post={post}
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

export { BlogPage }