import {AppThunk} from "../../Common/redux"
import {blogApi} from "./blog-api"
import {selectPostFilter} from "./blog-slice"

export const loadPostThunk = (): AppThunk =>
    async (dispatch, getState, _) => {
        const filter = selectPostFilter(getState());
        dispatch(blogApi.util.prefetch('getPostList', filter, {}))
    }