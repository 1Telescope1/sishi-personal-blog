<template>
  <div class="page-header">
    <h1 class="page-title">{{ talk?.title }}</h1>
    <img
      class="page-cover"
      src="https://static.linhaojun.top/aurora/photos/db65e35d7441ea7e58c17288b15beecd.jpg"
      alt=""
    />
    <!-- 波浪 -->
    <Waves></Waves>
  </div>
  <div class="bg">
    <div class="main-container" v-if="talk">
      <div class="message-container">
        <v-md-preview
          ref="talkRef"
          class="md"
          :text="talk.content"
        ></v-md-preview>
        <Comment></Comment>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Comment from "./components/Comment.vue"
import { useRoute } from "vue-router";
import { Talk } from "@/api/talks/type";
import { ref } from "vue";
import { reqTalkById } from "@/api/talks/index";

const route = useRoute();
const { id } = route.params as unknown as { id: number };
const talk = ref<Talk>();
const init = async () => {
  const res = await reqTalkById(id);
  if (res.status == 200) {
    talk.value = res.data;
  }
};
init();
</script>

<style lang="scss" scoped>
.main-container {
  width: 70%;
}
.message-container {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 1rem var(--box-bg-shadow);
}
</style>
