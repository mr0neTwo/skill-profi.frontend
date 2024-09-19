import {store} from "../../Redux/store";
import {loadClientMessagesThunk} from "./load-client-messages-thunk";


const clientMessagesLoader = () => {

    store.dispatch(loadClientMessagesThunk())

    return null
}

export {clientMessagesLoader}

