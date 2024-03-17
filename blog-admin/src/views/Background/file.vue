<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ route.meta.title }}</span>
        </div>
      </template>
      <InfoButton @create="handleCreate" @refresh="getData"></InfoButton>
      <div>
        <el-row>
          <el-col class="col" :span="6" v-for="f in tableData" :key="f.id">
            <div>
              <div>
                <a :href="f.url" style="color: #409eff">{{
                  f.name + '.' + f.type
                }}</a>
              </div>
              <div class="meta">
                <el-popconfirm
                  title="是否删除该文件？"
                  confirmButtonText="确认"
                  cancelButtonText="取消"
                  @confirm="handleDelete(f.id)"
                >
                  <template #reference>
                    <el-button type="primary" size="large" text>删除</el-button>
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
        <el-form-item label="文件" :label-width="formLabelWidth">
          <UploadFile
            @AvatarSuccess="handleAvatar"
            :imageUrl="form.url"
          ></UploadFile>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reqAddOrUpdateFile, reqGetFile, reqDeleteFile } from '@/api/file';
import { useInitForm } from '@/hooks/useForm.ts';
import { ref } from 'vue';
import { notification } from '@/utils/elComponent.ts';

const route = useRoute();
const formLabelWidth = '140px';

const tableData = ref<File[]>([]);

const getData = async () => {
  const res = await reqGetFile();
  if (res.status == 200) {
    tableData.value = res.data;
  }
};

getData();

const handleDelete = async (id: number) => {
  const res = await reqDeleteFile(id);
  if (res.status == 200) {
    notification('删除成功');
  }
  getData();
};

const {
  formDrawerRef,
  formRef,
  form,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {
    url: ''
  },
  create: reqAddOrUpdateFile,
  update: reqAddOrUpdateFile,
  getData
});

const handleAvatar = (imgUrl: string) => {
  console.log(imgUrl);
  form.url = imgUrl;
};
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
