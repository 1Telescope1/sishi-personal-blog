<template>
  <div class="f-breadcrumb" :style="{ left: blogStore.asideWidth }">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>


<script setup lang='ts'>
import {ref} from 'vue'
import { useBlogStore } from "@/store/blog";

const blogStore=useBlogStore()

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
