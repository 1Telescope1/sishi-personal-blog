import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

// 定义用户状态仓库
export const useUserStore = defineStore(
  "user",
  () => {
    const user =reactive( { name: "hhh" })
    const info=ref(123)
    const pp=ref(123)
    const update=()=>{
      user.name='abc'
      
    }

    return { user,info ,update,pp};
  },
  {
    // 开启持久化（使用本地存储，默认是localStorage）
    persist: true,
  }
);
