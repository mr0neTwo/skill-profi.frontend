import React from "react";
import {AdminLink} from "./admin-link";

const AdminSideBar : React.FC = () => {
    return (
        <aside className='side-bar-container'>
            <AdminLink to='/admin/' text='Обращения'/>
            <AdminLink to='/admin/main' text='Главная'/>
            <AdminLink to='/admin/services' text='Услуги'/>
            <AdminLink to='/admin/products' text='Продукты'/>
            <AdminLink to='/admin/blog' text='Блог'/>
            <AdminLink to='/admin/contacts' text='Контакты'/>
            <AdminLink to='/admin/users' text='Пользователи'/>
        </aside>
    )
}

export { AdminSideBar }