import {createRouter, createWebHashHistory} from "vue-router";

let routes = [
  {
    path: "/",
    name: "admin",
    component: () => import("@/layouts/admin.vue"),
    meta: {
      keepAlive: false,
      title: "首页",
    },
  },
  {
    path: "/login",
    name: "login",
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/Login/index.vue"),
    meta: {
      keepAlive: false,
      title: "登录页",
    },
  },
  {
    // 配置404页面
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
];


// 路由
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

import {asyncRoutes} from "@/router/asyncRoutes.ts";

//定义动态添加路由方法
export const addRoutes = (menus: any) => {

  // 是否有新路由
  let hasNewRoutes = false;
  const findAndAddRoutesByMenus = (arr: any) => {
    arr?.forEach((e: any) => {
      let item = asyncRoutes.find((o: any) => {
        return o.path == e.path
      });

      if (item && !router.hasRoute(item.name)) {
        router.addRoute("admin", item);
        hasNewRoutes = true;
      }
      if (e.children && e.children.length > 0) {
        findAndAddRoutesByMenus(e.children);
      }
    });
  };
  findAndAddRoutesByMenus(menus);
  return hasNewRoutes;
};

export const clearRoutes = () => {
  const allRoutes = router.options.routes;
  for (let i = 0; i < routes.length; i++) {

    router.removeRoute(asyncRoutes[i].name)
  }
}


