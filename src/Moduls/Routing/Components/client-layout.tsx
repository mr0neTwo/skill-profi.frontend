import React from "react";
import {Outlet} from "react-router-dom";

import {ClientNavigationPanel} from "./client-navigation-panel";

const ClientLayout : React.FC = () => {
    return (
        <>
            <header className='client-header'>
                <img className='company-logo' src='/company-logo.png' alt='logo'/>
                <div className='client-header-content-container'>
                    <ClientNavigationPanel/>
                    <div className='quote-container'>
                        <blockquote>"Расширяем возможности"</blockquote>
                    </div>
                </div>
            </header>
                <main>
                    <Outlet/>
                </main>
            <footer>Client Footer</footer>
        </>
    )
}

export { ClientLayout }