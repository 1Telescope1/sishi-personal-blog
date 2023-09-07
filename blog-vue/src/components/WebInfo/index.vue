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
      <div>{{ cnt }}</div>
    </div>
    <div class="time">
      <div>运行时长：</div>
      <div>{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";
import { reqGetViews } from "../../api/views/index";
import io from 'socket.io-client';
import { reqAddViews } from "@/api/blog";

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

let cnt = ref(0);

const addViews=async ()=>{
  await reqAddViews()
}

const getViews = async () => {
  await addViews()
  const res = await reqGetViews();
  if (res.status == 200) {
    cnt.value = res.data;
  }
};
getViews();


let onlineNumber=ref(0)

const socket = io(`ws://${import.meta.env.VITE_WS_URL}`); // 替换为您的Nest.js服务器地址

onMounted(()=>{
  // 监听 'usersCount' 事件，并更新用户数
  socket.on('usersCount', (count) => {
    onlineNumber.value = count;
  });

  // 向服务器发送 'getUsersCount' 事件，以获取当前用户数
  socket.emit('getUsersCount');
})

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
