import React from "react"
import {Navigate, Outlet, useLocation} from "react-router-dom"

import {selectIsLogin} from "../../Autorization/auth-slice"
import {useAppSelector} from "../../../Common/redux"

import {AdminSideBar} from "./admin-side-bar"

const AdminLayout : React.FC = () => {

    const isLogin = useAppSelector(selectIsLogin);
    const location = useLocation();

    if(!isLogin){
        return <Navigate to='/login' state={{from: location}}/>
    }

    return (
        <div className='flex h-full box-border overflow-y-hidden bg-background dark:bg-background-dark'>
            <div className='flex w-full'>
                <AdminSideBar/>
                <main className='h-screen box-border w-full overflow-auto'>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
export {AdminLayout }