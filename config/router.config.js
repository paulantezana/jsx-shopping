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
                path: '/operations',
                name: 'operations',
                icon: 'inbox',
                routes: [
                    {
                        path: '/operations/sale',
                        name: 'sale',
                        icon: 'shopping',
                        component: './Operations/Sale',
                    },
                    {
                        path: '/operations/purchase',
                        name: 'purchase',
                        icon: 'shopping-cart',
                        component: './Operations/Purchase',
                    },
                    {
                        path: '/operations/quotation',
                        name: 'quotation',
                        icon: 'file-text',
                        component: './Operations/Quotation',
                    },
                    {
                        path: '/operations/order',
                        name: 'order',
                        icon: 'file-text',
                        component: './Operations/Order',
                    },
                    {
                        path: '/operations/articles',
                        name: 'articles',
                        icon: 'gift',
                        component: './Operations/Articles',
                    },
                    {
                        path: '/operations/customers',
                        name: 'customers',
                        icon: 'user',
                        component: './Operations/Customers',
                    },
                    {
                        path: '/operations/providers',
                        name: 'providers',
                        icon: 'car',
                        component: './Operations/Providers',
                    },
                ],
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
                        icon: 'bank',
                        component: './Setting/Company',
                    },
                    {
                        path: '/settings/personal',
                        name: 'personal',
                        icon: 'user',
                        component: './Setting/Personal',
                    },
                    {
                        path: '/settings/back',
                        name: 'back',
                        icon: 'database',
                        component: './Setting/Back',
                    },
                    {
                        path: '/settings/info',
                        name: 'info',
                        icon: 'heart',
                        component: './Setting/Info',
                    },
                    {
                        path: '/settings/brand',
                        name: 'brand',
                        icon: 'skin',
                        component: './Product/Brand',
                    },
                    {
                        path: '/settings/category',
                        name: 'category',
                        icon: 'branches',
                        component: './Product/Category',
                    },
                    {
                        path: '/settings/unitmeasure',
                        name: 'unitmeasure',
                        icon: 'block',
                        component: './Product/UnitMeasure',
                    },
                ],
            },
            {
                component: '404',
            },
        ],
    },
];
