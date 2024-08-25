import React from "react";

import {ClientLink} from "./client-link";

const ClientNavigationPanel: React.FC = ()=> {
    return(
        <nav className='client-navigation-panel-container'>
            <ClientLink to='/' text='Главная'/>
            <ClientLink to='/services' text='Услуги'/>
            <ClientLink to='/products' text='Продукты'/>
            <ClientLink to='/blog' text='Блог'/>
            <ClientLink to='/contacts' text='Контакты'/>
            <ClientLink to='/login' text='Войти'/>
        </nav>
    )
}

export { ClientNavigationPanel }