<template>
  <div class="article-main">
    <div class="article-img">
      <img class="cover" v-lazy="article.coverUrl" />
    </div>
    <div class="article-info">456</div>
  </div>
</template>

<script setup lang="ts">
import { Article } from "@/api/article/type";
defineProps<{ article: Article }>();
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.article-main {
  display: flex;
  margin: 15px 8px 0px;
  height: 224px;
  background-color: pink;
  border-radius: 15px;
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.3);
  animation-duration: 0.5s;
  transition: all 0.2s ease-in-out 0s;

  &:hover {
    .cover {
      transform: scale(1.05) rotate(1.5deg);
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
    .article-img {
      width: 50%;
      margin-left: 1.5rem;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%);
      border-radius: 0 0.625rem 0.625rem 0;
      overflow: hidden;

      .cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.2s ease-in-out 0s;
      }
    }
    .article-info {
      width: 50%;
    }
  }

  &:nth-child(odd) {
    .article-img {
      width: 50%;
      margin-right: 1.5rem;
      clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%);
      border-radius: 0.625rem 0 0 0.625rem;
      overflow: hidden;

      .cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.2s ease-in-out 0s;
      }
    }
    .article-info {
      width: 50%;
    }
  }
}
</style>
