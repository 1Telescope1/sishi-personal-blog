<template>
  <div class="f-menu" :style="{ width: blogStore.asideWidth }">
    <el-menu
    :default-active="defaultActive"
        class="el-menu-vertical-demo menu"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <template v-for="menu in menus" :key="menu.id">
          <el-sub-menu :index="String(menu.id)" v-if="menu.children&&menu.children.length>0">
            <template #title>
              <el-icon>
                <component :is="menu.icon"></component>
              </el-icon>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item
              v-for="son in menu.children"
              :key="son.id"
              :index="son.path"
            >
              <el-icon>
                <component :is="son.icon"></component>
              </el-icon>
              <span>{{ son.name }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="menu.path">
            <el-icon>
              <component :is="menu.icon"></component>
            </el-icon>
            <span>{{ menu.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
   
  </div>
</template>
<script lang="ts" setup>
import { useBlogStore } from "@/store/blog";
import { useUserStore } from "@/store/user";
import { computed, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
const router = useRouter();
const route = useRoute();
const userStore=useUserStore()
const blogStore=useBlogStore()

const menus=userStore.user.menus

// 默认选中
const defaultActive = ref(route.path);

// 监听路由变化
onBeforeRouteUpdate((to) => {
  defaultActive.value = to.path;
});

// 是否折叠
const isCollapse = computed(() => !(blogStore.asideWidth == "250px"));

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
/* .f-menu::-webkit-scrollbar {
  width: 3px;
} */
.menu {
  height: 100%;
}
</style>
