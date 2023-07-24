import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "admin",
    component: () => import("@/layouts/admin.vue"),
    children: [
      {
        path: "",
        name: "",
        component: () => import("@/views/index.vue"),
        meta: {
          keepAlive: true, 
          title: "首页",
        },
      },
    ],
    meta: {
      keepAlive: true,
      title: "首页",
    },
  },
  {
    path: "/home",
    name: "home",
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/Home/index.vue"),
    meta: {
      keepAlive: true, //需要缓存
      title: "首页",
    },
  },
  {
    path: "/login",
    name: "login",
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/Login/index.vue"),
    meta: {
      keepAlive: false, //需要缓存
      title: "注册页",
    },
  },
  {
    // 配置404页面
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  { path: "/:catchAll(.*)", redirect: "/404" },
];

// 路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 导出
export default router;