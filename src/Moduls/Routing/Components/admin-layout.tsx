import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";

import {AdminSideBar} from "./admin-side-bar";

const AdminLayout : React.FC = () => {

    const location = useLocation();
    const auth = true;

    if(!auth){
        return <Navigate to='/login' state={{from: location}}/>
    }

    return (
        <div className='admin-container'>
            <AdminSideBar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}
export { AdminLayout }