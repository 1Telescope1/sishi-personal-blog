import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/view/Home/index.vue"),
    meta: {
      keepAlive: true, //需要缓存
    },
  },
  {
    path: "/archive",
    name: "archive",
    component: () => import("@/view/Archive/index.vue"),
    meta: {
      keepAlive: true, //需要缓存
    },
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: () => import("@/view/Article/index.vue"),
    meta: {
      keepAlive: false, //需要缓存
    },
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/view/Message/index.vue"),
    meta: {
      keepAlive: true, //需要缓存
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/view/About/index.vue"),
    meta: {
      keepAlive: true, //需要缓存
    },
  },
  {
    path: "/talks",
    name: "talks",
    component: () => import("@/view/Talks/index.vue"),
    meta: {
      keepAlive: true, //需要缓存
    },
  },
  {
    path: "/talk/:id",
    name: "talk",
    component: () => import("@/view/TalkItem/index.vue"),
    meta: {
      keepAlive: false, //需要缓存
    },
  },
  {
    path: "/friend",
    name: "friend",
    component: () => import("@/view/Friend/index.vue"),
    meta: {
      keepAlive: true, //需要缓存
    },
  },
  {
    path: "/tag",
    name: "tag",
    component: () => import("@/view/Tag/index.vue"),
    meta: {
      keepAlive: true, //需要缓存
    },
  },
  {
    path: "/tagdetail/:tag",
    name: "tagDetail",
    component: () => import("@/view/TagDetail/index.vue"),
    meta: {
      keepAlive: false, //需要缓存
    },
  },
  {
    // 配置404页面
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/view/404/index.vue"),
    meta: {
        keepAlive: true  //需要缓存
    },
  },
];
// 路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 导出
export default router;
