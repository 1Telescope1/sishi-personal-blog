import {reqLoign} from "@/api/user";
import {LoginUser, userForm} from "@/api/user/type";
import {notification} from "@/utils/elComponent";
import {defineStore} from "pinia";
import {ref} from "vue";
import {useBlogStore} from "@/store/blog.ts";
import {Chat} from "@/api/chat/type.ts";


// 定义用户状态仓库
export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<LoginUser>();
    const token = ref("");
    const blogStore = useBlogStore()

    const login = async (data: userForm) => {
      const res = await reqLoign(data);
      if (res.data) {
        user.value = res.data;
        token.value = res.data.token;

        blogStore.setChatByUser({
          avatar: res.data.userinfo.avatar,
          content: "",
          createTime: "",
          id: 0,
          ip: "",
          nickname: res.data.userinfo.nickname,
          userId: res.data.userinfo.id
        })
        return true;
      }
      return false;
    };

    const logout = async () => {
      user.value = undefined;
      blogStore.setChatByUser(null)
      notification("success", "退出登录成功");
    };

    return {login, user, logout, token};
  },
  {
    // 开启持久化（使用本地存储，默认是localStorage）
    persist: true,
  }
);
