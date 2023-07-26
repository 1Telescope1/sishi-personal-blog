<template>
  <el-container>
    <el-header style="padding: 0">
      <FHeader></FHeader>
    </el-header>
    <el-container>
      <el-aside :width="blogStore.asideWidth">
        <FMenu></FMenu>
      </el-aside>
      <el-main>
        <FBreadcrumb></FBreadcrumb>
        <FTagList></FTagList>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive :max="10" v-if="$route.meta.keepAlive">
              <component :key="$route.name"
                         :is="Component"
                         ></component>
            </keep-alive>
            <component :key="$route.name"
                       :is="Component"
                       v-else></component>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import FHeader from "@/layouts/components/FHeader.vue";
import FMenu from "@/layouts/components/FMenu.vue";
import FTagList from "@/layouts/components/FTagList.vue";
import FBreadcrumb from "@/layouts/components/FBreadcrumb.vue";
import {useBlogStore} from "@/store/blog";

const blogStore = useBlogStore();
</script>

<style>
.el-aside {
  transition: all 0.2s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}
</style>
