import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {AppState} from "../../Common/redux";
import {GetProjectListDto} from "./project-types";

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
    }
})

export const { setPage } = projectSlice.actions;
export default projectSlice.reducer

export const selectProjectFilter = (state: AppState): GetProjectListDto => ({
    pageNumber : state.project.pageNumber,
    pageSize: state.project.pageSize
})