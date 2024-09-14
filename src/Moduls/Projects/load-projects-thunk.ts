import {AppThunk} from "../../Common/redux";
import {selectProjectFilter} from "./project-slice";
import {projectApi} from "./project-api";

export const loadProjectsThunk = (): AppThunk =>
    async (dispatch, getState, _) => {
        const filter = selectProjectFilter(getState());
        dispatch(projectApi.util.prefetch('getProjectList', filter, {}))
    }