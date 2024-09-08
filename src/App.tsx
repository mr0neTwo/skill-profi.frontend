import React from 'react'
import { RouterProvider} from "react-router-dom"
import {useDispatch} from "react-redux"

import {router} from "./Moduls/Routing/router"
import {useRefreshQuery} from "./Moduls/Autorization/auth-api"
import {setCredentials} from "./Moduls/Autorization/auth-slice"

import {Spinner} from "./Common/Components/spinner"

const App:React.FC = () => {

    const {data: authResponse, isLoading} = useRefreshQuery()
    const dispatch = useDispatch()

    if(authResponse?.success){
        dispatch(setCredentials({user: authResponse.user}))
    }

    if(isLoading) return <Spinner />;

    return <RouterProvider router={router}/>

}

export { App };
