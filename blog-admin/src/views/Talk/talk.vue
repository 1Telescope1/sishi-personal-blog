<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ route.meta.title }}</span>
        </div>
      </template>
      <v-md-editor v-model="form.content" height="500px"></v-md-editor>
      <div class="meta">
        <div style="display: flex">
          <div><span class="mr-10 ">状态</span><el-switch v-model="form.status" :active-value="1" :inactive-value="0"/></div>
          <div class="ml-10 "><span class="mr-10">置顶</span><el-switch v-model="form.isTop" :active-value="1" :inactive-value="0"/></div>
        </div>
        <div>
          <el-button type="primary" size="large" @click="handleSubmit">发布</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useUserStore} from "@/store/user.ts";
import {reqAddOrUpdTalk, reqTalkById} from "@/api/talk";
import {Talk} from "@/api/talk/type.ts";
import {notification} from "@/utils/elComponent.ts";

const route = useRoute()
const router=useRouter()
const {user} = useUserStore()
const form = ref<Talk>({
  id: 0,
  userId: user.id,
  content: '',
  isTop: 0,
  status: 0,
  views: 0,
  userinfo: undefined
})

const getTalk = async () => {
  const res = await reqTalkById(route.params.talkId)
  if (res.status == 200) {
    form.value = res.data
  }
}

if (route.params.talkId) {
  getTalk()
}

const handleSubmit=async ()=>{
  const res=await reqAddOrUpdTalk(form.value)
  if(res.status==200) {
    notification('发布成功')
    router.push('/talk/list')
  }
}

</script>

<style scoped lang="scss">
.meta {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mr-10 {
  margin-right: 10px;
}
.ml-10 {
  margin-left: 10px;
}
</style>