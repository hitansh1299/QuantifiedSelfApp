import login_component from './components/login_page/login.js'; 
import dashboard from './components/dashboard/DashboardLayout.js'
import {VueRouter} from './modules/vue-router.js'

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
        path: '/',
        name: 'login',
        component: login_component
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard
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