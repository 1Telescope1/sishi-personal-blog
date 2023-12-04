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
      <Pagination
        v-if="articleParams.total"
        :pageNum="articleParams.pageNum"
        :sumPage="articleParams.sumPage"
        @clickPage="clickPage"
      ></Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {useRoute} from "vue-router";
import {ArticleParams, Article} from "@/api/article/type";
import {reqGetArticlesPage} from "@/api/article/index";

const route = useRoute();
const {tag} = route.params;
const articleParams = reactive<ArticleParams>({
  pageNum: 1,
  pageSize: 100,
  articleTitle: '',
  articleContent: '',
  tagId: tag,
  categoryId: '',
  type: '',
});

const articleList = ref<Article[]>([]);
const init = async () => {
  const res = await reqGetArticlesPage(articleParams);
  if (res.status == 200) {
    articleList.value = res.data.records;
    articleParams.total = res.data.total;
    articleParams.pageNum = res.data.current;
    articleParams.sumPage = Math.ceil(articleParams.total / articleParams.pageSize)
  }
};
init();

const clickPage = (val: number) => {
  articleParams.pageNum = val
  init()
  // 获取100vh转化px的高度
  const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  window.scrollTo({
    behavior: 'smooth',
    top: height,
  })
}
</script>

<style lang="scss" scoped></style>
