import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {GetServiceListDto} from "./service-types"
import {rootReducer} from "../../Common/redux"

interface IServiceState {
    pageSize: number,
    pageNumber: number
}

const initialState: IServiceState = {
    pageSize: 20,
    pageNumber: 1
}


const serviceSlice = createSlice({

    name: "service",
    initialState,

    reducers: {

        setPage: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        }
    },

    selectors: {

        selectServiceFilter: createSelector(
            (state: IServiceState) => state.pageNumber,
            (state: IServiceState) => state.pageSize,
            (pageNumber, pageSize): GetServiceListDto => ({pageNumber, pageSize})
        )
    }
}).injectInto(rootReducer)


export const { setPage } = serviceSlice.actions;
export const { selectServiceFilter } = serviceSlice.selectors