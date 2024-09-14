import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {DateRange, GetClientMessageListDto} from "./client-request-types";
import {getEndOfDayTimestamp} from "./Components/timestamp-utils";
import {rootReducer} from "../../Common/redux";

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
    },

    selectors: {

        selectClientMessagePage: (state): number =>  state.pageNumber,

        selectClientMessagesFilter: createSelector(
            (state: IClientMessageState) => state.startTimestamp,
            (state: IClientMessageState) => state.endTimeStamp,
            (state: IClientMessageState) => state.pageNumber,
            (state: IClientMessageState) => state.pageSize,
            (startTimestamp, endTimeStamp, pageNumber, pageSize) : GetClientMessageListDto => ({
                startTimestamp, endTimeStamp, pageNumber, pageSize
            })
        )
    }
}).injectInto(rootReducer)

export const { setDateRange, setPage } = clientMessagesSlice.actions
export const { selectClientMessagePage, selectClientMessagesFilter } = clientMessagesSlice.selectors

