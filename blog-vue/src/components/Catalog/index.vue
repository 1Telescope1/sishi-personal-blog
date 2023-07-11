<template>
  <div class="catalog-header">
    <div><svg-icon icon-class="category"></svg-icon> </div>
    <div style="margin-left: 5px;">目录</div>
  </div>
  <div class="catalog-content">
    <div class="catalog-item" v-for="(anchor, index) of titleList" :key="anchor.title"
      :class="currentIndex === index ? 'active' : ''" :style="{ paddingLeft: `${5 + anchor.indent * 15}px` }"
      @click="handleAnchorClick(anchor, index)">
      <a> {{ anchor.title }} </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScroll, watchThrottled } from '@vueuse/core';
import { nextTick, onMounted, ref } from 'vue';

const titleList = ref<any>([]);
const currentIndex = ref(0);
const props = defineProps({
  domRef: {
    type: Object,
    default: null,
  }
});

const getTitles = () => {
  const anchors = props.domRef.$el.querySelectorAll('h1,h2,h3')
  const titles = Array.from(anchors).filter((t: any) => !!t.innerText.trim())
  if (!titles.length)
    titleList.value = []
  const hTags = Array.from(new Set(titles.map((t: any) => t.tagName))).sort()
  titleList.value = titles.map((el: any, idx: number) => {
    return {
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName),
    }
  })
}

// 点击锚点目录
function handleAnchorClick(anchor: any, idx: number) {
  const heading = props.domRef.$el.querySelector(`[data-v-md-line="${anchor.lineIndex}"]`)
  // const heading = preview.querySelector(`#${anchor.title}`)
  if (heading) {
    window.scrollTo({
      behavior: 'smooth',
      top: heading.offsetTop - 40,
    })
    setTimeout(() => currentIndex.value = idx, 600)
  }
}

// * 实现目录高亮当前位置的标题
// 思路: 循环的方式将标题距离顶部距离与滚动条当前位置对比, 来确定高亮的标题
const { y } = useScroll(window)
watchThrottled(y, () => {
  titleList.value.forEach((e: any, idx: number) => {
    const heading = props.domRef.$el.querySelector(`[data-v-md-line="${e.lineIndex}"]`)
    if (y.value >= heading.offsetTop - 50) // 比 40 稍微多一点
      currentIndex.value = idx
  })
}, { throttle: 200 })
onMounted(() => {
  nextTick(() => {
    getTitles();
  })
});
</script>

<style lang="scss" scoped>
.catalog-header {
  display: flex;
  align-items: center;
}
.catalog-content {
  max-height: calc(100vh - 100px);
  overflow: auto;
  margin-right: -16px;
  padding-right: 16px;
}

.catalog-item {
  margin: 5px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  padding: 2px 6px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: var(--primary-color);
  }
}

.active {
  background-color: var(--primary-color);
  color: var(--grey-0);

  &:hover {
    background-color: var(--color-blue);
    color: var(--grey-0);
  }
}
</style>