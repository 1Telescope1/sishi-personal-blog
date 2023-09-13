import {  User } from "@/api/user/type";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import {Chat} from "@/api/chat/type.ts";

// 定义用户状态仓库
export const useBlogStore = defineStore(
  "blog",
  () => {
    const authorInfo = ref<User>();

    const isShowChatRoom=ref(false)

    const setIsShowChatRoom=()=>{
      isShowChatRoom.value=!isShowChatRoom.value
    }

    const setAuthorInfo = (data: User) => {
      authorInfo.value = data;
    };

    const articleLen = ref(0);
    const tagLen = ref(0);
    const talkLen = ref(0);

    const touristAvatar =
      "http://43.138.109.120:9000/avatar/2785e109706e4376a7fa06a1c5c65a59_1666582417286.png";
    const touristName = "游客";
    let onlineNumber = ref(0);

    const setOnlineNumber = (cnt: number) => {
      onlineNumber.value = cnt;
    };

    let isDark = ref(false);

    const chatByUser=ref<Chat | null>()

    const setChatByUser=(data:Chat|null) =>{
      chatByUser.value=data
    }

    return {
      onlineNumber,
      setOnlineNumber,
      touristAvatar,
      touristName,
      isDark,
      authorInfo,
      setAuthorInfo,
      articleLen,
      tagLen,
      talkLen,
      isShowChatRoom,
      setIsShowChatRoom,
      chatByUser,
      setChatByUser
    };
  },
  {
    // 开启持久化（使用本地存储，默认是localStorage）
    persist: true,
  }
);
