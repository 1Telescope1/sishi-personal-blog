import { createRouter, createWebHashHistory } from "vue-router";
 
 
let routes= [
    {
        path: '/',
        name: 'home',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('@/view/home/index.vue')
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