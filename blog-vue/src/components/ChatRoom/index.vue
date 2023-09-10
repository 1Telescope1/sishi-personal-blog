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
      123
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
const handleSend = async () => {
  if (chatContent.value.trim() == "") {
    notification('warning', '内容不能为空', 'warning')
    return;
  }

  const res = await reqSendChat({content: chatContent.value})
  if (res.status == 200) {
    notification('success', '发送成功')
    chatContent.value = ''
    socket.emit('chatMessage', res.data);
  }
}

const socket = io(`ws://${import.meta.env.VITE_WS_URL}`);
const chats = ref<Chat>([])

onMounted(() => {
  socket.on('initChats', (data => {
      chats.value = data
    })
  )

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