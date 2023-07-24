import { useUserStore } from "@/store/user";
import { notification } from "./elComponent";

const userInfo=useUserStore()
export const validateUser=()=>{
  if(!userInfo.user) {
    notification("warning","请先登录","warning")
    return false
  }
  return true
}