<template>
  <div class="chat-container" :style="isShowChatRoom ? {display:'block'} : {display:'none'}">
    <div>123</div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useBlogStore} from "@/store/blog.ts";


let blogStore=useBlogStore()

const isShowChatRoom=computed(()=>blogStore.isShowChatRoom)

</script>

<style scoped lang="scss">
.chat-container {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 400px;
  height: calc(100% - 200px);
  min-height: 150px;
  border-radius: 1rem;
  box-shadow: 0 5px 40px #00000029;
  font-size: 14px;
  background: var(--grey-1);
  animation: bounceInUp 1s;
  animation-fill-mode: both;
  z-index: 100;
}
</style>