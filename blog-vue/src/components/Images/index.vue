<template>
  <div class="imgs">
    <ul>
      <li
        class="item"
        ref="items"
        v-for="(image, index) in imageList"
        :key="index"
        :style="{
          'background-image': 'url(' + image.url + ')',
        }"
      ></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { getBackImages } from "@/api/backimg/index";
import { TagData } from "@/api/backimg/type";

const imageList = ref<TagData[]>([]);
const getImageList = async () => {
  const res = await getBackImages();
  if (res.code === "200") {
    imageList.value = res.data;
  }
};
getImageList();

const items = ref();
watch(items, () => {
  items.value.forEach((element: any, index: number) => {
    element.style.animationDuration = `${5 * items.value.length}s`;
    element.style.animationDelay = `${index * 5}s`;
  });
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.imgs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -9;
  overflow: hidden;

  .item {
    @include absolute;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50% / cover;
    opacity: 0;
    animation-name: imageAnimation;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out 0s;
  }
}

@keyframes imageAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }

  2% {
    opacity: 1;
  }

  8% {
    opacity: 1;
    transform: scale(1.05);
    animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    transform: scale(1.1);
  }

  25% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 0;
  }
}
</style>
