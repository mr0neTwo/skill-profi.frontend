import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";

import {AdminSideBar} from "./admin-side-bar";
import {selectIsLogin} from "../../Autorization/auth-slice";
import {useSelector} from "react-redux";

const AdminLayout : React.FC = () => {

    const isLogin = useSelector(selectIsLogin);
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