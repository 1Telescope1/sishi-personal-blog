import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

// 定义用户状态仓库
export const useBlogStore = defineStore(
  "blog",
  () => {
    let onlineNumber=ref(0)
    const setOnlineNumber=(cnt:number)=>{
      onlineNumber.value=cnt
    }

    return { onlineNumber,setOnlineNumber};
  },
  {
    // 开启持久化（使用本地存储，默认是localStorage）
    persist: true,
  }
);
