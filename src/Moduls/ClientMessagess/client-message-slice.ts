import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {DateRange, GetClientMessageListDto} from "./client-request-types";
import {getEndOfDayTimestamp} from "./Components/timestamp-utils";
import {AppState} from "../../Common/redux";

interface IClientMessageState {
    startTimestamp: number,
    endTimeStamp: number,
    pageSize: number,
    pageNumber: number
}

const initialState: IClientMessageState = {
    startTimestamp: 0,
    endTimeStamp: getEndOfDayTimestamp(),
    pageSize: 20,
    pageNumber: 1
}

const clientMessagesSlice = createSlice({

    name: "clientMessage",
    initialState,
    reducers : {

        setDateRange: (state, action: PayloadAction<DateRange>) => {
            state.startTimestamp = action.payload.startTimestamp
            state.endTimeStamp = action.payload.endTimeStamp
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        }
    }
})

export const { setDateRange, setPage } = clientMessagesSlice.actions
export default clientMessagesSlice.reducer

export const selectClientMessagesFilter = (state: AppState): GetClientMessageListDto => ({
    startTimestamp: state.clientMessage.startTimestamp,
    endTimeStamp: state.clientMessage.endTimeStamp,
    pageNumber: state.clientMessage.pageNumber,
    pageSize: state.clientMessage.pageSize
})

export const selectClientMessagePage = (state: AppState): number => state.clientMessage.pageNumber

export const selectDateRange = (state: IClientMessageState): DateRange => ({
    startTimestamp: state.startTimestamp,
    endTimeStamp: state.endTimeStamp
})