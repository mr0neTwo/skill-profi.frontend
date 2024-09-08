import {store} from "../../Redux/store";
import {LoaderFunctionArgs} from "react-router-dom";

import {clientRequestApi} from "./client-request-api";
import {selectClientMessagesFilter} from "./client-message-slice";


const clientMessagesLoader = ({request, params}: LoaderFunctionArgs) => {

    const filter = selectClientMessagesFilter(store.getState());

    store.dispatch(clientRequestApi.util.prefetch('getClientMessages', filter, {}))

    return null
}

export {clientMessagesLoader}