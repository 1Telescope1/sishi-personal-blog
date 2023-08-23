<template>
  <div class="tool-container" :style="process>0 ?  '' : none">
    <div @click="pushComment" v-show="commentShow($route.name as string)" class="comment">
      <SvgIcon icon-class="comments" size="1.2rem"></SvgIcon>
    </div>
    <div class="top" @click="pushTop">
      <div>
        <SvgIcon icon-class="up" size="1rem"></SvgIcon>
      </div>
      <div>{{ process}}%</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useEventListener } from "@vueuse/core";
import {ref,computed} from 'vue'

const none={
  transform: "translateX(40px)"
}

const commentList=['article','talk']
const commentShow=computed(()=>(value:string)=>commentList.includes(value))
const pushComment = () => {
  document.querySelector(".comment-container")?.scrollIntoView({
    block: "start",
    inline: "nearest",
    behavior: 'smooth'
  });
}

const process=ref(0)
useEventListener(document, "scroll", () => {
  process.value = Number(
    (
      (window.pageYOffset /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100
    ).toFixed(0)
  )
});
const pushTop=()=>{
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

</script>

<style lang="scss" scoped>
.tool-container {
  position: fixed;
  bottom: 20%;
  right: 10px;
  z-index: 999;
  font-size: 12px;
  padding: 2px 2px;
  width: 35px;
  color: #E9546B;
  transition: all 0.5s;
  box-shadow: 0 0 0.5rem #0000001a;
  .top,.comment {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    margin-bottom: 5px;
  }
}

@media (max-width: 1300px) {
  .tool-container {
    display: none;
  }
}
</style>
