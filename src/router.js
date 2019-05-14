const routers = [
    {
        path: '/',
        name: "login",
        meta: {
            title: 'login'
        },  
        component: (resolve) => require(['./views/login/login.vue'], resolve),
    },
    {
        path: '/login',
        name: "login",
        meta: {
            title: 'login'
        },  
        component: (resolve) => require(['./views/login/login.vue'], resolve),
    },
    {    
        path: '/regist',
        name: "regist",
        meta: {
            title: 'regist'
        },
        component: (resolve) => require(['./views/regist/regist.vue'], resolve),
    },
    {    
        path: '/dym-login',
        name: "dym-login",
        meta: {
            title: 'dym-login'
        },
        component: (resolve) => require(['./views/dym-login/dym-login.vue'], resolve),
    },
    /* {    
        path: '/test',
        name: "test",
        meta: {
            title: 'test'
        },
        component: (resolve) => require(['./views/dym-login/test.vue'], resolve),
    }, */
    {    
        path: '/major',
        name: "major",
        meta: {
            title: 'major',
        },
        component: (resolve) => require(['./views/major/major.vue'], resolve),
        children: [
            {
                path: 'retrieval',
                name: "retrieval",
                meta: {
                    title: 'retrieval',
                },
                component: (resolve) => require(['./views/major/components/retrieval.vue'], resolve), 
            },
            {
                path: 'cpu',
                name: "cpu",
                meta: {
                    title: 'cpu'
                },
                component: (resolve) => require(['./views/major/components/cpu.vue'], resolve), 
            },
            {
                path: 'memory',
                name: "memory",
                meta: {
                    title: 'memory'
                },
                component: (resolve) => require(['./views/major/components/memory.vue'], resolve), 
            },
            {
                path: 'netflow',
                name: "netflow",
                meta: {
                    title: 'netflow'
                },
                component: (resolve) => require(['./views/major/components/netflow.vue'], resolve), 
            },
            {
                path: 'internet',
                name: "internet",
                meta: {
                    title: 'internet'
                },
                component: (resolve) => require(['./views/major/components/internet.vue'], resolve), 
            },
            {
                path: 'slow',
                name: "slow",
                meta: {
                    title: 'slow'
                },
                component: (resolve) => require(['./views/major/components/slow.vue'], resolve), 
            },
            {
                path: 'user',
                name: "user",
                meta: {
                    title: 'user'
                },
                component: (resolve) => require(['./views/major/components/user.vue'], resolve),
                /* children: [
                    {
                        path: 'forget',
                        name: "forget",
                        meta: {
                            title: 'forget'
                        },
                        component: (resolve) => require(['./views/major/component/forget.vue'], resolve), 
                    },
                ] */ 
            },
        ]
    }
];
export default routers;