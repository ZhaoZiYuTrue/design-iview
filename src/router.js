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
    }
];
export default routers;