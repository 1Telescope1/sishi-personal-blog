<script setup lang="ts">
import Header from '@/components/Header/index.vue'
import { useSocket } from './composable/useSocket';
const Socket=useSocket()
Socket.init()

</script>

<template>
  <div class="app-wrapper">
    <Header></Header>
    <main class="main">
      <router-view></router-view>
    </main>
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
