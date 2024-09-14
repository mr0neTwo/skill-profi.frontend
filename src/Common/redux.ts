import {store} from "../Redux/store";
import {
    asyncThunkCreator,
    buildCreateSlice,
    combineSlices,
    createAsyncThunk,
    ThunkAction,
    UnknownAction
} from "@reduxjs/toolkit";
import {extraArgument} from "./extra-argument";
import {useDispatch, useSelector, useStore} from "react-redux";
import {baseApi} from "./baseApi";

export const rootReducer = combineSlices(baseApi)

// export type AppState = ReturnType<typeof store.getState>
export type AppState = any
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>
export const useAppStore = useStore.withTypes<typeof store>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState,
    dispatch: AppDispatch,
    extra: typeof extraArgument
}>()
export const createSlice = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})