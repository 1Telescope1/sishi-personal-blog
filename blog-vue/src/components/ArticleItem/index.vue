<template>
  <div class="article-main" @click="pushArticle" v-animate="['slideUpBigIn']">
    <div class="article-img">
      <img class="cover" v-lazy="article.articleCover" />
    </div>
    <div class="article-info">
      <div class="timeAndTag">
        <div class="tag">
          <el-icon :size="16"><Star /></el-icon>{{ article.tag.tagName }}
        </div>
        <div class="time">
          <el-icon :size="16"><Calendar /></el-icon
          >{{ article.createTime.substring(0, 10) }}
        </div>
      </div>
      <div class="article-title">{{ article.articleTitle }}</div>
      <div class="article-content">{{ article.articleContent }}</div>
      <div class="article-footer">
        <div class="article-author">
          <img class="authorUrl rorate" v-lazy="article.userinfo.avatar" alt="" />
          <div>{{ article.userinfo.nickname }}</div>
        </div>
        <div class="more">more...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Article } from "@/api/article/type";
const props=defineProps<{ article: Article ,index:number}>();
const articleId=props.article.id
const router=useRouter()
const pushArticle=()=>{
  router.push(`/article/${articleId}`)
}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

@media (max-width: 1300px) {
  .article-main {
    height: 234px !important;
  }
}

@media (max-width: 700px) {
  .article-main {
    height: 214px !important;
  }
}

.article-main {
  display: flex;
  margin: 15px 8px 0px;
  height: 264px;
  border-radius: 15px;
  /* box-shadow: 0 1px 1.5px 2px rgba(0, 0, 0, 0.1); */
  box-shadow: 0 4px 8px 6px rgb(7 17 27 / 6%);
  animation-duration: 0.5s;
  transition: all 0.2s ease-in-out 0s;
  visibility: hidden;

  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    .cover {
      transform: scale(1.05) rotate(1.5deg);
      
    }
  }

  &:nth-child(odd) {
    flex-direction: row-reverse;
    .article-img {
      margin-left: 1.5rem;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%);
      border-radius: 0px 15px 15px 0px;
    }
    .article-info {
      padding: 15px 0px 15px 15px;
    }

    .article-footer {
      flex-direction: row-reverse;
      .more {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 3px 20px;
        border-radius: 0 15px;
        background-image: linear-gradient(
          to right,
          var(--color-orange) 0,
          var(--color-pink) 100%
        );
        &:hover {
          transform: translateX(-5px) translateY(5px);
        }
      }
    }
  }

  &:nth-child(even) {
    .article-img {
      margin-right: 1.5rem;
      clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%);
      border-radius: 15px 0 0 15px;
    }
    .article-info {
      padding: 15px 15px 15px 0px;
    }
    .article-footer {
      flex-direction: row;
      .more {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 3px 20px;
        border-radius: 15px 0;
        color: var(--grey-0);
        background-image: linear-gradient(
          to left,
          var(--color-pink) 0,
          var(--color-orange) 100%
        );
        &:hover {
          transform: translateX(5px) translateY(5px);
        }
      }
    }
  }
}

.article-img {
  width: 50%;
  overflow: hidden;
  .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.2s ease-in-out 0s;
    cursor: pointer;
  }
}
.article-info {
  position: relative;
  width: 50%;
}

.timeAndTag {
  display: flex;
  flex-direction: row-reverse;
  font-size: 13px;
  color: #aaaaaa;
}
.tag {
  @include flexCenter;
}
.time {
  @include flexCenter;
  margin-right: 5px;
}
.article-title {
  margin: 5px 0px;
  font-size: 18px;
  color: #e9546b;
}
.article-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-height: 5rem;
  font-size: 0.875em;
  overflow: hidden;
}
.article-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  .article-author {
    display: flex;
    align-items: center;

    .authorUrl {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
.more {
  font-size: 18px;
  cursor: pointer;
  transition: all 0.5s;
}
</style>
