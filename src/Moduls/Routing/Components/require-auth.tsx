import React from "react"
import {Navigate, useLocation} from "react-router-dom"

interface RequireAuthProps {
    children: React.ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({children}) => {
    const location = useLocation();
    const auth = true;

    if(!auth){
        return <Navigate to='/login' state={{from: location}}/>
    }

    return children
}

export { RequireAuth }