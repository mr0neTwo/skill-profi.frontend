import {store} from "../../Redux/store"

import {selectProjectFilter} from "./project-slice"
import {projectApi} from "./project-api"

export const projectLoader = () => {
    const filter = selectProjectFilter(store.getState())

    store.dispatch(projectApi.util.prefetch('getProjectList', filter, {}))

    return null
}