import {AppThunk} from "../../Common/redux";
import {selectClientMessagesFilter} from "./client-message-slice";
import {clientRequestApi} from "./client-request-api";

export const loadClientMessagesThunk = (): AppThunk =>
    async (dispatch, getState, _) => {
        const filter = selectClientMessagesFilter(getState());
        console.log('prefetching')
        dispatch(clientRequestApi.util.prefetch('getClientMessages', filter, {}))
    }