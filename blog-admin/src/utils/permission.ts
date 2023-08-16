import { useUserStore } from "@/store/user";
import { notification } from "./elComponent";
import {addRoutes, router} from "../router/index.ts"

let hasGetInfo = false;
router.beforeEach(async (to,from,next)=>{
  const {user}=useUserStore()
  const menus=user?.userInfo.menus

  if(!user&&to.path!='/login') {
    notification("请先登录","warning")
    return next({path:"/login"})
  }

  if(user&&to.path=='/login') {
    notification("请勿重复登录","warning")
    return next({ path: from.path ? from.path : "/" });
  }

// 如果用户登录了，就自动获取用户信息，并存储在vuex中
  let hasNewRoutes = false;
  if (user?.token && !hasGetInfo) {
    hasGetInfo = true;
    //动态添加路由
    hasNewRoutes = addRoutes(menus);
    console.log(hasNewRoutes)
  }

  // 设置页面标题
  let title = (to.meta.title ? to.meta.title : "") + "~";
  document.title = title;

  next()

})