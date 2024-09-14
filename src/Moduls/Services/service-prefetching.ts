import {store} from "../../Redux/store";
import {loadServiceListThunk} from "./load-service-list-thunk";

export const serviceLoader = () => {

    store.dispatch(loadServiceListThunk)

    return null
}

