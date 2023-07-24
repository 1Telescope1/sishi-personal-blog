import { UserInfo } from "@/api/user/type";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

// 定义用户状态仓库
export const useBlogStore = defineStore(
  "blog",
  () => {
    const authorInfo = ref<UserInfo>({
      id: -1,
      nickname: "",
      avatar: "",
      email: "",
      intro: "",
    });

    const setAuthorInfo = (data: UserInfo) => {
      authorInfo.value = data;
    };

    const articleLen = ref(0);
    const tagLen = ref(0);
    const talkLen = ref(0);

    // 侧边宽度
    let asideWidth=ref("250px");
    const handleAsideWidth=()=>{
      if(asideWidth.value=="64px") {
        asideWidth.value="250px"
      } else {
        asideWidth.value="64px"
      } 
    }

    let isDark = ref(false);

    return {
      isDark,
      authorInfo,
      setAuthorInfo,
      handleAsideWidth,
      articleLen,
      tagLen,
      talkLen,
      asideWidth
    };
  },
  {
    // 开启持久化（使用本地存储，默认是localStorage）
    persist: true,
  }
);
