import login_component from './components/login_page/login.js'; 

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
        path: '/',
        name: 'login',
        component: login_component
        }
    ]
});

const app = Vue.createApp({
    delimiters: ['<:', ':>'],
    name: 'SustainabilityTracker',
    components: {
        login: login_component
    }
});
app.use(router);
app.use(VueAxios, axios);
app.mount('#app')
