<template>
  <div class="page-header">
    <h1 class="page-title">说说</h1>
    <img
      class="page-cover"
      src="https://static.linhaojun.top/aurora/photos/cbfc3ed82fc74d48c7dea7a3b0d98ecd.jpg"
      alt=""
    />
    <!-- 波浪 -->
    <Waves></Waves>
  </div>
  <div class="bg">
    <div class="page-container">
      <div class="talk-content" v-for="talk in talkList" :key="talk.id">
        <div class="talk-meta">
          <div>
            <img class="img rorate" :src="talk.avatarUrl" alt="" />
          </div>
          <div class="meta">
            <div class="name">
              <div class="user">{{ talk.user }}</div>
              <div><SvgIcon icon-class="badge"></SvgIcon></div>
            </div>
            <div class="time">{{ talk.time }}</div>
          </div>
        </div>
        <div class="content markdown-body" v-html="talk.html"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Talk } from "@/api/talks/type";
import { reqAllTalk } from "@/api/talks/index";

const talkList = ref<Talk[]>([]);
const init = async () => {
  const res = await reqAllTalk();
  if (res.code == 200) {
    talkList.value = res.data.reverse();
  }
};
init();
</script>

<style lang="scss" scoped>
.talk-content {
  padding: 16px 20px;
  box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
  transition: all 0.5s;
  margin-bottom: 10px;
  &:hover {
    box-shadow: 0 0 2rem var(--box-bg-shadow);
  }
  .talk-meta {
    display: flex;
    .img {
      width: 55px;
      height: 55px;
      border-radius: 10px;
      transition: all 0.5;
    }
    .meta {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      .name {
        display: flex;
        align-items: center;
      }
      .user {
        margin-right: 10px;
      }
      .time {
        font-size: 14px;
        color: #9499a0;
      }
      .content {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
