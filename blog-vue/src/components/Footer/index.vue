<template>
  <div :class="routerPath=='/message' ? 'none' : 'block'">
    <Fish></Fish>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const routerPath = ref("");
const router = useRouter();
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    routerPath.value = newValue;
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.block {
  display: block;
}
.none {
  display: none;
}
</style>
