<template>
  <div class="comment-container">
    <div class="title">
      <svg-icon icon-class="comment" size="1.2rem"></svg-icon>
      <div class="text">最新留言</div>
    </div>
    <div class="content" v-for="message in messageList" :key="message.id">
      <div class="img rorate">
        <img v-lazy="message.user?.avatar ? message.user?.avatar : url" alt="" />
      </div>
      <div class="detail">
        <div class="name">{{ message.user?.nickname ? message.user?.nickname : '游客'}}</div>
        <div class="time">{{formatDateTime( message.createTime )}}</div>
        <div class="message">
          {{ message.commentContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Message } from "@/api/message/type";
import { reqFiveMessage } from "@/api/message";
import { formatDateTime } from "@/utils/date";

const url='http://43.138.109.120:9000/avatar/2785e109706e4376a7fa06a1c5c65a59_1666582417286.png'

const messageList = ref<Message[]>([]);
const getMessageList = async () => {
  const res = await reqFiveMessage();
  if (res.status == 200) {
    messageList.value = res.data;
    console.log(messageList.value)
  }
};
getMessageList();
</script>

<style lang="scss" scoped>
.comment-container {
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
  .content {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    border-radius: 15px;
    transition: all 0.5;
    &:hover {
      box-shadow: 0 20px 25px -5px rgba(232, 57, 255, 0.06),
        0 10px 10px -5px rgba(53, 11, 59, 0.1);
    }
    .img {
      width: 65px;
      height: 65px;
      margin-right: 10px;
    }
    .img img {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }
    .detail {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      line-height: 16px;
      width: 70%;
      .name {
        margin-bottom: 5px;
        color: #ff009999;
      }
      .time {
        margin-bottom: 5px;
        color: #6b7280;
      }
      .message {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
