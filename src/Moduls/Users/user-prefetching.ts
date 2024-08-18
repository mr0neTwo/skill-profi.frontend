import {LoaderFunctionArgs} from "react-router-dom";
import {store} from "../../Redux/store";
import {userApi} from "./user-api";

const userListLoader = ({request, params}: LoaderFunctionArgs) => {
    console.log({request, params})
    store.dispatch(userApi.util.prefetch('getUsers', undefined, {}))

    return null
}

const userLoader = ({request, params}: LoaderFunctionArgs) => {
    console.log({request, params})
    store.dispatch(userApi.util.prefetch('getUser', parseInt(params.id ?? '', 10), {}))

    return null
}

export { userListLoader, userLoader }