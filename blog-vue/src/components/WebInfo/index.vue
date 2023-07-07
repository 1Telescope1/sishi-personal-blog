<template>
  <div class="web-info">
    <div class="title">
      <svg-icon icon-class="web" size="1.2rem"></svg-icon>
      <div class="text">网站资讯</div>
    </div>
    <div class="online-number">
      <div>在线人数：</div>
      <div>{{ onlineNumber }}</div>
    </div>
    <div class="views">
      <div>浏览量：</div>
      <div>{{ views }}</div>
    </div>
    <div class="time">
      <div>运行时长：</div>
      <div>{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reqGetViews } from "../../api/views/index";
import { useBlogStore } from "../../store/blog";

let time = ref("");
const runTime = () => {
  const timeold = new Date().getTime() - new Date(1666150469508).getTime();
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysold = Math.floor(timeold / msPerDay);
  let str = "";
  const day = new Date();
  str += daysold + "天";
  str += day.getHours() + "时";
  str += day.getMinutes() + "分";
  str += day.getSeconds() + "秒";
  time.value = str;
};
setInterval(runTime, 1000);

let views = ref(0);
const getViews = async () => {
  const res = await reqGetViews();
  if (res.code == "200") {
    views.value = res.data;
  }
};
getViews();

const BlogStore = useBlogStore();
const onlineNumber = BlogStore.onlineNumber;
</script>

<style lang="scss" scoped>
.web-info {
  margin-top: 20px;
  padding: 16px;
  border-radius: 15px;
  box-shadow: 0 0 1rem var(--box-bg-shadow);
  transition: all 0.2s ease-in-out 0s;

  .title {
    display: flex;
    align-items: center;
  }
  .text {
    font-size: 18px;
    margin-left: 10px;
  }
  .time,
  .views,
  .online-number {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
