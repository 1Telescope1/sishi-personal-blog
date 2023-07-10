import { createRouter, createWebHashHistory } from "vue-router";
 
 
const routes= [
    {
        path: '/',
        name: 'home',
        component: () => import('@/view/Home/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/Login/index.vue')
    },
    {
        // 配置404页面
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/view/404/index.vue'),
    }
]
// 路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 导出
export default router 