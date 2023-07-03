<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { ref } from "vue";
const user = useUserStore();
const click = () => {
  user.update();
};
</script>

<template>
  <div>
    <div style="position: relative;">
      <Images></Images>
      <Title></Title>
      <div>456</div>
    </div>
    <div class="bg">123</div>
    <div class="bg">123</div>
    <div class="bg">123</div>
    <div class="bg">123</div>
    <div class="bg">123</div>
    <div class="bg">123</div>
    <div class="bg">123</div>
    <div class="bg">123</div>
  </div>
</template>

<style scoped>
.bg {
  z-index: 100;
  background-color: red;
}
</style>
