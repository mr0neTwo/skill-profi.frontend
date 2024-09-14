import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {logOut} from "../auth-slice";
import {useLogoutMutation} from "../auth-api";

const LogoutPage: React.FC = () => {

    const [logout] = useLogoutMutation()
    const dispatch = useDispatch()

    useEffect(() => {

        const performLogout = async () => await logout()

        performLogout().then(() => dispatch(logOut()));
    }, [logout, dispatch]);

    return <Navigate to='/'/>

}

export { LogoutPage }