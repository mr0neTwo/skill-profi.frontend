import {SiteItemKeys} from "../../Common/site-item-keys";

export const adminLinks = [
    {
        path: '/admin/',
        dataKey: SiteItemKeys.Messages
    }, {
        path: '/admin/main',
        dataKey: SiteItemKeys.Main
    }, {
        path: '/admin/services',
        dataKey: SiteItemKeys.Services
    }, {
        path: '/admin/projects',
        dataKey: SiteItemKeys.Projects
    }, {
        path: '/admin/blog',
        dataKey: SiteItemKeys.Blog
    }, {
        path: '/admin/contacts',
        dataKey: SiteItemKeys.Contacts
    }, {
        path: '/admin/users',
        dataKey: SiteItemKeys.Users
    }
]

export const clientLinks = [
    {
        path: '/',
        dataKey: SiteItemKeys.Main
    }, {
        path: '/services',
        dataKey: SiteItemKeys.Services
    }, {
        path: '/projects',
        dataKey: SiteItemKeys.Projects
    }, {
        path: '/blog',
        dataKey: SiteItemKeys.Blog
    }, {
        path: '/contacts',
        dataKey: SiteItemKeys.Contacts
    }
]