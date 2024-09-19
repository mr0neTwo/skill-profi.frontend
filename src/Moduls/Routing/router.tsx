import React from "react"
import {createBrowserRouter} from "react-router-dom"

import {userListLoader} from "../Users/user-prefetching"
import {clientMessagesLoader} from "../ClientMessagess/client-message-prefetching"
import {serviceLoader} from "../Services/service-prefetching";

import {AdminLayout} from "./Components/admin-layout"
import {ClientLayout} from "./Components/client-layout"
import {LoginPage} from "../Autorization/Components/login-page"
import {UsersPage} from "../Users/Components/UsersPage"
import {MainPage} from "../Main/main-page"
import {ClientMessagePage} from "../ClientMessagess/Components/client-message-page"
import {LogoutPage} from "../Autorization/Components/logout-page"
import {AdminMainPage} from "../Main/admin-main-page"
import {ServicesPage} from "../Services/Components/services-page"
import {ServiceForm} from "../Services/Components/service-form"
import {ProjectsPage} from "../Projects/Components/ProjectsPage";
import {projectLoader} from "../Projects/project-prefething";
import {ProjectDetails} from "../Projects/Components/project-details";
import {ProjectForm} from "../Projects/Components/project-form";
import {BlogPage} from "../Blog/Components/blog-page";
import {postLoader} from "../Blog/post-profetching";
import {PostDetails} from "../Blog/Components/post-details";
import {PostForm} from "../Blog/Components/post-form";
import {CompanyPage} from "../Company/Components/company-page";
import {CompanyForms} from "../Company/Components/company-forms";
import {SocialMediaForms} from "../Company/Components/social-media-forms";

const routes = [
    {
        path: '/',
        element: <ClientLayout />,
        children: [
            {
                index: true,
                element: <MainPage />
            }, {
                path: 'services',
                element: <ServicesPage/>,
                loader: serviceLoader
            }, {
                path: 'projects',
                element: <ProjectsPage />,
                loader: projectLoader
            }, {
                path: 'projects/:id',
                element: <ProjectDetails />,
            }, {
                path: 'blog',
                element: <BlogPage/>,
                loader: postLoader
            }, {
                path: 'blog/:id',
                element: <PostDetails/>
            }, {
                path: 'contacts',
                element: <CompanyPage />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <ClientMessagePage />,
                loader : clientMessagesLoader
            }, {
                path: 'main',
                element: <AdminMainPage/>
            }, {
                path: 'services',
                element: <ServicesPage/>,
                loader: serviceLoader
            }, {
                path: 'services/create',
                element: <ServiceForm/>
            },{
                path: 'services/:id',
                element: <ServiceForm/>
            }, {
                path: 'projects',
                element: <ProjectsPage />,
                loader: projectLoader
            }, {
                path: 'projects/create',
                element: <ProjectForm />
            }, {
                path: 'projects/edit/:id',
                element: <ProjectForm />
            }, {
                path: 'blog',
                element: <BlogPage/>,
                loader: postLoader
            }, {
                path: 'blog/create',
                element: <PostForm />
            }, {
                path: 'blog/edit/:id',
                element: <PostForm />
            }, {
                path: 'contacts',
                element: <CompanyPage />
            }, {
                path: 'contacts/edit',
                element: <CompanyForms />
            }, {
                path: 'contacts/socialmedias/edit',
                element: <SocialMediaForms />
            }, {
                path: 'users',
                element: <UsersPage />,
                loader: userListLoader
            }
        ],
    }, {
        path: '/login',
        element: <LoginPage />
    }, {
        path: '/logout',
        element: <LogoutPage />
    }
];

export const router = createBrowserRouter(routes);