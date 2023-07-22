<template>
  <div class="page-header">
    <h1 class="page-title">友链</h1>
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
      <div class="title">标签 - {{ tagLen }}</div>
      <div class="content">
        <router-link
          :to="`/tagdetail/${tag.name}`"
          v-for="tag in tagList"
          :key="tag.id"
        >
          <div class="tag">
            {{ tag.name }}
            <sup>{{tag.cnt}}</sup>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Tag } from "../../api/tag/type";
import { reqTags } from "../../api/tag/index";

const tagList = ref<Tag[]>([]);
let tagLen = ref(0);
const init = async () => {
  const res = await reqTags();
  if (res.status == 200) {
    tagList.value = res.data;
    tagLen.value = res.data.length;
  }
};
init();
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-weight: 700;
  font-size: 32px;
}
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .tag {
    cursor: pointer;
    color: #616161;
    display: inline-block;
    text-decoration: none;
    padding: 0 8px;
    line-height: 2;
    transition: all 0.3s;
    font-size: 20px;

    &:hover {
      transform: scale(1.2);
      color: #03a9f4;
    }
  }
}
</style>
