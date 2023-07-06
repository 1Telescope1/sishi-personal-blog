<template>
  <div class="blog-info">
    <div class="blog-item">
      <div>{{ articleLen }}</div>
      <div class="attribute">文章</div>
    </div>
    <div class="blog-item">
      <div>{{ tagLen }}</div>
      <div class="attribute">标签</div>
    </div>
    <div class="blog-item">
      <div>{{ talkLen }}</div>
      <div class="attribute">说说</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reqArticleTotal } from "@/api/article";
import { reqTagTotal } from "@/api/tag";
import { reqTalkTotal } from "@/api/talks";

let articleLen = ref(0);
let tagLen = ref(0);
let talkLen = ref(0);
const getLen = () => {
  reqArticleTotal().then((res) => {
    articleLen.value = res.data;
  });
  reqTagTotal().then((res) => {
    tagLen.value = res.data;
  });
  reqTalkTotal().then((res) => {
    talkLen.value = res.data;
  });
};
getLen();
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.blog-info {
  @include flexCenter;
  margin-top: 10px;
  .blog-item {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    &:not(:first-child) {
        border-left: 1px solid var(--grey-4);
    }

    .attribute {
      margin-top: -5px;
    }
  }
}
</style>
