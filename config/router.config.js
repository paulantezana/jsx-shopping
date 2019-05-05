export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: './User/Login' },
            { path: '/user/forgot', component: './User/Forgot' },
            // { path: '/user/term', component: './User/Term' },
            // { component: '404' },
        ],
    },
    // exception
    {
        path: '/exception',
        component: '../layouts/UserLayout',
        routes: [
            // exception
            {
                path: '/exception/403',
                component: './Exception/403',
            },
            {
                path: '/exception/404',
                component: './Exception/404',
            },
            {
                path: '/exception/500',
                component: './Exception/500',
            },
            { component: '404' },
        ],
    },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: [1],
        routes: [
            { path: '/', redirect: '/welcome' },
            {
                path: '/account',
                name: 'account',
                hideInMenu: true,
                component: './Account',
            },
            {
                path: '/settings',
                name: 'setting',
                icon: 'setting',
                // authority: [1, 2],
                routes: [
                    {
                        path: '/settings/company',
                        name: 'company',
                        component: './Setting/Company',
                    },
                    {
                        path: '/settings/personal',
                        name: 'personal',
                        component: './Setting/Personal',
                    },
                    {
                        path: '/settings/back',
                        name: 'back',
                        component: './Setting/Back',
                    },
                    {
                        path: '/settings/info',
                        name: 'info',
                        component: './Setting/Info',
                    },
                    // {
                    //     path: '/settings/api',
                    //     name: 'api',
                    //     component: './Setting/Api',
                    // },
                ],
            },
            {
                component: '404',
            },
        ],
    },
];
