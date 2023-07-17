<template>
  <div class="pagination-content">
    <div
      v-show="pageNum == sumPage && sumPage != 1"
      class="first"
      @click="handlePage(pageNum - 1)"
    >
      <div>
        <SvgIcon icon-class="left-arrow" color="#24c6dc"></SvgIcon>
      </div>
      <div class="text">新的</div>
    </div>
    <div
      class="num"
      v-for="i in sumPage"
      :class="pageNum == i ? 'active' : ''"
      @click="handlePage(i)"
    >
      {{ i }}
    </div>
    <div
      v-show="pageNum == 1 && sumPage != 1"
      class="last"
      @click="handlePage(pageNum + 1)"
    >
      <div class="text">以往</div>
      <div>
        <SvgIcon icon-class="right-arrow" color="#24c6dc"></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { pageNum, sumPage } = defineProps(["pageNum", "sumPage"]);

const emit = defineEmits(["clickPage"]);
const handlePage = (i: number) => {
  emit("clickPage", i);
};
</script>

<style lang="scss" scoped>
.pagination-content {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5;
  font-weight: 700;
  .first,
  .last {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
  .text {
    margin: 0 3px;
  }
  .num {
    margin: 0 4px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  .active {
    color: #ff0099;
  }
}
</style>
