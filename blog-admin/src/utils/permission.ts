import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { notification } from "./elComponent";


const router=useRouter()
router.beforeEach(async (to,from,next)=>{
  const {user}=useUserStore()

  if(!user&&to.path!='/login') {
    notification("请先登录","warning")
    return next({path:"/login"})
  }

  if(user&&to.path=='/login') {
    notification("请勿重复登录","warning")
    return next({ path: from.path ? from.path : "/" });
  }

  // 设置页面标题
  let title = (to.meta.title ? to.meta.title : "") + "~";
  document.title = title;

  next()

})