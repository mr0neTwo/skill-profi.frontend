import React from "react";
import {HeaderQuote} from "../Routing/Components/header-quote";
import {MainPage} from "./main-page";

const AdminMainPage: React.FC = () => {
    return (
        <div className='flex flex-col items-center'>
            <HeaderQuote/>
            <MainPage />
        </div>
    )
}

export { AdminMainPage }