<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Article } from '@/api/article/type';
import { reqGetArticlesPage } from '../../api/article/index';
import { ArticleParams } from '@/api/article/type';
const arrowDown = () => {
  window.scrollTo({
    behavior: 'smooth',
    top: document.documentElement.clientHeight
  });
};

const articleList = ref<Article[]>([]);
const paramas = reactive<ArticleParams>({
  pageNum: 1,
  pageSize: 6,
  tagId: '',
  categoryId: '',
  type: '',
  articleTitle: '',
  articleContent: '',
  total: null,
  sumPage: 0
});
const getPageArticleList = async () => {
  const res = await reqGetArticlesPage(paramas);
  console.log(res, 123);
  if (res.status == 200) {
    articleList.value = res.data.records;
    paramas.total = res.data.total;
    paramas.pageNum = res.data.pageNum;
    paramas.sumPage = Math.ceil(paramas.total / paramas.pageSize);
  }
};
getPageArticleList();

const clickPage = (val: number) => {
  paramas.pageNum = val;
  getPageArticleList();
  // 获取100vh转化px的高度
  const height = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  window.scrollTo({
    behavior: 'smooth',
    top: height
  });
};
</script>

<template>
  <div class="bg">
    <div style="position: relative">
      <Images></Images>
      <Title></Title>
      <Waves></Waves>
      <el-icon class="arrow-down" :size="36" :color="'black'" @click="arrowDown"
        ><ArrowDown
      /></el-icon>
    </div>
    <div class="home-container">
      <div class="left-container">
        <div class="w-100">
          <div class="news">
            <div class="flex">
              <SvgIcon icon-class="laba" size="1.2rem"></SvgIcon>
            </div>
            <div>
              仓库地址：https://github.com/1Telescope1/sishi-personal-blog
            </div>
            <div class="flex arrow-right">
              <el-icon :size="20"><DArrowRight /></el-icon>
            </div>
          </div>
          <div class="article">
            <template v-for="(article, index) in articleList" :key="article.id">
              <ArticleItem :article="article" :index="index"></ArticleItem>
            </template>
            <Pagination
              v-if="paramas.total"
              :pageNum="paramas.pageNum"
              :sumPage="paramas.sumPage"
              @clickPage="clickPage"
            ></Pagination>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="w-100">
          <AuthorCard></AuthorCard>
          <Notice></Notice>
          <Comment></Comment>
          <WebInfo></WebInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  z-index: 100;
}
.arrow-down {
  position: absolute;
  bottom: 70px;
  left: 49%;
  -webkit-animation: arrow-shake 1.5s ease-out infinite;
  animation: arrow-shake 1.5s ease-out infinite;
  cursor: pointer;
  z-index: 8;
}

@keyframes arrow-shake {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  30% {
    opacity: 0.5;
    transform: translateY(25px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.news {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  margin: 0 8px;
  border-radius: 15px;
}
.arrow-right {
  animation: arrow-right-shake 1.5s ease-out infinite;
}
@keyframes arrow-right-shake {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  30% {
    opacity: 0.5;
    transform: translateX(8px);
  }
  70% {
    opacity: 0.2;
    transform: translateX(12px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.w-100 {
  width: 100%;
}
</style>
