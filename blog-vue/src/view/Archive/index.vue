<template>
  <div class="page-header">
    <h1 class="page-title">归档</h1>
    <img
      class="page-cover"
      src="http://43.138.109.120:9000/cover/ba41a32b219e4b40ad055bbb52935896_Y0819msuI.jpg"
      alt=""
    />
    <!-- 波浪 -->
    <Waves></Waves>
  </div>
  <div class="bg">
    <div class="page-container">
      <el-timeline>
        <el-timeline-item
          v-for="article in articleList"
          :key="article.id"
          :timestamp="article.createTime.substring(0,10)"
          placement="top"
        >
          <router-link :to="`/article/${article.id}`">
            <el-card class="card">
              <div class="img">
                <img :src="article.articleCover" alt="" />
              </div>
              <div class="content">
                <div class="title">
                  {{ article.articleTitle }}<span class="tag">{{ article.tag.tagName }}</span>
                </div>
                <div class="text">{{ article.articleContent }}</div>
              </div>
            </el-card>
          </router-link>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Article } from "@/api/article/type";
import { reqGetArticleList } from "../../api/article/index";
const articleList = ref<Article[]>();
const init = async () => {
  const res = await reqGetArticleList();
  if (res.status == 200) {
    articleList.value = res.data;
  }
};
init();
</script>

<style lang="scss" scoped>
.card {
  :deep(.el-card__body) {
    display: flex;
    flex-direction: row;
  }
  .img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    overflow: hidden;
    border-radius: 10px;

    & img {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease-in-out 0s;
    }
    &:hover {
      & img {
        transform: scale(1.1);
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease-in-out 0s;
      &:hover {
        color: #e9546b;
        transform: translateX(5px);
      }
    }
    .tag {
      color: #03a9f4;
      margin-left: 15px;
    }
    .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      max-height: 5rem;
      font-size: 0.875em;
      overflow: hidden;
      max-width: 350px;
    }
  }
}
</style>
