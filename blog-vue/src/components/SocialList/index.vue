<template>
  <div class="social-list">
    <template v-for="(item, index) in showSocialList" :key="index">
      <a
        class="social-item"
        target="_blank"
        :href="item.href"
      >
        <SvgIcon
          :icon-class="item.type"
          size="1.4rem"
          :color="red"
        ></SvgIcon>
      </a>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const red='red'
const showSocialList = [
  {
    type: "gitee",
    href: "https://portrait.gitee.com/shen-qun-deng",
  },
  {
    type:"github",
    href:"https://github.com/1Telescope1"
  },
  {
    type: "qq",
    href: "http://tool.gljlw.com/qq/?qq=2298908190",
  },
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.social-list {
  margin-top: 10px;
  @include flexCenter;
  .social-item {
    padding: 0 10px;
  }
}
</style>
