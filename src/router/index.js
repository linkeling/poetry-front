import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from  '../views/Home'
import Login from  '../views/Login'
Vue.use(VueRouter)

// 解决重复点击二级菜单报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

const routes = [
    {path: '/', component: () => import('@/views/Login.vue'), hidden: true},
    {path: '/Login', component: () => import('@/views/Login.vue'), hidden: true},
    {path: '/Index',component: Index,
        children:[
            // 首页
            {path: 'come', component: () => import('@/views/Welcome.vue')},
            {path: 'poetryInfoManage', component: () => import('@/views/poetryInfoManage/page.vue')},
        ]
    },

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.path=='/'){
        next();
    }else {
        if (to.matched.length ===0) {  //如果未匹配到路由
            from.name ? next({name: from.name}) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
        }else {
            next()
        }
    }
});

export default router
