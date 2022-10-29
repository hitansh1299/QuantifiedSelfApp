import login_component from './components/login_page/login.js'; 
import dashboard from './components/dashboard/DashboardLayout.js';
import error from './components/common/404.js'
import home from './components/home/home.js'
import form from './components/form/createTrackerForm.js'
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
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/form',
            name: 'form',
            component: form
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard
        },
        {
            path: '*',
            name: 'error',
            component: error
        }

    ]
});

const app = Vue.createApp({
    delimiters: ['<:', ':>'],
    name: 'SustainabilityTracker',
    components: {
        login: login_component
    }
})
.use(router)
// .use(plugin, defaultConfig)
.use(VueAxios, axios);
app.mount('#app');