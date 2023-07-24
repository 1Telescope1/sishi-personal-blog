<template>
  <div>
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
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
</script>

<style lang="scss" scoped></style>
