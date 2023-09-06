<template>
  <div class="f-breadcrumb" :style="{ left: blogStore.asideWidth }">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item style="cursor: pointer" v-for="route in matched" :key="route.path" :to="route.path">{{route.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>


<script setup lang='ts'>
import { useBlogStore } from "@/store/blog";
import {useRoute} from 'vue-router'
import {watch,ref} from 'vue'

const blogStore=useBlogStore()
const route=useRoute()
let matched=ref(route.matched)

watch(route,(newRoute)=>{
  matched.value=newRoute.matched
})

</script>

<style lang="scss" scoped>
.f-breadcrumb {
  width: 100%;
  background-color: rgb(243, 244, 246);
  position: fixed;
  display:flex;
  align-items: center;
  padding-left: 0.5rem/* 8px */;
  padding-right: 0.5rem/* 8px */;
  top: 64px;
  height: 40px;
  z-index: 100;
}
</style>
