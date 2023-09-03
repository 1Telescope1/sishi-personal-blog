<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{route.meta.title}}</span>
        </div>
      </template>
      <InfoButton @create="handleCreate" @refresh="getData"></InfoButton>
      <div>
        <el-row>
          <el-col class="col" :span="6" v-for="img in tableData" :key="img.id">
            <div>
              <img class="img" v-lazy="img.url"  alt="">
              <div class="meta">
                <el-popconfirm
                  title="是否删除该图片？"
                  confirmButtonText="确认"
                  cancelButtonText="取消"
                  @confirm="handleDelete(img.id)"
                >
                  <template #reference>
                    <el-button type="primary" size="large" text
                    >删除</el-button
                    >
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form ref="formRef" :model="form">
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off" />
        </el-form-item>
        <el-form-item label=图片 :label-width="formLabelWidth">
          <UploadImg @AvatarSuccess="handleAvatar" :imageUrl="form.url"></UploadImg>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {reqAddOrUpdateImg, reqDeleteImg, reqGetBackImages} from "@/api/backimg";
import {useInitForm} from "@/hooks/useForm.ts";
import {ref} from 'vue'
import {backImg} from "@/api/backimg/type.ts";
import {notification} from "@/utils/elComponent.ts";

const route=useRoute()
const formLabelWidth = '140px'


const tableData=ref<backImg[]>([])

const getData=async ()=>{
  const res=await reqGetBackImages()
  if(res.status==200) {
    tableData.value=res.data
  }
}

getData()

const handleDelete=async (id:number)=>{
  const res=await reqDeleteImg(id)
  if(res.status==200) {
    notification('删除成功')
  }
  getData()
}

const {
  formDrawerRef,
  formRef,
  form,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
}=useInitForm({
  form:{
    content:"",
    url:""
  },
  create:reqAddOrUpdateImg,
  update:reqAddOrUpdateImg,
  getData
})

const handleAvatar=(imgUrl:string)=>{
  console.log(imgUrl)
  form.url=imgUrl
}

</script>


<style scoped lang="scss">
.col {
  padding: 0 10px;
  margin-bottom: 15px;
}
.img {
  width: 100%;
  height: 100%;
}
.meta {
  display: flex;
}
</style>