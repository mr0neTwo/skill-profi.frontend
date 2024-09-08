import {store} from "../../Redux/store";

import {selectServiceFilter} from "./service-slice";
import {serviceApi} from "./service-api";

export const serviceLoader = () => {

    const filter = selectServiceFilter(store.getState())

    store.dispatch(serviceApi.util.prefetch('getServiceList', filter, {}))

    return null
}

