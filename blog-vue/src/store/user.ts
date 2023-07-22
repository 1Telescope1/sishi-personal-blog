import { reqLoign } from "@/api/user";
import { LoginUser, userForm } from "@/api/user/type";
import { notification } from "@/utils/elComponent";
import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

// 定义用户状态仓库
export const useUserStore = defineStore(
  "user",
  () => {
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

    return { login,user,logout};
  },
  {
    // 开启持久化（使用本地存储，默认是localStorage）
    persist: true,
  }
);
