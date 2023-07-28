<template>
  <div class="f-menu" :style="{ width: blogStore.asideWidth }">
    <el-menu
    :default-active="defaultActive"
        class="el-menu-vertical-demo menu"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
            <el-menu-item index="/">item one</el-menu-item>
            <el-menu-item index="/home">item two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>文章管理</span>
          </template>
            <el-menu-item index="/article/publish">发布文章</el-menu-item>
            <el-menu-item index="/article/list">文章列表</el-menu-item>
            <el-menu-item index="/article/tag">标签模块</el-menu-item>
        </el-sub-menu>
      </el-menu>
   
  </div>
</template>
<script lang="ts" setup>
import { useBlogStore } from "@/store/blog";
import { useUserStore } from "@/store/user";
import { computed, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import {Location} from "@element-plus/icons-vue";
const router = useRouter();
const route = useRoute();
const userStore=useUserStore()
const blogStore=useBlogStore()

// 默认选中
const defaultActive = ref(route.path);

// 监听路由变化
onBeforeRouteUpdate((to) => {
  defaultActive.value = to.path;
});

// 是否折叠
const isCollapse = computed(() => !(blogStore.asideWidth == "250px"));

// const asideMenus = computed(() => store.state.menus);

const handleSelect = (e:any) => {
  router.push(e);
};

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
</script>
<style scoped>
.f-menu {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  background-color: rgb(253, 253, 253);
}
.f-menu::-webkit-scrollbar {
  width: 0px;
}
.menu {
  height: 100%;
}
</style>
