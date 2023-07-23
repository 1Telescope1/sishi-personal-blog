<template>
  <div class="blog-info">
    <div class="blog-item" @click="pushInfo('archive')">
      <div class="len">{{ blogStore.articleLen }}</div>
      <div class="attribute">文章</div>
    </div>
    <div class="blog-item" @click="pushInfo('tag')">
      <div class="len">{{ blogStore.tagLen }}</div>
      <div class="attribute">标签</div>
    </div>
    <div class="blog-item" @click="pushInfo('talks')">
      <div class="len">{{ blogStore.talkLen }}</div>
      <div class="attribute">说说</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { getBlogDetail } from '@/api/blog/index';
import { useBlogStore } from "@/store/blog";


const router=useRouter()
const pushInfo=(params:string)=>{
  router.push(params)
}

const blogStore=useBlogStore()

const getLen =async () => {
  const res=await getBlogDetail()
  if(res.status==200) {
    blogStore.articleLen=res.data[0]
    blogStore.tagLen=res.data[1]
    blogStore.talkLen=res.data[2]
  }
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
