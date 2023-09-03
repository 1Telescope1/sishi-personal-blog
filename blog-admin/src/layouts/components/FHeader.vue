<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1">
        <eleme-filled />
      </el-icon>
      四十
    </span>
    <el-icon class="icon-btn" @click="blogStore.handleAsideWidth()">
      <fold v-if="blogStore.asideWidth == '250px'" />
      <Expand v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <refresh />
      </el-icon>
    </el-tooltip>

    <div class="right-content">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen" />
          <aim v-else />
        </el-icon>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="user ">
          <el-avatar class="mr-2" :size="25" :src="userStore.user?.userinfo?.avatar" />
          {{ userStore.user?.userinfo?.nickname }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core";
import {useBlogStore} from "../../store/blog.js";
import {useUserStore} from "../../store/user.js";
const {
  // 是否全屏状态
  isFullscreen,
  // 切换全屏
  toggle,
} = useFullscreen();

const blogStore=useBlogStore()
const userStore=useUserStore()

// 修改密码和退出登录
const handleCommand = (c:string) => {
  switch (c) {
    case "logout":
      userStore.logout()
      break;
    case "rePassword":
      // openRePasswordForm();
      break;
    default:
      break;
  }
};

// 刷新
const handleRefresh = () => {
  location.reload();
};
</script>

<style scoped lang="scss">
.f-header {
  display: flex;
  align-items: center;
  background-color: rgb(67, 56, 202);
  color: rgb(253, 253, 253);
  color: rgba(253, 253, 253);
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 64px;
  z-index: 1000;
}

.logo {
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight: 100;
}

.icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  background-color: rgb(79, 70, 229);
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1.25rem; /* 20px */
  margin-right: 1.25rem; /* 20px */
}

.right-content {
  margin-left: auto;
  display:flex;
  align-items: center;

  .user {
    display: flex;
    align-items: center;
    color: rgb(253, 253, 253);

  }
}
</style>
