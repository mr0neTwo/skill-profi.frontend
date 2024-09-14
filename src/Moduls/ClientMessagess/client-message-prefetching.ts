import {store} from "../../Redux/store";
import {LoaderFunctionArgs} from "react-router-dom";
import {loadClientMessagesThunk} from "./load-client-messages-thunk";


const clientMessagesLoader = ({request, params}: LoaderFunctionArgs) => {

    store.dispatch(loadClientMessagesThunk())

    return null
}

export {clientMessagesLoader}

