import { useUserStore } from "@/store/user";
import { notification } from "./elComponent";
import {addRoutes, router} from "../router/index.ts"
import {getToken} from "@/utils/auth.ts";

let hasGetInfo = false;
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = getToken();
  if (!token && to.path !== '/login') {
    notification("请先登录", "warning");
    return next({ path: "/login" });
  }

  if (token && to.path === '/login') {
    notification("请勿重复登录", "warning");
    return next({ path: from.path ? from.path : "/" });
  }

  // 如果用户登录了，就自动获取用户信息，并存储在pinia中
  let hasNewRoutes = false;
  if (token && !hasGetInfo) {
    await userStore.getUserinfo();
    const menus = userStore.user?.userinfo.menus;
    hasGetInfo = true;
    // 动态添加路由
    hasNewRoutes = addRoutes(menus);
  }

  // 设置页面标题
  document.title = (to.meta.title ? to.meta.title : "") + "~";
  hasNewRoutes ? next(to.fullPath) : next();

});