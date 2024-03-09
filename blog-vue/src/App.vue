<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

console.log(
  "%c Hello World %c By 四十 %c",
  "background:#e9546b ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff; padding:5px 0;",
  "background:#ec8c69 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #000; padding:5px 0;",
  "background:transparent"
);
</script>

<template>
  <div class="app-wrapper">
    <Header v-show="route.path != '/404'"></Header>
    <main class="main">
      <!-- <router-view></router-view> -->
      <Suspense>
        <template #default>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component
                :key="route.name"
                :is="Component"
                v-if="route.meta.keepAlive"
              />
            </keep-alive>
            <component
              :key="route.name"
              :is="Component"
              v-if="!route.meta.keepAlive"
            />
          </router-view>
        </template>
        <template #fallback> 
          <div>12345</div>
        </template>
      </Suspense>
    </main>
    <Footer v-show="route.path != '/404'"></Footer>
    <Tool></Tool>
    <ChatRoom v-show="route.path != '/404'"></ChatRoom>
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
