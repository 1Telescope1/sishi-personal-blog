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
    <Images></Images>
  </div>
</template>

<style scoped>


</style>
