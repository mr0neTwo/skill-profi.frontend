import React from "react";
import {createBrowserRouter} from "react-router-dom";

import {userListLoader} from "../Users/user-prefetching";

import {TemporaryPage} from "../../Common/Components/temporary-page";
import {AdminLayout} from "./Components/admin-layout";
import {ClientLayout} from "./Components/client-layout";
import {LoginPage} from "../Autorization/Components/login-page";
import {UsersPage} from "../Users/Components/UsersPage";

const routes = [
    {
        path: '/',
        element: <ClientLayout />,
        children: [
            {
                index: true,
                element: <TemporaryPage text="Здесь будет домашняя страница" />
            }, {
                path: 'services',
                element: <TemporaryPage text="Здесь будут услуги" />
            }, {
                path: 'products',
                element: <TemporaryPage text="Здесь будут продукты" />
            }, {
                path: 'blog',
                element: <TemporaryPage text="Здесь будет блог" />
            }, {
                path: 'contacts',
                element: <TemporaryPage text="Здесь будут контакты" />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: (<TemporaryPage text="Здесь будут обращения" />)
            }, {
                path: 'main',
                element: <TemporaryPage text="Здесь будет главная страница" />
            }, {
                path: 'services',
                element: <TemporaryPage text="Здесь будут услуги" />
            }, {
                path: 'products',
                element: <TemporaryPage text="Здесь будут продукты" />
            }, {
                path: 'blog',
                element: <TemporaryPage text="Здесь будет блог" />
            }, {
                path: 'contacts',
                element: <TemporaryPage text="Здесь будут контакты" />
            }, {
                path: 'users',
                element: <UsersPage />,
                loader: userListLoader
            }
        ],
    }, {
        path: 'login',
        element: <LoginPage />
    }
];

export const router = createBrowserRouter(routes);