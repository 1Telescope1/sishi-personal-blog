<template>
  <div class="page-header">
    <h1 class="page-title">{{ tag }}</h1>
    <img
      class="page-cover"
      src="https://static.linhaojun.top/aurora/photos/711d2de8da93505bf1b46f813e27097b.jpg"
      alt=""
    />
    <!-- 波浪 -->
    <Waves></Waves>
  </div>
  <div class="bg">
    <div class="page-container">
      <template v-for="(article, index) in articleList" :key="article.id">
        <ArticleItem :article="article" :index="index"></ArticleItem>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { ArticleParams, Article } from "../../api/article/type";
import { reqGetArticlesPage } from "../../api/article/index";

const route = useRoute();
const { tag } = route.params;
const articleParams = reactive<ArticleParams>({
  pageNum: 1,
  pageSize: 6,
  title: "",
  content: "",
  author: "",
  tag: tag as string,
});

const articleList = ref<Article[]>([]);
const init = async () => {
  const res = await reqGetArticlesPage(articleParams);
  if (res.code == 200) {
    articleList.value = res.data.records;
  }
};
init();
</script>

<style lang="scss" scoped>
</style>
