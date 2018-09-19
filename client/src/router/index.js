import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../components/Index.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
Vue.use(VueRouter);
export default new VueRouter({
    mode:'history',
    routes:[{
        path:'*',
        redirect:'/'
    },{
        path:'/',
        component:Index
    },{
        path:'/login',
        component:Login
    },{
        path:'/register',
        component:Register
    }]
})