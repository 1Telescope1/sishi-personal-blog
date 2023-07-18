<template>
  <div class="notice-container">
    <div class="title">
      <SvgIcon class="trumpet" icon-class="trumpet" size="1.2rem" color="red"></SvgIcon>
      <div class="text">公告</div>
    </div>
    <div class="content">
      后端基于SpringBoot开发，前端基于Vue3+Ts+daisyUI+ElementPlus开发
    </div>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang="scss" scoped>
.notice-container {
  margin-top: 20px;
  padding: 16px;
  border-radius: 15px;
  box-shadow: 0 0 1rem var(--box-bg-shadow);
  transition: all 0.2s ease-in-out 0s;
  .title {
    display: flex;
    align-items: center;
  }
  .text {
    font-size: 18px;
    margin-left: 10px;
  }
  .content {
    font-size: 14px;
  }
}

.trumpet {
  animation: trumpet-shake 1s linear infinite;
}

@keyframes trumpet-shake {
  0% {
    transform: rotate(-15deg);
  }

  4% {
    transform: rotate(15deg);
  }

  16% {
    transform: rotate(-22deg);
  }

  20% {
    transform: rotate(22deg);
  }

  8%,
  24% {
    transform: rotate(-18deg);
  }

  12%,
  28% {
    transform: rotate(18deg);
  }

  32% {
    transform: rotate(-12deg);
  }

  36% {
    transform: rotate(12deg);
  }

  40%,
  100% {
    transform: rotate(0deg);
  }
}
</style>
