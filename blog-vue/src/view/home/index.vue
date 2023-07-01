<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { reqTags } from "@/api/tag";
const user = useUserStore();
const click = () => {
  user.update();
};

const getTag = async () => {
  const data = await reqTags();
  console.log(data);
};

getTag();
</script>

<template>
</template>

<style scoped>


</style>
