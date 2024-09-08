import {createSlice, PayloadAction} from "@reduxjs/toolkit"

import {AppState} from "../../Common/redux"
import {GetServiceListDto} from "./service-types"

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
    }
})

export const { setPage } = serviceSlice.actions;
export default serviceSlice.reducer

export const selectServiceFilter = (state: AppState): GetServiceListDto => ({
    pageNumber : state.service.pageNumber,
    pageSize: state.service.pageSize
})