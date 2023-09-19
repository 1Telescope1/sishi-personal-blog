<template>
  <div class="chat-container" :style="isShowChatRoom ? {display:'block'} : {display:'none'}">
    <div class="chat-header">
      <div>
        <img class="img" v-if="userStore.user&&userStore?.user?.userinfo.avatar!=''"
             :src="userStore?.user?.userinfo.avatar" alt="">
        <img class="img" v-else :src="blogStore.touristAvatar" alt="">
      </div>
      <div class="meta">
        <div class="text">聊天室</div>
        <div class="number">当前{{ blogStore?.onlineNumber }}人在线</div>
      </div>
    </div>
    <div class="chat-content">
      <div class="chat-item" v-for="(chat,index) in chats" :key="chat.createTime" :class="isMy(chat) ? 'my-chat' : ''">
        <img class="user-avatar" :src="chat.avatar" alt="">
        <div :class="isMy(chat) ? 'right-info' : 'left-info'">
          <div class="user-info" :class="isMy(chat) ? 'my-chat' : ''">
            <span style="color: var(--color-red);">{{ chat.userId != 0 ? chat.nickname : chat.ip }}</span>
            <span style="color :var(--color-blue);" :class="isMy(chat) ? 'right-info' : 'left-info'">
                {{ formatDateTime(chat.createTime) }}
              </span>
          </div>
          <div class="user-content" :class="isMy(chat) ? 'my-content' : ''"
          >
            <div>{{ chat.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-footer">
      <textarea class="chat-input" v-model="chatContent" placeholder="开始聊天吧"
                @keydown="handleKeyCode($event)"></textarea>
      <SvgIcon @click="handleSend" class="send-btn" icon-class="plane" size="1.5rem"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, onMounted} from 'vue'
import io from 'socket.io-client';
import {useBlogStore} from "@/store/blog.ts";
import {useUserStore} from "@/store/user.ts";
import {notification} from "@/utils/elComponent.ts";
import {reqSendChat} from "@/api/chat";
import {Chat} from "@/api/chat/type.ts";
import {formatDateTime} from "../../utils/date.ts";


const blogStore = useBlogStore()
const userStore = useUserStore()

const isShowChatRoom = computed(() => blogStore.isShowChatRoom)

const chatContent = ref("")
const handleKeyCode = (e: any) => {
  if (e.ctrlKey && e.keyCode === 13) {
    chatContent.value = chatContent.value + '\n';
  } else if (e.keyCode === 13) {
    e.preventDefault();
    handleSend();
  }
}

const {setChatByUser} = blogStore
let chatByUser = computed(() => blogStore.chatByUser)
let ip = ref('')
const {user} = userStore

const handleSend = async () => {
  if (chatContent.value.trim() == "") {
    notification('warning', '内容不能为空', 'warning')
    return;
  }

  let userId = 0

  if (user) {
    userId = user.userinfo.id
  }

  const res = await reqSendChat({content: chatContent.value, userId})
  if (res.status == 200) {
    notification('success', '发送成功')
    chatContent.value = ''
    socket.emit('chatMessage', res.data);
    setChatByUser(res.data)
    ip.value = res.data.ip
  }
}

let cnt = 0

const isMy = (data: Chat) => {
  return (chatByUser.value?.ip == data.ip) || (chatByUser.value?.userId == user?.userinfo?.id && user)
}

const socket = io(`ws://${import.meta.env.VITE_WS_URL}`);
const chats = ref<Chat[]>([])

const initChats = () => {
  socket.on('initChats', (data => {
      chats.value = data
    })
  )
  socket.on('newChatMessage', (data) => {
    chats.value=(data);
  });
}

onMounted(() => {
  initChats()

})

</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  position: fixed;
  bottom: 100px;
  right: 50px;
  width: 400px;
  height: calc(100% - 200px);
  min-height: 150px;
  border-radius: 16px;
  box-shadow: 0 5px 40px #00000029;
  background: var(--grey-1);
  animation: bounceInUp 1s;
  animation-fill-mode: both;
  z-index: 100;
}

.chat-header {
  height: 75px;
  background-color: var(--grey-0);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: center;

  .img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }

  .meta {
    margin-left: 10px;

    .text {
      font-size: 14px;
    }

    .number {
      font-size: 12px;
    }
  }
}

.chat-content {
  background-color: var(--chat-bg);
  position: absolute;
  top: 75px;
  bottom: 46px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .my-chat {
    flex-direction: row-reverse;
  }

  .chat-item {
    display: flex;
    margin-bottom: 0.5rem;

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .left-info {
      margin-left: 0.5rem;
    }

    .right-info {
      margin-right: 0.5rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      font-size: 12px;
    }

    .user-content {
      position: relative;
      padding: 10px;
      border-radius: 5px 20px 20px 20px;
      background: var(--grey-0);
      width: fit-content;
      white-space: pre-line;
      word-wrap: break-word;
      word-break: break-all;
    }

    .my-content {
      float: right;
      border-radius: 20px 5px 20px 20px;
      background: var(--color-blue);
      color: var(--grey-0);
    }
  }
}

.chat-footer {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 46px;
  width: 100%;
  background: var(--grey-2);
  padding: 4px 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  .chat-input {
    width: 90%;
    height: 30px;
    padding: 0.3rem 0 0.2rem 0.6rem;
    margin-right: 0.5rem;
    font-size: 13px;
    color: var(--text-color);
    background-color: var(--grey-1);
    outline: none;
    resize: none;
  }

  .send-btn {
    color: var(--color-blue);
    cursor: pointer;
  }
}
</style>