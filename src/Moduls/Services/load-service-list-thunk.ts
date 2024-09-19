import {AppThunk} from "../../Common/redux"
import {selectServiceFilter} from "./service-slice"
import {serviceApi} from "./service-api"

export const loadServiceListThunk = (): AppThunk =>
    async (dispatch, getState, _) => {
        const filter = selectServiceFilter(getState());
        dispatch(serviceApi.util.prefetch('getServiceList', filter, {}))
    }