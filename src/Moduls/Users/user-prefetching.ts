import {store} from "../../Redux/store";
import {userApi} from "./user-api";

const userListLoader = () => {

    store.dispatch(userApi.util.prefetch('getUsers', undefined, {}))

    return null
}

export { userListLoader }