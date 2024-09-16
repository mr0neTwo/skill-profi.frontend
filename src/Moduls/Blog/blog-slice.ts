import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {GetPostListDto} from "./blog-types"
import {rootReducer} from "../../Common/redux"

interface IPostState {
    pageSize: number,
    pageNumber: number
}

const initialState: IPostState = {
    pageSize: 8,
    pageNumber: 1
}

const blogSlice = createSlice({

    name: "blog",
    initialState,

    reducers: {

        setPage: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        }
    },
    selectors: {

        selectPostFilter: createSelector(
            (state: IPostState) => state.pageNumber,
            (state: IPostState) => state.pageSize,
            (pageNumber, pageSize): GetPostListDto => ({pageNumber, pageSize})
        )
    }
}).injectInto(rootReducer)

export const { setPage } = blogSlice.actions;
export const { selectPostFilter } = blogSlice.selectors;