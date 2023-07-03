<template>
  <div class="title">
    <h1 class="artboard">Hello World</h1>
    <h1 class="text">{{ signature }}<span class="typed-cursor">|</span></h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
let signature = ref<string>("hhhh");
let timer = 0;
const appear = (text: string) => {
  signature.value = "";
  clearTimeout(timer);

  let speed = 80; //设置定时的速度 越来越快
  let count = 1;
  function changeContent() {
    signature.value = text.substring(0, count); //截取字符串
    count++;

    if (count != text.length + 1) {
      speed -= 1;
      if (speed < 5) speed = 5;
      timer = setTimeout(changeContent, speed);
    }
  }
  changeContent();
};

onMounted(() => {
  appear("Do not go gentle into the good night");
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/mixin.scss";
.title {
  /* @include absolute;
  width: 100%;
  height: 100%; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-60%);

  .artboard {
    font-family: "Fredericka the Great", Mulish, -apple-system, "PingFang SC",
      "Microsoft YaHei", sans-serif;
    font-size: 3.5em;
    line-height: 1.2;
    animation: titleScale 1s;
    text-align: center;
  }
  .text {
    font-size: 24px;
    text-align: center;
  }
  .typed-cursor {
  opacity: 1;
  animation: blink 0.7s infinite;
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
}
</style>
