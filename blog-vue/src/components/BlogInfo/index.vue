<template>
  <div class="blog-info">
    <div class="blog-item" @click="pushInfo('archive')">
      <div class="len">{{ articleLen }}</div>
      <div class="attribute">文章</div>
    </div>
    <div class="blog-item" @click="pushInfo('tag')">
      <div class="len">{{ tagLen }}</div>
      <div class="attribute">标签</div>
    </div>
    <div class="blog-item" @click="pushInfo('talks')">
      <div class="len">{{ talkLen }}</div>
      <div class="attribute">说说</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reqArticleTotal } from "@/api/article";
import { reqTagTotal } from "@/api/tag";
import { reqTalkTotal } from "@/api/talks";
import { useRouter } from "vue-router";

const router=useRouter()
const pushInfo=(params:string)=>{
  router.push(params)
}

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
    
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
    &:not(:first-child) {
        border-left: 1px solid var(--grey-4);
    }
    .len {
      font-size: 16px;
      font-weight: 600;
    }

    .attribute {
      margin-top: -5px;
    }
  }
}
</style>
