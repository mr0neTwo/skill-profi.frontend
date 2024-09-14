import {store} from "../../Redux/store"

import {loadProjectsThunk} from "./load-projects-thunk";

export const projectLoader = () => {

    store.dispatch(loadProjectsThunk())

    return null
}

