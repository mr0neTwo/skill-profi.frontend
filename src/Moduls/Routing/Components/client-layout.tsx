import React from "react"
import {Outlet} from "react-router-dom"

import {ClientNavigationPanel} from "./client-navigation-panel"
import {HeaderQuote} from "./header-quote"
import {Footer} from "./footer"
import {ThemeSwitcher} from "./theme-switcher"

const ClientLayout : React.FC = () => {

    return (
        <>
            <div className='flex flex-col min-h-screen text-main dark:text-main-dark'>
                <header className='flex border-lightgrey divide-solid border-b items-center justify-center flex-shrink-0'>
                    <img className='w-64 h-auto' src='/company-logo.png' alt='logo'/>
                    <div className='flex flex-col items-center relative'>
                        <ClientNavigationPanel/>
                        <HeaderQuote/>
                        <ThemeSwitcher className='absolute bottom-4 right-6'/>
                    </div>
                </header>
                <main className='flex flex-col items-center grow'>
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </>
    )
}

export { ClientLayout }

