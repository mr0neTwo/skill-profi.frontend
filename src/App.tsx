import React from 'react';
import { RouterProvider} from "react-router-dom";

import './App.css';

import {router} from "./Moduls/Routing/router";

const App:React.FC = () => {

    return <RouterProvider router={router}/>

}

export { App };
