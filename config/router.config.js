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
    // {
    //     path: '/exception',
    //     component: '../layouts/UserLayout',
    //     routes: [
    //         // exception
    //         {
    //             path: '/exception/403',
    //             component: './Exception/403',
    //         },
    //         {
    //             path: '/exception/404',
    //             component: './Exception/404',
    //         },
    //         {
    //             path: '/exception/500',
    //             component: './Exception/500',
    //         },
    //         { component: '404' },
    //     ],
    // },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: [1],
        routes: [
            { path: '/', redirect: '/welcome' },
            // dashboard
            {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
            },
            {
                path: 'https://github.com/umijs/umi-blocks/tree/master/ant-design-pro',
                name: 'more-blocks',
                icon: 'block',
            },
            {
                path: '/account',
                name: 'account',
                hideInMenu: true,
                component: './Account',
            },
        ],
    },
];
