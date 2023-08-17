<template>
  <el-container>
    <el-header style="padding: 0">
      <FHeader></FHeader>
    </el-header>
    <el-container>
      <el-aside :width="blogStore.asideWidth">
        <FMenu></FMenu>
      </el-aside>
      <el-main >
        <FBreadcrumb></FBreadcrumb>
        <FTagList></FTagList>
        <div class="fade-transform-box">
          <router-view v-slot="{ Component }" style="margin-top: 40px">
            <transition name="fade-transform"  mode="out-in">
              <keep-alive :max="10" v-if="route.meta.keepAlive">
                <component :key="route.name"
                           :is="Component"
                ></component>
              </keep-alive>
              <component :key="route.name"
                         :is="Component"
                         v-else></component>
            </transition>
          </router-view>

        </div>
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
import {useRoute} from "vue-router"

const route=useRoute()

const blogStore = useBlogStore();
</script>

<style>
.el-aside {
  transition: all 0.2s;
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s ease 0s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px) !important;
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-transform-box {
  overflow: hidden;
}
</style>
