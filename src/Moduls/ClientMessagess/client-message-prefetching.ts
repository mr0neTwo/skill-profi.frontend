import {store} from "../../Redux/store";
import {clientRequestApi} from "./client-request-api";
import {LoaderFunctionArgs} from "react-router-dom";
import {getEndOfDayTimestamp} from "./Components/timestamp-utils";


const clientMessagesLoader = ({request, params}: LoaderFunctionArgs) => {
    store.dispatch(clientRequestApi.util.prefetch('getClientMessages', {start: 0, end: getEndOfDayTimestamp()}, {}))

    return null
}

export {clientMessagesLoader}