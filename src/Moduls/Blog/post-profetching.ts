import {store} from "../../Redux/store"

import {loadPostThunk} from "./load-post-thunk"

export const postLoader = () => {

    store.dispatch(loadPostThunk())

    return null
}