<script setup lang="ts">
import { useSocket } from "./composable/useSocket";
const Socket = useSocket();
Socket.init();
</script>

<template>
  <div class="app-wrapper">
    <Header v-show="$route.path!='/404'"></Header>
    <main class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :key="$route.name"
            :is="Component"
            v-if="$route.meta.keepAlive"
          />
        </keep-alive>
        <component
          :key="$route.name"
          :is="Component"
          v-if="!$route.meta.keepAlive"
        />
      </router-view>
      <!-- <router-view></router-view> -->
    </main>
    <Footer v-show="$route.path!='/404'"></Footer>
    <Tool></Tool>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 0 0 8rem; */
}
.app-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
