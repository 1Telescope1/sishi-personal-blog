<template>
  <div class="message-container">
    <h1 class="title">留言板</h1>
    <div class="animated fadeInUp message-input-wrapper">
      <input
        v-model="message"
        @click="show = true"
        @keyup.enter="addToList"
        placeholder="说点什么吧"
      />
      <button
        style="margin-left: 15px"
        class="btn"
        @click="addToList"
        v-show="show"
      >
        发送
      </button>
    </div>
  </div>
  <!-- 弹幕列表 -->
  <div class="danmaku-container">
    <vue-danmaku
      ref="danmaku"
      class="danmaku"
      use-slot
      v-model:danmus="messageList"
      :is-suspend="true"
    >
      <template v-slot:dm="{ danmu }">
        <span class="danmaku-item">
          <img
            :src="danmu.avatarUrl"
            width="30"
            height="30"
            style="border-radius: 50%"
          />
          <span class="ml">{{ danmu.username }} :</span>
          <span class="ml">{{ danmu.content }}</span>
        </span>
      </template>
    </vue-danmaku>
  </div>
</template>

<script setup lang="ts">
import vueDanmaku from "vue3-danmaku";
import { ref } from "vue";
import { Message } from "@/api/message/type";
import { reqAllMessage } from "@/api/message/index";
import { notification } from "../../utils/elComponent";
import { useUserStore } from "@/store/user";
import { useBlogStore } from "../../store/blog";
import { reqAddMessage } from "../../api/message/index";

const messageList = ref<Message[]>();

const init = async () => {
  const res = await reqAllMessage();
  if (res.code == 200) {
    messageList.value = res.data;
  }
};
init();

let message = ref("");
let show = ref(false);

const { user } = useUserStore();
const { touristAvatar, touristName } = useBlogStore();
const addToList = () => {
  if (message.value.trim() == "") {
    notification("error", "留言内容不可为空", "error");
    return;
  }

  const avatarUrl = user?.avatarUrl ? user.avatarUrl : touristAvatar;
  const username = user?.username ? user.username : touristName;
  const userId = user ? user.id : null;
  const content = message.value;
  const status = 1;
  const messageInfo: Message = {
    avatarUrl,
    username,
    userId,
    content,
    status,
  };
  addMessage(messageInfo);
};

const addMessage = async (messageInfo: Message) => {
  const res = await reqAddMessage(messageInfo);
  if (res.code == 200) {
    message.value = "";
    messageList.value?.push(messageInfo);
    notification("success", "发送成功");
  }
};
</script>

<style lang="scss" scoped>
.message-container {
  position: fixed;
  top: 35%;
  left: 50%;
  right: 0;
  transform: translateX(-50%);
  width: 350px;
  z-index: 5;
  text-align: center;

  .title {
    color: #fff;
    font-size: 36px;
  }

  .message-input-wrapper {
    display: flex;
    justify-content: center;
    height: 2.5rem;
    margin-top: 2rem;
  }
  .message-input-wrapper input {
    outline: none;
    width: 70%;
    border-radius: 20px;
    height: 100%;
    padding: 0 1.25rem;
    color: #eee;
    border: #fff 1px solid;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .message-input-wrapper input::-webkit-input-placeholder {
    color: #eeee;
  }
  .message-input-wrapper button {
    outline: none;
    border-radius: 20px;
    height: 100%;
    padding: 0 1.25rem;
    border: #fff 1px solid;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.1);
    margin-left: 15px;
    color: #eeee;
    animation: slideDownIn 1s;
  }
}
.danmaku-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: var(--color-blue);
  background: url("https://static.ttkwsd.top/config/e3408389cb0d4ea1b5f651873dab2a19.jpg")
    center no-repeat;
  animation: slideDownIn 1s;
}

.danmaku {
  position: fixed;
  top: 3.125rem;
  width: 100%;
  height: 100%;
  .danmaku-item {
    display: flex;
    align-items: center;
    padding: 0 0.625rem 0 0.3125rem;
    border-radius: 6.25rem;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
  }

  .ml {
    margin-left: 0.5rem;
  }
}
</style>
