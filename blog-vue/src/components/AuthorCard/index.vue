<template>
  <div class="author-card">
    <div>
      <img class="avatarUrl" :src="authorInfo.avatarUrl" alt="" />
    </div>
    <div class="authorName">
      {{ authorInfo.username }}
    </div>
    <div class="signature">月下无人江自流</div>
    <BlogInfo></BlogInfo>
    <SocialList></SocialList>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { UserInfo } from "../../api/user/type";
import { reqUserInfo } from "../../api/user";
let authorInfo = ref<UserInfo>({
  id: -1,
  username: "",
  password: "",
  email: "",
  address: "",
  createTime: "",
  avatarUrl: "",
  role: "",
  loginType: "",
});
const getAuthorInfo = async () => {
  const res = await reqUserInfo(1);
  if (res.status == 200) {
    authorInfo.value = res.data;
  }
};

onMounted(() => {
  getAuthorInfo();
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/transition.scss";
.author-card {
  @include flexCenter;
  flex-direction: column;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 0 1rem var(--box-bg-shadow);
  transition: all 0.2s ease-in-out 0s;

  .avatarUrl {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    box-shadow: 0 0 15px 8px var(--body-bg-shadow);
    border: 1px solid var(--body-bg-shadow);
    animation: 1000ms ease-in-out 0ms 1 normal forwards running blur;

    &:hover {
      -webkit-animation: author-shake 1s;
      animation: 1000ms ease 0ms 1 normal none running author-shake;
    }
  }
  .authorName {
    margin-top: 15px;
  }
  .signature {
    color: #999999;
  }
}
</style>
