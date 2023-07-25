import { reqLoign } from "@/api/user";
import { LoginUser, userForm } from "@/api/user/type";
import { notification } from "@/utils/elComponent";
import { defineStore } from "pinia";
import {  ref } from 'vue';
import { useRouter } from "vue-router";

// 定义用户状态仓库
export const useUserStore = defineStore(
  "user",
  () => {
    const router=useRouter()
    

    const user=ref<LoginUser>()
    const login=async (data:userForm)=>{
      const res=await reqLoign(data)
      if(res.status==200) {
        user.value=res.data
        return true
      }
      return false
    }

    const logout=async ()=>{
      user.value=undefined
      notification("success","退出登录成功")
    }

    const menus=ref(router.getRoutes())
    

    return { login,user,logout,menus};
  },
  {
    // 开启持久化（使用本地存储，默认是localStorage）
    persist: true,
  }
);
