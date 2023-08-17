import {reqLoign, reqUserByToken} from "@/api/user";
import { LoginUser, userForm } from "@/api/user/type";
import { notification } from "@/utils/elComponent";
import { defineStore } from "pinia";
import {  ref } from 'vue';
import { useRouter } from "vue-router";
import {clearRoutes} from "@/router";
import {removeToken, setToken} from "@/utils/auth.ts";

// 定义用户状态仓库
export const useUserStore = defineStore(
  "user",
  () => {
    const router=useRouter()

    const user=ref<any>()
    const login=async (data:userForm)=>{
      const res=await reqLoign(data)
      if(res.status==200) {
        user.value=res.data
        setToken(res.data.token)
        return true
      }
      return false
    }

    const logout=async ()=>{
      user.value=undefined
      clearRoutes()
      notification("退出登录成功")
      removeToken()
      router.push('/login')
    }

    const getUserinfo=async ()=>{
      const res=await reqUserByToken()
      if(res.status==200) {
        user.value=res.data
      }
    }


    return { login,user,logout,getUserinfo};
  },
  // {
  //   // 开启持久化（使用本地存储，默认是localStorage）
  //   persist: true,
  // }
);
