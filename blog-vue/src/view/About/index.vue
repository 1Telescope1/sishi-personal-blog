<template>
  <div class="page-header">
    <h1 class="page-title">关于</h1>
    <img
      class="page-cover"
      src="https://static.linhaojun.top/aurora/photos/765664a8a75211296a9cd89671d6d660.png"
      alt=""
    />
    <!-- 波浪 -->
    <Waves></Waves>
  </div>
  <div class="bg">
    <div class="about-container">
      <div class="left">
        <div class="left-main">
          <template v-for="item in data" :key="item.key">
            <div class="about">{{ item.key}}</div>
          <div class="about-content">
            {{ item.val }}
          </div>
          </template>
        </div>
      </div>
      <div class="right">
        <div style="width: 100%;">
          <AuthorCard></AuthorCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const data=ref([
  {
    key:"关于站点",
    val:"平时可能会分享一些日常，也会写一些文章发布上来"
  },
  {
    key:"个人介绍",
    val:"大三 软件工程"
  },
  {
    key:"目前使用的编程语言",
    val:"Java,JavaScript,TypeScript"
  },
  {
    key:"个人爱好",
    val:"混吃等死摆大烂"
  }
])

</script>

<style lang="scss" scoped>
.about-container {
  width: 900px;
  margin: 1.5rem auto;
  border-radius: 0.75rem;
  animation: slideUpIn 1s;
  display: flex;

  .left-main {
    width: 100%;
    padding: 20px;

    .about {
      font-size: 26px;
      font-weight: 700;
    }
    .about-content {
      font-size: 18px;
      margin-bottom: 25px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
}
.left{
  display: flex;
  align-items: flex-start;
  width: 65%;
  margin: 0 auto;
  box-shadow: 0 0 1rem var(--box-bg-shadow);
}
.right {
  display: flex;
  position: sticky;
  top: 20px;
  align-items: flex-start;
  justify-content: center;
  width: 30%;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .left {
    width: 100%;
  }
  .right {
    display: none;
  }
}
</style>
