import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {GetProjectListDto} from "./project-types"
import {rootReducer} from "../../Common/redux"

interface IProjectState {
    pageSize: number,
    pageNumber: number
}

const initialState: IProjectState = {
    pageSize: 9,
    pageNumber: 1
}


const projectSlice = createSlice({

    name: "project",
    initialState,

    reducers: {

        setPage: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        }
    },
    selectors: {

        selectProjectFilter: createSelector(
            (state: IProjectState) => state.pageNumber,
            (state: IProjectState) => state.pageSize,
            (pageNumber, pageSize): GetProjectListDto => ({pageNumber, pageSize})
        )
    }
}).injectInto(rootReducer)

export const { setPage } = projectSlice.actions;
export const { selectProjectFilter } = projectSlice.selectors
