import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

// 定义用户状态仓库
export const useBlogStore = defineStore(
  "blog",
  () => {
    const touristAvatar='http://43.143.107.88:29000/avatar/2785e109706e4376a7fa06a1c5c65a59_1666582417286.png'
    const touristName="游客"
    let onlineNumber=ref(0)
    const setOnlineNumber=(cnt:number)=>{
      onlineNumber.value=cnt
    }

    let isDark=ref(false)

    return { onlineNumber,setOnlineNumber,touristAvatar,touristName,isDark};
  },
  {
    // 开启持久化（使用本地存储，默认是localStorage）
    persist: true,
  }
);
