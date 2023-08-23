<template>
    <div class="page-header" v-if="article">
      <div class="page-title">
        <h1 class="article-title">{{ article.articleTitle }}</h1>
        <div class="article-meta">
          <div class="meta">
            <div>
              <svg-icon
                icon-class="calendar"
                style="margin-right: 0.15rem"
              ></svg-icon>
            </div>
            <div class="text">发表于</div>
            <div>{{ formatDate(article.createTime) }}</div>
          </div>
          <div class="meta">
            <div>
              <svg-icon
                icon-class="update"
                style="margin-right: 0.15rem"
              ></svg-icon>
            </div>
            <div class="text">更新于</div>
            <div>{{ formatDate(article.updateTime) }}</div>
          </div>
          <div class="meta">
            <div>
              <svg-icon
                icon-class="eye"
                style="margin-right: 0.15rem"
              ></svg-icon>
            </div>
            <div class="text">浏览量</div>
          </div>
          <div>{{ article.views }}</div>
        </div>
        <div class="article-meta">
          <div class="meta">
            <div>
              <svg-icon
                icon-class="edit"
                size="0.9rem"
                style="margin-right: 0.15rem"
              ></svg-icon>
            </div>
            <div>字数统计</div>
            <div>{{ count(wordNum) }}字</div>
          </div>
          <div class="meta">
            <div>
              <svg-icon
                icon-class="clock"
                size="0.9rem"
                style="margin-right: 0.15rem"
              ></svg-icon>
            </div>
            <div>阅读时长</div>
            <div>{{ readTime }}分钟</div>
          </div>
          <div class="meta">
            <div>
              <svg-icon
                icon-class="category"
                size="0.9rem"
                style="margin-right: 0.15rem"
              ></svg-icon>
            </div>
            <div>{{ article.tag.tagName }}</div>
          </div>
        </div>
      </div>
      <img class="page-cover" :src="article.articleCover" alt="" />
      <!-- 波浪 -->
      <Waves></Waves>
    </div>
    <div class="bg">
      <div class="main-container" v-if="article">
        <div class="left-container">
          <div class="article-container">
            <v-md-preview
            v-viewer
              ref="articleRef"
              class="md"
              :text="article.articleContent"
            ></v-md-preview>
            <Comment></Comment>
          </div>
        </div>
        <div class="right-container">
          <div class="side-card">
            <Catalog v-if="articleLoaded" :domRef="articleRef"></Catalog>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import Comment from "./components/Comment.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Article } from "@/api/article/type";
import { reqArticleById } from "@/api/article/index";
import { formatDate } from "@/utils/date";

const route = useRoute();
const { articleId } = route.params;
const article = ref<Article>();
const articleRef = ref();
const articleLoaded = ref(false);
const init = async () => {
  const res = await reqArticleById(articleId as string);
  if (res.status == 200) {
    article.value = res.data;
    wordNum.value = deleteHTMLTag(article.value!.articleContent).length;
    readTime.value = Math.round(wordNum.value / 400);
    articleLoaded.value = true;
  }
};

init();
const readTime = ref(0);
const wordNum = ref(0);
const count = (value: number) => {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  }
  return value;
};
const deleteHTMLTag = (content: string) => {
  return content
    .replace(/<\/?[^>]*>/g, "")
    .replace(/[|]*\n/, "")
    .replace(/&npsp;/gi, "");
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";


.article-container {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 1rem var(--box-bg-shadow);
}

.article-post {
  margin: 0 2rem;
  padding-bottom: 1rem;
}

.article-title {
  font-weight: 500;
  font-size: 2.5rem;
  letter-spacing: 0.125rem;
  text-align: center;
  color: var(--header-text-color);
}

.article-meta {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: aliceblue;

  .meta {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 10px;
  }
}
.comment {
  padding: 32px 40px;
}

@media (max-width: 1300px) {
  .left-container {
    width: 70%;
  }
  .right-container {
    display: block;
  }
}
@media (max-width: 1000px) {
  .left-container {
    width: 100%;
  }
  .right-container {
    display: none;
  }
}
</style>
